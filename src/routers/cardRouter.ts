import { Router } from "express";
import { activateCard, createCard } from "../controllers/cardController.js";

const cardRouter = Router();

cardRouter.post("/card", createCard);
cardRouter.post("card/activate", activateCard);

export default cardRouter;