import { Request, Response } from "express";
import * as rechargeService from "../services/rechargeService.js";

export async function recharge(req: Request, res: Response) {
    const { cardId, amount, apiKey } = req.body;
    if (amount <= 0) {
        res.sendStatus(422);
    }
    await rechargeService.rechargeCard(cardId, amount, apiKey);
    res.sendStatus(200);
}