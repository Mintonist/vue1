<script setup>
import { useRouter } from 'vue-router';

import { login } from '@/auth';

const router = useRouter();
const onUserLogin = () => {
   login();
   router.push('/');
};
</script>
<template>
   <div class="login">
      <h1>Вход</h1>
      <button @click="onUserLogin" class="btn-login">Войти как пользователь</button>
   </div>
</template>

<style scoped>
.login {
   text-align: center;
   padding: 20px 0;
}

.btn-login {
   display: inline-block;
   background-color: #007bff;
}

.btn-login:hover {
   background-color: #0056b3;
}
</style>
