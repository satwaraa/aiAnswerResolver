import { type Request, type Response, Router } from "express";
import { catchAsync } from "../utils/catchAsyncWrapper";
import { aiManager } from "./ai.manager";
import multer from "multer";


const upload = multer({ storage: multer.memoryStorage() });

export class aiController {
    public router = Router();
    private _aiManager = new aiManager();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(
            "/getAnswer",
            upload.single("file"),
            catchAsync(this.getAnswer.bind(this)),
        );
    }

    public async getAnswer(req: Request, res: Response) {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        try {
            const answer = await this._aiManager.getAnswer(req.file)
            if (answer) {
                res.status(200).json({message:answer})
            }
            
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({message:error.message})
                
            }
        }

        
    }
}
