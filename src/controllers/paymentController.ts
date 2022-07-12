import { Request, Response } from "express";
import * as paymentService from "../services/paymentService.js";

export async function payment(req: Request, res: Response) {
    const { cardId, password, businessId, amount } = req.body;
    await paymentService.payment(cardId, password, businessId, amount);
    res.sendStatus(200);
}