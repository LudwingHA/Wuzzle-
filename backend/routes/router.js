import { Router } from "express";
import { addWord, deleteWord, getRandomWord } from "../controllers/wordController.js";
import { authenticateUser, logoutUser, profile, refreshAccessToken, registerUser } from "../controllers/userController.js";
import { createSurvey, getAllSurvey } from "../controllers/surveyController.js";
import { verifyToken } from "../auth/verifyToken.js";

const router = Router();
//words
router.post('/api/word',addWord);
router.get('/api/word/:lang', getRandomWord)
router.delete('/api/word/:id', deleteWord)

//register
router.post('/api/register', registerUser)
// login
router.post('/api/login', authenticateUser)
router.post('/api/refresh', refreshAccessToken)
router.post('/api/logout', logoutUser)
router.post('/api/profile', verifyToken, profile)


//survey
router.get('/api/survey', getAllSurvey)
router.post('/api/survey', createSurvey)
export default router
