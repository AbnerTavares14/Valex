import * as cardRepository from "../repositories/cardRepository.js";
import * as handlerError from "../middlewares/handlerErrorMiddleware.js";
import { checkIfCardExpired } from "./cardService.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";

export async function rechargeCard(cardId: number, amount: number, apiKey: string) {
    const card = await cardRepository.findById(cardId);
    const company = await companyRepository.findByApiKey(apiKey);

    if (!card) {
        throw handlerError.unprocessableEntity();
    }

    if (!company) {
        throw handlerError.unprocessableEntity();
    }

    if (card.password === null) {
        throw handlerError.unprocessableEntity();
    }

    const employee = await employeeRepository.findById(card.employeeId);
    if (employee.companyId !== company.id) {
        throw handlerError.unprocessableEntity();
    }

    const expiredCard = await checkIfCardExpired(cardId);

    if (expiredCard) {
        throw handlerError.unprocessableEntity();
    }

    const data = { cardId, amount };

    await rechargeRepository.insert(data);
}