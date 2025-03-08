import mongoose from "mongoose";
import Survey from "../models/Survey.js";
export const createSurvey = async (req, res) => {
  try {
    const {
      user,
      rating,
      feedback,
      suggestions,
      difficultyRating,
      customWords,
      additionalHints,
      wordQualityRating,
      uiSatisfaction,
      buttonVisibility,
      colorPalette,
      navigationEase,
    } = req.body;

    if (
      !user ||
      !rating ||
      !feedback ||
      !difficultyRating ||
      !wordQualityRating ||
      !uiSatisfaction ||
      !buttonVisibility ||
      !colorPalette ||
      !navigationEase
    ) {
      return res.status(400).json({
        error: "Todos los campos son requeridos",
      });
    }

    const newSurvey = new Survey({
      user,
      rating,
      feedback,
      suggestions,
      difficultyRating,
      customWords,
      additionalHints,
      wordQualityRating,
      uiSatisfaction,
      buttonVisibility,
      colorPalette,
      navigationEase,
    });

    await newSurvey.save();

    res.status(201).json({
      message: "Encuesta creada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: "Error del servidor: ",
      error,
    });
  }
};
export const getAllSurvey = async (req, res) => {
  try {
    const surveys = await Survey.find()
      .populate("user", "username")
      .select("rating feedback suggestions createdAt");
    res.status(200).json(surveys);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener las encuestas",
        error: error.message,
      });
  }
};
