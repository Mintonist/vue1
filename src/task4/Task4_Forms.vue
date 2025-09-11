<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

import { cities } from './constants.js';
import validationSchema from './validationSchema.js';

const showPass1 = ref(false);
const showPass2 = ref(false);
const submitSuccess = ref(false);

const onFormSubmit = (values) => {
   submitSuccess.value = true;
   console.log('onFormSubmit', values);
};
</script>

<template>
   <div class="container">
      <h1 class="title">Регистрация</h1>
      <Form :validation-schema="validationSchema" class="registration-form" autocomplete="off" @submit="onFormSubmit">
         <div class="form-group">
            <label class="form-label" for="firstname">Имя *</label>
            <Field class="form-control" name="firstname" type="text" id="firstname" />
            <ErrorMessage name="firstname" />
         </div>
         <div class="form-group">
            <label class="form-label" for="lastname">Фамилия *</label>
            <Field class="form-control" name="lastname" type="text" id="lastname" />
            <ErrorMessage name="lastname" />
         </div>
         <div class="form-group">
            <label class="form-label" for="country">Страна/Регион *</label>
            <Field class="form-control" name="country" type="text" id="country" required />
            <ErrorMessage name="country" />
         </div>
         <div class="form-group">
            <label class="form-label" for="city">Город *</label>
            <div class="custom-select">
               <Field as="select" class="form-control" id="city" name="city" required>
                  <option value="" disabled selected>Выберите город</option>
                  <option v-for="(item, index) in cities" :value="item.value" :key="index">
                     {{ item.text }}
                  </option>
               </Field>
               <ErrorMessage name="city" />
            </div>
         </div>
         <div class="form-group">
            <label class="form-label" for="phone">Телефон *</label>
            <Field class="form-control" type="tel" name="phone" id="phone" required />
            <ErrorMessage name="phone" />
         </div>
         <div class="form-group">
            <label class="form-label" for="email">Email *</label>
            <Field class="form-control" type="email" name="email" id="email" required />
            <ErrorMessage name="email" />
         </div>
         <div class="form-group form-group--password">
            <label class="form-label" for="password">Пароль *</label>
            <Field
               class="form-control"
               :type="showPass1 ? 'text' : 'password'"
               name="password"
               id="password"
               required
            />
            <ErrorMessage name="password" />
            <button class="btn-icon btn-icon--password" type="button" @click="showPass1 = !showPass1">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path
                     d="M12 4.5C6.5 4.5 2 9 2 12s4.5 7.5 10 7.5S22 14.5 22 12s-4.5-7.5-10-7.5zm0 13c-3.1 0-5.5-2.4-5.5-5.5S8.9 7.5 12 7.5s5.5 2.4 5.5 5.5S15.1 17.5 12 17.5z"
                  />
                  <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2c1.1 0 2-.9 2-2s-.9-2-2-2z" />
               </svg>
            </button>
         </div>
         <div class="form-group form-group--password">
            <label class="form-label" for="confirm-password">Подтвердите пароль *</label>
            <Field
               class="form-control"
               :type="showPass2 ? 'text' : 'password'"
               name="confirm-password"
               id="confirm-password"
               required
            />
            <ErrorMessage name="confirm-password" />
            <button class="btn-icon btn-icon--password" type="button" @click="showPass2 = !showPass2">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path
                     d="M12 4.5C6.5 4.5 2 9 2 12s4.5 7.5 10 7.5S22 14.5 22 12s-4.5-7.5-10-7.5zm0 13c-3.1 0-5.5-2.4-5.5-5.5S8.9 7.5 12 7.5s5.5 2.4 5.5 5.5S15.1 17.5 12 17.5z"
                  />
                  <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2c1.1 0 2-.9 2-2s-.9-2-2-2z" />
               </svg>
            </button>
         </div>
         <div class="form-group form-group--full-width">
            <label class="form-label" for="comments">Дополнительная информация</label>
            <Field as="textarea" class="form-control" id="comments" name="comments"></Field>
         </div>
         <div class="form-group form-group--full-width">
            <label class="form-label form-label--checkbox" for="terms">
               <Field type="checkbox" id="terms" name="terms" :value="true" :unchecked-value="false" />
               Я согласен c условиями пользования и политикой конфиденциальности
            </label>
            <ErrorMessage name="terms" />
         </div>
         <button class="btn" type="submit">Зарегистрироваться</button>
         <button class="btn" type="reset">Очистить форму</button>
      </Form>
      <div v-if="submitSuccess" class="message message--success">Регистрация прошла успешно!</div>
   </div>
</template>

<style scoped src="./task4.css" />
