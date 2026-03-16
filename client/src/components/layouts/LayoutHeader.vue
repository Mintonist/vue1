<script setup lang="ts">
import LayoutContainer from './LayoutContainer.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBackward, faCode, faUsers, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();
const { user, isAuth, isAdmin } = storeToRefs(userStore);

const onLogout = () => {
   userStore.logout();

   router.push('/login');
};
</script>

<template>
   <LayoutContainer>
      <div class="flex items-center justify-between py-4">
         <div>
            <RouterLink to="/" class="hover:text-blue-400">
               <FontAwesomeIcon :icon="faCode" :border="true" :pulse="true" :spin="true" />
               Блог веб-разработчика
            </RouterLink>
         </div>
         <div>
            <p>Веб технологии</p>
            <p>Написание кода</p>
            <p>Разбор ошибок</p>
         </div>
         <div>
            <div class="mb-3">
               <RouterLink
                  v-if="!isAuth"
                  to="/login"
                  aria-label="Вход"
                  class="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-700"
               >
                  Войти
               </RouterLink>
               <div v-else class="text-right">
                  <span>{{ user.login }}</span>
                  &nbsp;|&nbsp;
                  <button @click="onLogout" class="cursor-pointer hover:text-blue-500">
                     <FontAwesomeIcon :icon="faArrowRightFromBracket" />
                  </button>
               </div>
            </div>
            <p>
               <a href="#" @click="$router.go(-1)" aria-label="Назад" class="hover:text-blue-400"
                  ><FontAwesomeIcon :icon="faBackward"
               /></a>
               &nbsp;&nbsp;
               <RouterLink v-if="isAuth && isAdmin" to="/post" aria-label="Новая статья" class="hover:text-blue-400"
                  ><FontAwesomeIcon :icon="faFile"
               /></RouterLink>
               &nbsp;&nbsp;
               <RouterLink v-if="isAuth && isAdmin" to="/users" aria-label="Пользователи" class="hover:text-blue-400"
                  ><FontAwesomeIcon :icon="faUsers"
               /></RouterLink>
            </p>
         </div>
      </div>
   </LayoutContainer>
</template>

<style lang="scss" scoped></style>
