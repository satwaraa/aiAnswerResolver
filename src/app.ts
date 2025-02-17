import type { NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";
import multer from "multer";
// import { ApiError } from "./utils/apiError";
// import httpStatus from "http-status";
const upload = multer({ storage: multer.memoryStorage() }); 
import router from "./router";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const corsOption = {
  origin: true,
  credentials: true,
  accessControlAllowOrigin: true,
};

app.use(cors(corsOption));

app.use("/api/v1/", router);

// app.use((_req: Request, _res: Response, next: NextFunction) => {
//   next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
// });

export default app;

