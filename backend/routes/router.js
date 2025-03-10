import { Router } from "express";
import { addWord, addWords, deleteWord, getRandomWord, getWordByLanguageAndLength } from "../controllers/wordController.js";
import { authenticateUser, incrementWins, logoutUser, profile, refreshAccessToken, registerUser } from "../controllers/userController.js";
import { createSurvey, getAllSurvey } from "../controllers/surveyController.js";
import { verifyToken } from "../auth/verifyToken.js";

const router = Router();
//words
router.post('/api/word',addWord);
router.post('/api/words',addWords);
router.get('/api/word/:lang', getRandomWord)
router.get('/word/:lang/:length', getWordByLanguageAndLength);
router.delete('/api/word/:id', deleteWord)

//register
router.post('/api/register', registerUser)
// login
router.post('/api/login', authenticateUser)
router.post('/api/refresh', refreshAccessToken)
router.post('/api/logout', logoutUser)
router.post('/api/profile', verifyToken, profile)

// login
router.post('/api/increment-wins', incrementWins)
//survey
router.get('/api/survey', getAllSurvey)
router.post('/api/survey', createSurvey)
export default router
