import * as yup from 'yup';

const validationSchema = yup.object({
   firstname: yup.string().required('Обязательное поле'),
   lastname: yup.string().required('Обязательное поле'),
   country: yup.string().required('Обязательное поле'),
   city: yup.string().required('Обязательное поле'),
   phone: yup
      .string()
      .required('Обязательное поле')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(15, 'Must be exactly 15 digits'),
   email: yup.string().required('Обязательное поле').email('invalid email format'),
   password: yup.string().required('Обязательное поле'),
   'confirm-password': yup
      .string()
      .required('Обязательное поле')
      .oneOf([yup.ref('password')], 'пароли должны совпадать'),
   terms: yup.boolean().required('Обязательное поле').oneOf([true], 'Нужно принять условия'),
   comments: yup.string(),
});

export default validationSchema;
