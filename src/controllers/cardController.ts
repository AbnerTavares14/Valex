import { Request, Response } from "express";
import * as cardService from "../services/cardService.js";

export async function createCard(req: Request, res: Response) {
    const { apiKey } = req.params;
    const { type, employeeID } = req.body;

    if (!apiKey) {
        res.sendStatus(422);
    }
    const result = await cardService.verifyCard(type, employeeID, apiKey);
    res.send(result).status(201);
}

export async function activateCard(req: Request, res: Response) {
    const { password, id, cvv } = req.body;
    console.log(password, id, cvv);
    await cardService.activeCard(cvv, password, id);
    res.sendStatus(200);
}

export async function getExtract(req: Request, res: Response) {
    const { id } = req.params;

}

export async function blockCard(req: Request, res: Response) {
    const { id, password } = req.body;
    await cardService.block(id, password);
    res.sendStatus(200);
}

export async function unlockCard(req: Request, res: Response) {
    const { id, password } = req.body;
    await cardService.unlock(id, password);
    res.sendStatus(200);
}