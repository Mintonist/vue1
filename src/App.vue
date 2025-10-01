<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
   <div class="wrapper min-w-1/2">
      <nav class="navigation">
         <div class="navigation-left">
            <RouterLink to="/dashboard">Dashboard</RouterLink>
            <RouterLink to="/tasks">Tasks</RouterLink>
            <RouterLink to="/settings">Settings</RouterLink>
         </div>
      </nav>
      <main class="container">
         <div>
            <RouterView v-slot="{ Component }">
               <Transition :name="route.meta.transition || 'fade'">
                  <Component :is="Component" :key="route.path" />
               </Transition>
            </RouterView>
         </div>
      </main>
   </div>
</template>

<style scoped></style>
