import * as cardRepository from "../repositories/cardRepository.js";
import * as businessRepository from "../repositories/businessRepository.js";
import * as handlerError from "../middlewares/handlerErrorMiddleware.js";
import * as paymentsRepository from "../repositories/paymentsRepository.js";
import { checkIfCardExpired, getExtractAndBalance } from "./cardService.js";
import bcrypt from "bcrypt";

export async function payment(cardId: number, password: string, businessId: number, amount: number) {
    const card = await cardRepository.findById(cardId);
    const business = await businessRepository.findById(businessId);
    if (!card) {
        throw handlerError.unprocessableEntity();
    }

    if (card.password === null) {
        throw handlerError.unprocessableEntity();
    }

    const expiredCard = await checkIfCardExpired(cardId);

    if (expiredCard) {
        throw handlerError.unprocessableEntity();
    }

    if (card.isBlocked) {
        throw handlerError.unauthorized();
    }

    if (!business) {
        throw handlerError.unprocessableEntity();
    }

    if (card.type !== business.type) {
        throw handlerError.unauthorized();
    }

    const { balance } = await getExtractAndBalance(cardId);

    if (balance < amount) {
        throw handlerError.unauthorized();
    }

    const paymentData = { cardId, businessId, amount };

    if (bcrypt.compareSync(password, card.password)) {
        await paymentsRepository.insert(paymentData);
    } else {
        throw handlerError.unauthorized();
    }

}