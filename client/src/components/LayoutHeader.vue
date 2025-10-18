<script setup>
import LayoutContainer from './LayoutContainer.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBackward, faCode, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
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
            <p class="mb-3">
               <RouterLink
                  to="/login"
                  aria-label="Вход"
                  class="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-700"
                  >Войти</RouterLink
               >
            </p>
            <p>
               <a href="#" @click="$router.go(-1)" aria-label="Назад" class="hover:text-blue-400"
                  ><FontAwesomeIcon :icon="faBackward"
               /></a>
               &nbsp;&nbsp;
               <RouterLink to="/posts" aria-label="Новая статья" class="hover:text-blue-400"
                  ><FontAwesomeIcon :icon="faFile"
               /></RouterLink>
               &nbsp;&nbsp;
               <RouterLink to="/users" aria-label="Пользователи" class="hover:text-blue-400"
                  ><FontAwesomeIcon :icon="faUsers"
               /></RouterLink>
            </p>
         </div>
      </div>
   </LayoutContainer>
</template>

<style lang="scss" scoped></style>
