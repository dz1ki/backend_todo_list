import express from "express";
import { router } from "./routes.js";
import config from "config";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";
import mongoose from "mongoose";
import OpenApiValidator from "express-openapi-validator";

const dbConect = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: config.get("db.dbName"),
  user: config.get("db.user"),
  pass: config.get("db.password"),
};

const apiSpec = YAML.load("./src/docs/openApi.yaml");
const port = config.get("app.port") || 5000;
const app = express();
app.use(express.json());
app.use("/api", swaggerUI.serve, swaggerUI.setup(apiSpec));
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
  })
);
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});
app.use("/", router);

const start = async () => {
  try {
    await mongoose.connect(config.get("db.path"), dbConect);
    app.listen(port, () => console.log("Server started on port " + port));
  } catch (e) {
    console.log(e);
  }
};
start();
