import * as yup from 'yup';

const validationSchema = yup.object({
   title: yup.string().required('Обязательное поле'),
   description: yup.string().required('Обязательное поле'),
});

export default validationSchema;
