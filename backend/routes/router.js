import { Router } from "express";
import { addWord, deleteWord, getRandomWord } from "../controllers/wordController.js";
import { authenticateUser, registerUser } from "../controllers/userController.js";
import { createSurvey, getAllSurvey } from "../controllers/surveyController.js";
const router = Router();
//words
router.post('/api/word',addWord);
router.get('/api/word/:lang', getRandomWord)
router.delete('/api/word/:id', deleteWord)

//register
router.post('/api/register', registerUser)
// login
router.post('/api/login', authenticateUser)

//survey
router.get('/api/survey', getAllSurvey)
router.post('/api/survey', createSurvey)
export default router
