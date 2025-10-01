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
            <Transition :name="route.meta.transition || 'fade'" mode="out-in">
               <Component :is="Component" :key="route.path" />
            </Transition>
         </RouterView>
      </div>
   </div>
</template>

<style scoped>
.settings-tabs {
   display: flex;
   border-bottom: 1px solid #929292;
   margin-bottom: 20px;
}

.settings-tab {
   background-color: #f0f0f0;
   color: #333;
   padding: 8px 12px;
   border-radius: 4px 4px 0 0;
   text-decoration: none;
   margin-right: 5px;
   transition:
      background-color 0.3s,
      color 0.3s;
}

.settings-tab.router-link--active {
   background-color: #929292;
   color: white;
}

.settings-tab:hover {
   text-decoration: none;
   background-color: #929292;
   color: white;
}

.settings-panel {
   margin: 30px 0;
}
</style>
