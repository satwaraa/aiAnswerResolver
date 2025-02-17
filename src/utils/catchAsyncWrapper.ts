import type { Request, Response, RequestHandler, NextFunction } from "express";

// export const catchAsync =
//     (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
//         Promise.resolve(fn(req, res, next)).catch((err) => next(err));
//     };


    export const catchAsync =
        (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        };
