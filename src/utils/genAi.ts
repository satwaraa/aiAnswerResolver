import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
