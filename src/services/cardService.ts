import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { TransactionTypes } from "../repositories/cardRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import Cryptr from "cryptr";
import * as handlerError from "../middlewares/handlerErrorMiddleware.js";


export async function verifyCard(type: TransactionTypes, id: number, apiKey: string, name: string) {
    const apiKeyIsValid = await companyRepository.findByApiKey(apiKey);
    const employeeExist = await employeeRepository.findById(id);
    const employeeHasCardOfThisType = await cardRepository.findByTypeAndEmployeeId(type, id);
    const cryptr: Cryptr = new Cryptr("securityCodeCard");

    if (!apiKeyIsValid) {
        throw handlerError.unprocessableEntity();
    }

    if (!employeeExist) {
        throw handlerError.unprocessableEntity();
    }

    if (employeeHasCardOfThisType) {
        throw { type: "Conflict" };
    }

    let arrayOfNames = name.split(" ");

    if (arrayOfNames.length > 2) {
        const treatedNames: string[] = arrayOfNames.filter((surname) => { surname.length > 2 });
        const arraySize = treatedNames.length;
        let cardHolderName: string = treatedNames[0];

        for (let i: number = 1; i < arraySize - 1; i++) {
            cardHolderName += ` ${treatedNames[i][0]}`;
        }
        cardHolderName += ` ${treatedNames[arraySize - 1]}`;
        const cardHolderNameUpper = cardHolderName.toUpperCase();
        const numberCard = faker.finance.creditCardNumber('####-####-####-###L');
        const securityCodeCard = faker.finance.creditCardCVV();
        const encryptedSecurityCode: string = cryptr.encrypt(securityCodeCard);
        const dateNow = new Date();
        const monthExpiration: number = dateNow.getMonth() + 1;
        const yearExpiration: number = dateNow.getFullYear() + 5;
        const cardExpiration: string = `${monthExpiration}/${yearExpiration}`;
        const isVirtual = false;
        const isBlocked = false;

        const cardData = {
            employeeId: id,
            number: numberCard,
            cardholderName: cardHolderNameUpper,
            securityCode: encryptedSecurityCode,
            expirationDate: cardExpiration,
            isVirtual: isVirtual,
            isBlocked: isBlocked,
            type
        };

        await cardRepository.insert(cardData);
    } else {
        let cardHolderName: string = name;
        const cardHolderNameUpper = cardHolderName.toUpperCase();
        const numberCard = faker.finance.creditCardNumber('####-####-####-###L');
        const securityCodeCard = faker.finance.creditCardCVV();
        const encryptedSecurityCode: string = cryptr.encrypt(securityCodeCard);
        const dateNow = new Date();
        const monthExpiration: number = dateNow.getMonth() + 1;
        const yearExpiration: number = dateNow.getFullYear() + 5;
        const cardExpiration: string = `${monthExpiration}/${yearExpiration}`;
        const isVirtual = false;
        const isBlocked = false;

        const cardData = {
            employeeId: id,
            number: numberCard,
            cardholderName: cardHolderNameUpper,
            securityCode: encryptedSecurityCode,
            expirationDate: cardExpiration,
            isVirtual: isVirtual,
            isBlocked: isBlocked,
            type
        };

        await cardRepository.insert(cardData);
    }
}

export async function activeCard(cvv: string, password: string, id: number) {
    const card = await cardRepository.findById(id);
    const cryptr: Cryptr = new Cryptr("securityCodeCard");
    const decryptedCvv: string = cryptr.decrypt(card.securityCode);

    if (decryptedCvv !== cvv) {
        throw handlerError.unprocessableEntity();
    }

    if (!card) {
        throw handlerError.unprocessableEntity();
    }

    if (card.password !== null) {
        throw handlerError.conflict();
    }

    const date = new Date(card.expirationDate);
    const dateNow = new Date();

    if (date.getFullYear >= dateNow.getFullYear && date.getMonth >= dateNow.getMonth) {
        throw handlerError.unprocessableEntity();
    }

    const SALT = 10;
    const encryptedPassword = bcrypt.hashSync(password, SALT);
    const cardData = { password: encryptedPassword }
    await cardRepository.update(id, cardData);
}

export async function getExtractAndBalance(id: number) {

}