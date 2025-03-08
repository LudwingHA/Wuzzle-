import mongoose from "mongoose";
const surveySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  feedback: {
    type: String,
    required: true,
    trim: true,
  },
  suggestions: {
    type: String,
    trim: true,
  },
  difficultyRating: {
    type: Number, 
    min: 1,
    max: 5,
    required: true,
  }, //PREGUNTAS AL JUEGO
  customWords: {
    type: Boolean, 
    required: true,
  },
  additionalHints: {
    type: Boolean, 
    required: true,
  },
  wordQualityRating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  //PREGUNTAS AL DISEÑO
  uiSatisfaction: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  buttonVisibility: {
    type: Number, 
    min: 1,
    max: 5,
    required: true,
  },
  colorPalette: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  navigationEase: {
    type: Number, 
    min: 1,
    max: 5,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});
export default mongoose.model('Survey', surveySchema)