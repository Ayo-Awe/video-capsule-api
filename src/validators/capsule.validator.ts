import Joi, { CustomValidator } from "joi";
import moment from "moment";
import { CreateCapsuleDTO } from "../dto/capuse.dto";

export function validateCreateCapsule(data: CreateCapsuleDTO) {
  // Define validation schema
  const schema = Joi.object({
    email: Joi.string().required().email(),
    s3Key: Joi.string().required(),
    caption: Joi.string().required(),
    unlockDate: Joi.string().required().isoDate().custom(dateValidator),
  });

  return schema.validate(data);
}

const dateValidator: CustomValidator<string> = (value, helpers) => {
  // Minimum valid date is tomorrow
  const tomorrow = moment().add(1, "day");

  if (moment(value).isBefore(tomorrow)) return helpers.error("any.invalid");

  return value;
};
