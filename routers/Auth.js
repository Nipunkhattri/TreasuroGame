import express  from "express"
const router = express.Router();

import { signup, signin } from "../Controllers/AuthControllers.js";
import {Answer, Questiondisplay,leaderBoard} from "../Controllers/QuestionsControllers.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/question", Questiondisplay);
router.post("/Answer", Answer);
router.get("/leader", leaderBoard);

export default router;