const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/customer", proxy("http://localhost:8001"));
app.use("/shopping", proxy("http://localhost:8003"));
app.use("/", proxy("http://localhost:8002")); // products

app.listen(8000, () => {
  console.log("Gateway is Listening to Port 8000");
});

// proxy() function is used to forward the request to the respective microservices based on the path. The first argument is the path and the second argument is the URL of the microservice.