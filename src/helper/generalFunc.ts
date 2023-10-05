import { validationResult } from "express-validator";
import { Request } from "express";

function getErrorMessagesFromValidationResult(req: Request) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errors.array().map((error) => error.msg);
  }
  return null;
}

export default getErrorMessagesFromValidationResult;
