const CustomerService = require("../services/customer-service");

module.exports = (app) => {
    
    const service = new CustomerService();
    app.use('/app-events',async (req,res,next) => { // this is a webhook that listens for events and triggers the corresponding service method

        const { payload } = req.body;

        //handle subscribe events
        service.SubscribeEvents(payload);

        console.log("============= Customer Service Received Event ================");
        console.log(payload);
        res.json(payload);
    });

}
// app event is a route that listens for events and triggers the corresponding service method.
// The service method is responsible for handling the event and triggering the appropriate method in the service
// simply we are just exposing one webhooks to other services so other services can call this service by putting the payload in the body of the request and the endpoint is /app-events