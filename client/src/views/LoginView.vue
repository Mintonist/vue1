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
const router = useRouter();

const schema = yup.object({
   login: yup.string().required('Логин обязательный').min(3, 'Минимум 3 символа'),
   password: yup.string().required('Пароль обязательный').min(6, 'Минимум 6 символов'),
});
const userStore = useUserStore();

const onSubmit = async (data) => {
   errorMessage.value = '';
   console.log('onSubmit() data:', data);
   try {
      const response = await userStore.login(data.login, data.password);
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
</script>

<template>
   <div class="py-8">
      <h1 class="text-2xl text-center my-4">Войти</h1>
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
         <button
            type="submit"
            class="w-full cursor-pointer text-xl bg-blue-500 hover:bg-blue-700 rounded-md text-white p-4 mb-4"
         >
            Войти
         </button>
         <p class="text-center text-gray-700">
            Нет логина?
            <RouterLink to="/register" class="text-blue-500 hover:underline">Зарегистрироваться</RouterLink>
         </p>
         <MessageSpanBase v-if="errorMessage" type="error">{{ errorMessage }}</MessageSpanBase>
      </Form>
   </div>
</template>
