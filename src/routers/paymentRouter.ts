import { Router } from "express";
import { payment } from "../controllers/paymentController.js";
import validateSchema from "../middlewares/schemaValidator.js";
import paymentSchema from "../schemas/paymentSchema.js";


const paymentRouter = Router();

paymentRouter.post("/payment", validateSchema(paymentSchema), payment);

export default paymentRouter;
