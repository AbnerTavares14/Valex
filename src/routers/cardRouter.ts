import { Router } from "express";
import { activateCard, blockCard, createCard, getExtract, unlockCard } from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/card/activate", activateCard);
cardRouter.put("/block", blockCard);
cardRouter.put("/unlock", unlockCard);
cardRouter.get("/card/:id", getExtract);
cardRouter.post("/card/:apiKey", createCard);

export default cardRouter;