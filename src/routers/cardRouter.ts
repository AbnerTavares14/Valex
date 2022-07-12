import { Router } from "express";
import { activateCard, blockCard, createCard, getExtract, unlockCard } from "../controllers/cardController.js";
import validateSchema from "../middlewares/schemaValidator.js";
import cardSchema from "../schemas/cardSchema.js";
import block from "../schemas/blockAndUnlockSchema.js";
import cardActivateSchema from "../schemas/cardActivateSchema.js";

const cardRouter = Router();

cardRouter.post("/card/activate", validateSchema(cardActivateSchema), activateCard);
cardRouter.put("/block", validateSchema(block), blockCard);
cardRouter.put("/unlock", validateSchema(block), unlockCard);
cardRouter.get("/card/:id", getExtract);
cardRouter.post("/card/:apiKey", validateSchema(cardSchema), createCard);

export default cardRouter;