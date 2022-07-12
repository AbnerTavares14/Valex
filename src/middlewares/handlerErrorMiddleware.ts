import { NextFunction, Request, Response } from "express";

const serviceErrorToStatusCode = {
    notFound: 404,
    unprocessableEntity: 422,
    conflict: 401
};

export function notFoundError() {
    return { type: "notFound" };
}

export function conflict() {
    return { type: "conflict" };
}
export function unprocessableEntity() {
    return { type: "unprocessableEntity" };
}

export default function handleErrorsMiddleware(err, req: Request, res: Response, next: NextFunction) {
    // if (err.type) {
    //     res.sendStatus(serviceErrorToStatusCode[err.type]);
    // }
    console.log(err)
    res.sendStatus(500);
}