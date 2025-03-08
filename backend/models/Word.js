import mongoose from "mongoose";
const WordSchema = new mongoose.Schema(
    {
        word: { 
            type: String, 
            required: true },
        translation: { 
            type: String, 
            required: true },
        language: { 
            type: String, 
            required: true, 
            enum: ["en", "es"] },
        difficulty: { 
            type: String, 
            enum: ["easy", "medium", "hard"], 
            default: "medium" },
        createdAt: { 
            type: Date, 
            default: Date.now }
    }
)
export default mongoose.model("Word", WordSchema);