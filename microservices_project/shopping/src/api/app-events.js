const ShoppingService = require("../services/shopping-service");

module.exports = (app) => {
    
    const service = new ShoppingService();

    app.use('/app-events',async (req,res,next) => { // this is a webhook
        const { payload } = req.body;
        console.log("============= Shopping ================");
        console.log(payload);

         //handle subscribe events
        service.SubscribeEvents(payload);

        console.log("====================== Shopping Service Received Event  ================");
        return res.status(200).json(payload);
    });
}
