"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const Handler_1 = __importDefault(require("./delivery/http/Handler"));
const app = express_1.default();
const prefix = "/api/product";
// Middlewares
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(helmet_1.default());
app.use(compression_1.default());
app.use(cors_1.default());
// Routes
app.use(indexRoutes_1.default);
app.use(prefix, Handler_1.default);
module.exports = app;
