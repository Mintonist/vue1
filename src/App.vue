<script setup>
import { useRoute, useRouter } from 'vue-router';

import { isLoggesIn } from './auth';

const route = useRoute();

import { logout } from '@/auth';

const router = useRouter();
const onUserLogout = () => {
   logout();
   router.push('/');
};
</script>

<template>
   <div class="wrapper min-w-1/2">
      <nav class="navigation">
         <div class="navigation-left">
            <RouterLink to="/">Dashboard</RouterLink>
            <RouterLink to="/tasks">Tasks</RouterLink>
            <RouterLink to="/settings">Settings</RouterLink>
         </div>
         <div class="navigation-right">
            <RouterLink v-if="!isLoggesIn" to="/login">Login</RouterLink>
            <button v-if="isLoggesIn" @click="onUserLogout" class="btn-logout">Выйти</button>
         </div>
      </nav>
      <main class="container">
         <div>
            <RouterView v-slot="{ Component }">
               <Transition :name="route.meta.transition || 'fade'" mode="out-in">
                  <Component :is="Component" :key="route.path" />
               </Transition>
            </RouterView>
         </div>
      </main>
   </div>
</template>

<style>
body {
   font-family: sans-serif;
   margin: 0;
   background-color: #f6f7f9;
   color: #333;
}

.wrapper {
   max-width: 800px;
   margin: 0 auto;
   top: 20vh;
   position: relative;
}

.container {
   max-width: 800px;
   margin: 0 auto;
   padding: 20px;
   background: white;
   border-radius: 0 0 8px 8px;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
   padding: 30px;
}

.navigation {
   display: flex;
   justify-content: space-between;
   align-items: center;
   background: #1e1e2f;
   border-radius: 8px 8px 0 0;
   padding: 12px 20px;
   color: white;
   line-height: 1.75;
}

.navigation-left,
.navigation-right {
   display: flex;
   align-items: center;
   gap: 20px;
}

.navigation a:not(.btn-logout) {
   color: #f9f9f9;
   text-decoration: none;
   font-weight: 500;
   transition: opacity 0.3s ease;
}

.navigation a.router-link--intermediate,
.navigation a.router-link--active {
   opacity: 1;
   color: #ffffff;
   font-weight: bold;
}

.navigation a:hover {
   opacity: 0.8;
}

.btn-logout {
   background: #ff4d4f;
   border: none;
   color: white;
   padding: 6px 12px;
   border-radius: 4px;
   cursor: pointer;
   font-weight: 500;
   text-decoration: none;
   line-height: normal;
   font-size: 0.8rem;
}

/* Animation styles */

.fade-enter-active,
.fade-leave-active {
   transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
   opacity: 0;
}
</style>
