<script setup>
import { onMounted, ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { db } from '../firebase.js';
//import { cities } from './constants.js';
import validationSchema from './validationSchema.js';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

const submitSuccess = ref(false);
const isLoading = ref(false);
const error = ref('');
const cities = ref([]);

const fetchCities = async () => {
   try {
      isLoading.value = true;
      const col = collection(db, 'cities');
      console.log(col);
      if (!col) {
         error.value = 'Проблема загрузки списка городов';
         return;
      }

      const snapshot = await getDocs(col);
      cities.value = snapshot.docs.map((doc) => doc.data());
   } catch (err) {
      error.value = err.message;
   } finally {
      isLoading.value = false;
   }
};

onMounted(() => {
   fetchCities();
});

const showPass1 = ref(false);
const showPass2 = ref(false);

const onFormSubmit = async (values) => {
   console.log('onFormSubmit', values);
   submitSuccess.value = false;
   error.value = '';
   isLoading.value = true;

   const { city, comments, country, email, firstname, lastname, password, phone } = values;
   const newUser = { city, comments, country, email, firstname, lastname, password, phone, id: Date.now().toString() };

   // проверяем, что email уникальный
   try {
      const col = collection(db, 'users');
      const snapshot = await getDocs(col);
      const existingUser = snapshot.docs.find((doc) => doc.data().email === newUser.email);

      console.log('existingUser', existingUser);

      if (existingUser) {
         error.value = 'Пользователь с таким e-mail уже существует';
         return;
      }

      // добавляем нового user в Firestore
      const userRef = doc(db, 'users', newUser.id);

      await setDoc(userRef, newUser);
      submitSuccess.value = true;
   } catch (err) {
      error.value = err.message;
   } finally {
      isLoading.value = false;
   }
};
</script>

<template>
   <div class="container">
      <h1 class="title">Регистрация</h1>
      <Form :validation-schema="validationSchema" class="registration-form" autocomplete="off" @submit="onFormSubmit">
         <div class="form-group">
            <label class="form-label" for="firstname">Имя *</label>
            <Field class="form-control" name="firstname" type="text" id="firstname" value="Иван" />
            <ErrorMessage name="firstname" />
         </div>
         <div class="form-group">
            <label class="form-label" for="lastname">Фамилия *</label>
            <Field class="form-control" name="lastname" type="text" id="lastname" value="Иванов" />
            <ErrorMessage name="lastname" />
         </div>
         <div class="form-group">
            <label class="form-label" for="country">Страна/Регион *</label>
            <Field class="form-control" name="country" type="text" id="country" required value="Китай" />
            <ErrorMessage name="country" />
         </div>
         <div class="form-group">
            <label class="form-label" for="city">Город *</label>
            <div class="custom-select">
               <Field as="select" class="form-control" id="city" name="city" required value="spb">
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
            <Field class="form-control" type="tel" name="phone" id="phone" required value="1234567890" />
            <ErrorMessage name="phone" />
         </div>
         <div class="form-group">
            <label class="form-label" for="email">Email *</label>
            <Field class="form-control" type="email" name="email" id="email" required value="test@test.test" />
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
               value="123"
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
               value="123"
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
            <Field as="textarea" class="form-control" id="comments" name="comments" value="справка"></Field>
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
      <div v-if="error" class="message message--error">
         <p>Ошибка {{ error }}</p>
      </div>
   </div>
   <div v-if="isLoading" class="loading-overlay"><p>Загрузка ...</p></div>
</template>

<style scoped src="./task4.css" />
