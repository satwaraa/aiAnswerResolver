import type { GenerateContentResult } from "@google/generative-ai";
import { genAI, openai } from "../utils/genAi";
export class aiManager {
    constructor() {}
    public async fileToGenerativePart(buffer: Buffer, mimeType: string) {
        return {
            inlineData: {
                data: buffer.toString("base64"), // Convert buffer to base64
                mimeType,
            },
        };
    }

    public async getAnswer(file: Express.Multer.File) {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const imagePart = await this.fileToGenerativePart(file.buffer, file.mimetype);
            // const prompt = "Analyze the question and options given in the image and only respond with correct option a/b/c/d.";
            const prompt = `When analyzing the image of an analytical skills question:
            1. First, carefully read the entire question and all options without rushing.
            2. Break down the problem systematically by identifying:
                a. The key information provided
                b.The specific task or question being asked
                c.Any constraints or conditions that must be satisfied
            3.Work through the problem step-by-step.
            NOTE: only respond with correct option a/b/c/d`;
            const result: GenerateContentResult = await model.generateContent([
                prompt,
                imagePart,
            ]);
            if (result.response.text().length > 1) {
                console.log(result.response.text());
                throw new Error("Invalid response");
            }
            return result.response.text().toLowerCase();
            // const res = await openai.chat.completions.create({
            //     model: "gpt-4o", // Make sure to use a vision-capable model
            //     messages: [
            //         {
            //             role: "user",
            //             content: [
            //                 {
            //                     type: "text",
            //                     text: `When analyzing the image of an analytical skills question:
            // 1. First, carefully read the entire question and all options without rushing.
            // 2. Break down the problem systematically by identifying:
            //   a. The key information provided
            //   b. The specific task or question being asked
            //   c. Any constraints or conditions that must be satisfied
            // 3. Work through the problem step-by-step.
            // NOTE: only respond with correct option a/b/c/d`,
            //                 },
            //                 {
            //                     type: "image_url",
            //                     image_url: {
            //                         url: `data:${
            //                             file.mimetype
            //                         };base64,${file.buffer.toString("base64")}`,
            //                     },
            //                 },
            //             ],
            //         },
            //     ],
            //     max_tokens: 500,
            // });
            // console.log(res.choices[0].message);
            // throw new Error("Not implemented yet");
        } catch (error) {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const imagePart = await this.fileToGenerativePart(file.buffer, file.mimetype);
            const prompt =
                "Analyze the question and options given in the image and only respond with correct option a/b/c/d.";
            const result: GenerateContentResult = await model.generateContent([
                prompt,
                imagePart,
            ]);
            return result.response.text().toLowerCase();
        }
    }
}
