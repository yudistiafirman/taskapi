import { body } from "express-validator";
import {
  DESCRIPTION_MUST_STRING,
  DESCRIPTION_REQUIRED,
  TITLE_MUST_STRING,
  TITLE_REQUIRED,
} from "../const/message";

export const validateTask = [
  body("title")
    .notEmpty()
    .withMessage(TITLE_REQUIRED)
    .isString()
    .withMessage(TITLE_MUST_STRING),
  body("description")
    .notEmpty()
    .withMessage(DESCRIPTION_REQUIRED)
    .isString()
    .withMessage(DESCRIPTION_MUST_STRING),
];
