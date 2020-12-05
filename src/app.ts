import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

import indexRoutes from "./routes/indexRoutes";
import Handler from "./delivery/http/Handler";

const app = express();
const prefix = "/api/product"

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(compression());
app.use(cors());

// Routes
app.use(indexRoutes);
app.use(prefix, Handler);

module.exports = app;
