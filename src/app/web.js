import express from "express";
import {errorMiddleware} from "../middleware/error-middleware.js";
import {app} from "../route/api.js";

export const web = express();
web.use(express.json());
web.use(app);
web.use(errorMiddleware);
