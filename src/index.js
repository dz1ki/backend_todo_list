import express from "express";
import { router } from "./routes.js";
import config from "config";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";
import mongoose from "mongoose";

const apiSpec = YAML.load("./src/docs/openApi.yaml");
const port = config.get("app.port") || 5000;
const app = express();
app.use(express.json());
app.use("/api", swaggerUI.serve, swaggerUI.setup(apiSpec));
app.use("/", router);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "test",
      user: "admin",
      pass: "admin",
    });
    app.listen(port, () => console.log("Server started on port " + port));
  } catch (e) {
    console.log(e);
  }
};
start();
