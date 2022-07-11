import { Request, Response } from "express";
import * as cardService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
    const { apiKey } = req.params;
    const { type, employeeID, name } = req.body;

    if (!apiKey) {
        res.sendStatus(422);
    }
    cardService.verifyCard(type, employeeID, apiKey, name);
    res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {
    const { password, id, cvv } = req.body;
    await cardService.activeCard(cvv, password, id);
    res.sendStatus(200);
}

export async function getExtract(req: Request, res: Response) {
    const { id } = req.params;

}