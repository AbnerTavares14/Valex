import { Router } from "express";
import { activateCard, blockCard, createCard, unlockCard } from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/card/activate", activateCard);
cardRouter.put("/block", blockCard);
cardRouter.put("/unlock", unlockCard);
cardRouter.post("/card/:apiKey", createCard);

export default cardRouter;