<script setup>
import { reactive } from 'vue';
import Task1_TodoList from './task1/Task1_TodoList.vue';
import Task2_ShoppingCart from './task2/Task2_ShoppingCart.vue';
import Task3_Likes from './task3/Task3_Likes.vue';

let arr = reactive([
   { id: 1, name: 'TodoList', component: Task1_TodoList, show: false },
   { id: 2, name: 'ShoppingCart', component: Task2_ShoppingCart, show: true },
   { id: 3, name: 'Likes', component: Task3_Likes, show: false },
]);
</script>

<template>
   <header>
      <div class="wrapper">
         <div class="list">
            <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="55" height="55" />
            <p>Курс Vue от ResultSchool</p>
         </div>
         <div class="list">
            <div v-for="item in arr" :key="item.id">
               <button
                  @click="
                     () => {
                        item.show = !item.show;
                     }
                  "
                  class="btn"
                  :class="{ 'btn--active': item.show }"
               >
                  {{ item.id + '. ' + item.name }}
               </button>
            </div>
         </div>
      </div>
   </header>

   <main>
      <template v-for="item in arr" :key="item.id">
         <component :is="item.component" v-show="item.show"></component>
      </template>
      <!-- <Task1_TodoList v-show="task1Show" /> -->
      <!-- <Task2_ShoppingCart v-show="task2Show" /> -->
      <!-- <Task3_Likes v-show="task3Show" /> -->
   </main>
</template>

<style scoped>
header {
   line-height: 1.5;
   align-self: center;
   margin: 1rem 1rem;
   font-size: 2rem;
}

main {
   display: flex;
   flex-direction: column;
   place-items: flex-start;
}

.list {
   display: flex;
   justify-content: space-evenly;
   margin: 0 auto 2rem;
}

.btn {
   background-color: #505553;

   color: white;
   border: none;
   padding: 7px 10px;
   margin: 7px 10px;
   border-radius: 5px;
   cursor: pointer;
}

.btn--active {
   background-color: #43b686;
}

.btn:disabled {
   cursor: not-allowed;
}

.logo {
   display: block;
   margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
   header {
      display: flex;
      place-items: center;
   }

   .logo {
      margin: 0 2rem 0 0;
   }

   header .wrapper {
      display: flex;
      flex-direction: column;
      /* place-items: flex-start; */
      flex-wrap: wrap;
   }
}
</style>
