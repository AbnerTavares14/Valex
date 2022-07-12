import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { TransactionTypes } from "../repositories/cardRepository.js";
import * as cardRepository from "../repositories/cardRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as companyRepository from "../repositories/companyRepository.js";
import Cryptr from "cryptr";
import * as handlerError from "../middlewares/handlerErrorMiddleware.js";


export async function verifyCard(type: TransactionTypes, id: number, apiKey: string) {
    const apiKeyIsValid = await companyRepository.findByApiKey(apiKey);
    const employee = await employeeRepository.findById(id);
    const employeeHasCardOfThisType = await cardRepository.findByTypeAndEmployeeId(type, id);
    const cryptr: Cryptr = new Cryptr("securityCodeCard");

    if (!apiKeyIsValid) {
        console.log("verifica1")
        throw handlerError.unprocessableEntity();
    }

    if (!employee) {
        console.log("verifica")
        throw handlerError.unprocessableEntity();
    }

    if (employeeHasCardOfThisType) {
        throw { type: "Conflict" };
    }

    let arrayOfNames = employee.fullName.split(" ");
    console.log(arrayOfNames)

    if (arrayOfNames.length > 2) {
        const treatedNames: string[] = arrayOfNames.filter((surname) => { return surname.length > 2 });
        console.log(treatedNames)
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
        return { number: numberCard, securityCode: securityCodeCard, expirationDate: cardExpiration };
    } else {
        let cardHolderName: string = employee.fullName;
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
        return { number: numberCard, securityCode: securityCodeCard, expirationDate: cardExpiration };
    }
}

export async function activeCard(cvv: string, password: string, id: number) {
    const card = await cardRepository.findById(id);

    console.log(card)
    if (!card) {
        console.log("aqui1")
        throw handlerError.unprocessableEntity();
    }

    const cryptr: Cryptr = new Cryptr("securityCodeCard");
    const decryptedCvv: string = cryptr.decrypt(card.securityCode);
    console.log(cvv, decryptedCvv);

    if (decryptedCvv !== cvv) {
        console.log("aqui2")
        throw handlerError.unprocessableEntity();
    }

    if (card.password !== null) {
        throw handlerError.conflict();
    }
    const expiredCard = await checkIfCardExpired(id);

    if (expiredCard) {
        throw handlerError.unprocessableEntity();
    }

    const SALT = 10;
    const encryptedPassword = bcrypt.hashSync(password, SALT);
    const cardData = { password: encryptedPassword }
    await cardRepository.update(id, cardData);
}

export async function getExtractAndBalance(id: number) {

}

export async function block(id: number, password: string) {
    const card = await cardRepository.findById(id);

    if (!card) {
        console.log("ta aqui")
        throw handlerError.unprocessableEntity();
    }

    const expiredCard = await checkIfCardExpired(id);

    if (expiredCard) {
        console.log("ta aqui2")
        throw handlerError.unprocessableEntity();
    }

    if (card.isBlocked) {
        console.log("ta aqui3")
        throw handlerError.unprocessableEntity();
    }

    if (bcrypt.compareSync(password, card.password)) {
        const cardData = { isBlocked: true };
        await cardRepository.update(id, cardData);
        return;
    } else {
        console.log("ta aqui4")
        throw handlerError.unprocessableEntity();
    }
}

export async function unlock(id: number, password: string) {
    const card = await cardRepository.findById(id);

    if (!card) {
        console.log("ta aqui")
        throw handlerError.unprocessableEntity();
    }

    const expiredCard = await checkIfCardExpired(id);

    if (expiredCard) {
        console.log("ta aqui2")
        throw handlerError.unprocessableEntity();
    }

    if (!card.isBlocked) {
        console.log("ta aqui3")
        throw handlerError.unprocessableEntity();
    }

    if (bcrypt.compareSync(password, card.password)) {
        const cardData = { isBlocked: false };
        await cardRepository.update(id, cardData);
        return;
    } else {
        console.log("ta aqui4")
        throw handlerError.unprocessableEntity();
    }
}

async function checkIfCardExpired(id: number) {
    const card = await cardRepository.findById(id);
    const formatDate: string[] = card.expirationDate.split("/");
    const dateNow = new Date();
    const date = new Date(parseInt(formatDate[1]), parseInt(formatDate[0]) - 1);
    if (dateNow.getFullYear() >= date.getFullYear() && dateNow.getMonth() >= date.getMonth()) {
        return true;
    }
    return false;
}