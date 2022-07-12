import { Router } from "express";
import { recharge } from "../controllers/rechargeController.js";
import validateSchema from "../middlewares/schemaValidator.js";
import rechargeSchema from "../schemas/rechargeSchema.js";

const rechargeRouter = Router();

rechargeRouter.post("/recharge", validateSchema(rechargeSchema), recharge);

export default rechargeRouter;