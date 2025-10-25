<script setup>
import MessageSpanBase from '@/components/base/MessageSpanBase.vue';
import { useUserStore } from '@/stores/user';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
const inputClass = 'border border-gray-800 rounded-md w-full p-2';
const labelClass = 'block text-gray-800';
const errorClass = 'block text-red-800';

const errorMessage = ref('');
const paloMessage = ref('');
const router = useRouter();

const schema = yup.object({
   login: yup.string().required('Логин обязательный').min(3, 'Минимум 3 символа'),
   password: yup.string().required('Пароль обязательный').min(6, 'Минимум 6 символов'),
   confirm: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});
const userStore = useUserStore();

const onSubmit = async (data) => {
   errorMessage.value = '';
   console.log('onSubmit() data:', data);
   try {
      const response = await userStore.register(data.login, data.password);
      console.log('onSubmit() response:', response);
      if (response.error) {
         errorMessage.value = response.error;
      } else {
         router.push('/');
      }
   } catch (e) {
      errorMessage.value = 'Ошибка: ' + e;
   }
};

const onSubmitPalo = async (data, e) => {
   paloMessage.value = '';
   console.log('onSubmitPalo() data:', data, e.evt.submitter.value);
   const needPost = e.evt.submitter.value == 'post';
   try {
      const response = await fetch(
         data.url + '/server/info',
         needPost
            ? {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
              }
            : {
                 method: 'GET',
              },
      );
      if (!response.ok) {
         throw new Error('User response error: ' + response.status);
      }

      const res = await response.text();
      console.log('onSubmitPalo() response:', res);
      paloMessage.value = res;
   } catch (e) {
      paloMessage.value = 'Ошибка: ' + e;
   }
};
</script>

<template>
   <div class="py-8">
      <h1 class="text-2xl text-center my-4">Регистрация</h1>
      <Form
         :validation-schema="schema"
         @submit="onSubmit"
         class="bg-white rounded-md shadow-md w-full max-w-sm mx-auto p-6"
      >
         <div class="mb-4">
            <label for="login" :class="labelClass">Логин</label>
            <Field type="text" name="login" id="login" :class="inputClass" />
            <ErrorMessage name="login" :class="errorClass" />
         </div>
         <div class="mb-4">
            <label for="password" :class="labelClass">Пароль</label>
            <Field type="password" name="password" id="password" :class="inputClass" />
            <ErrorMessage name="password" :class="errorClass" />
         </div>
         <div class="mb-4">
            <label for="confirm" :class="labelClass">Повтор пароля</label>
            <Field type="password" name="confirm" id="confirm" :class="inputClass" />
            <ErrorMessage name="confirm" :class="errorClass" />
         </div>
         <button
            type="submit"
            class="w-full cursor-pointer text-xl bg-blue-500 hover:bg-blue-700 rounded-md text-white p-4 mb-4"
         >
            Зарегистрироваться
         </button>
         <p class="text-center text-gray-700">
            Есть логин?
            <RouterLink to="/login" class="text-blue-500 hover:underline">Войти</RouterLink>
         </p>
         <MessageSpanBase v-if="errorMessage" type="error">{{ errorMessage }}</MessageSpanBase>
      </Form>

      <Form @submit="onSubmitPalo" class="bg-white rounded-md shadow-md w-full max-w-sm mx-auto p-6 mt-12">
         <div class="mb-4">
            <label for="url" :class="labelClass">Palo url</label>
            <Field
               type="text"
               name="url"
               id="url"
               :class="inputClass"
               placeholder="http://127.0.0.1:7777"
               :required="true"
            />
            <ErrorMessage name="url" :class="errorClass" />
         </div>
         <button
            type="submit"
            value="get"
            class="w-full cursor-pointer text-xl bg-blue-500 hover:bg-blue-700 rounded-md text-white p-4 mb-4"
         >
            Отправить GET запрос на PALO
         </button>
         <button
            type="submit"
            value="post"
            class="w-full cursor-pointer text-xl bg-blue-500 hover:bg-blue-700 rounded-md text-white p-4 mb-4"
         >
            Отправить POST запрос на PALO
         </button>
         <MessageSpanBase v-if="paloMessage" type="error">{{ paloMessage }}</MessageSpanBase>
      </Form>
   </div>
</template>
