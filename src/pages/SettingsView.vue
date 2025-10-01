<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
<template>
   <div>
      <h1>Настройки</h1>
      <div class="settings-tabs">
         <RouterLink to="/settings/profile" class="settings-tab"> Профиль </RouterLink>
         <RouterLink to="/settings/security" class="settings-tab">Безопасность</RouterLink>
      </div>
      <div class="settings-panel">
         <RouterView v-slot="{ Component }">
            <Transition :name="route.meta.transition || 'fade'">
               <Component :is="Component" :key="route.path" />
            </Transition>
         </RouterView>
      </div>
   </div>
</template>

<style scoped></style>
