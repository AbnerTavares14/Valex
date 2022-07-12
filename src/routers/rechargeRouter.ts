import { Router } from "express";
import { recharge } from "../controllers/rechargeController";

const rechargeRouter = Router();

rechargeRouter.post("/recharge", recharge);

export default rechargeRouter;