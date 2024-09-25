const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");
const { v4: uuid4 } = require("uuid");
const {
    APP_SECRET,
    EXCHANGE_NAME,
    SHOPPING_SERVICE,
    MSG_QUEUE_URL,
} = require("../config");

let amqplibConnection = null;

//Utility functions
(module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt();
}),
    (module.exports.GeneratePassword = async (password, salt) => {
        return await bcrypt.hash(password, salt);
    });

module.exports.ValidatePassword = async (
    enteredPassword,
    savedPassword,
    salt
) => {
    return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

(module.exports.GenerateSignature = async (payload) => {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "90d" });
}),
    (module.exports.ValidateSignature = async (req) => {
        const signature = req.get("Authorization");

        if (signature) {
            const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
            req.user = payload;
            return true;
        }

        return false;
    });

module.exports.FormatData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error("Data Not found!");
    }
};

//Message Broker
const getChannel = async () => {
    if (amqplibConnection === null) {
        amqplibConnection = await amqplib.connect(MSG_QUEUE_URL);
    }
    return await amqplibConnection.createChannel();
};

module.exports.CreateChannel = async () => {
    try {
        const channel = await getChannel();
        await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
        return channel;
    } catch (err) {
        throw err;
    }
};

module.exports.PublishMessage = (channel, service, msg) => {
    channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
    console.log("Sent: ", msg);
};

module.exports.SubscribeMessage = async (channel, service) => {
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    const q = await channel.assertQueue("", { exclusive: true });
    console.log(` Waiting for messages in queue: ${q.queue}`);

    channel.bindQueue(q.queue, EXCHANGE_NAME, SHOPPING_SERVICE);

    channel.consume(
        q.queue,
        (msg) => {
            if (msg.content) {
                console.log("the message is:", msg.content.toString());
                service.SubscribeEvents(msg.content.toString());
            }
            console.log("[X] received");
        },
        {
            noAck: true,
        }
    );
};

const requestData = async (RPC_QUEUE_NAME, requestPayload, uuid) => {
    try {
        const channel = await getChannel();

        const q = await channel.assertQueue("", { exclusive: true });

        // Send request to the other service. Create a correlationId to match the response.
        channel.sendToQueue(
            RPC_QUEUE_NAME,
            Buffer.from(JSON.stringify(requestPayload)),
            {
              replyTo: q.queue,
              correlationId: uuid,
            }
        );

        // Wait for response from the other service.
        return new Promise((resolve, reject) => {
            // timeout n
            const timeout = setTimeout(() => {
                channel.close();
                resolve("API could not fulfill the request!");
            }, 8000);

            channel.consume(
                q.queue,
                (msg) => {
                    if (msg.properties.correlationId === uuid) {
                        resolve(JSON.parse(msg.content.toString()));
                        clearTimeout(timeout);
                    } else {
                        reject("data Not found!");
                    }
                },
                {
                    noAck: true,
                }
            );
        });
        // We send the request to the other service and wait for the response in the same channel. This is RPC logic. The other service is listening to the queue and will respond to the request.
    } catch (error) {
        console.log(error);
        return "error";
    }
};

module.exports.RPCRequest = async (RPC_QUEUE_NAME, requestPayload) => {
    const uuid = uuid4(); // correlationId to match the response
    return await requestData(RPC_QUEUE_NAME, requestPayload, uuid);
};
