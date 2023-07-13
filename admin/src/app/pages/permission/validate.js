import * as yup from 'yup';

const yupSchema = yup.object().shape({});

const updateSchema = yup.object().shape({});

export const validate = {
  create: yupSchema,
  update: updateSchema,
};
