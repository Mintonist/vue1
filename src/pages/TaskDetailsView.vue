<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';

defineProps({ id: { type: String, required: true } });

const route = useRoute();
watch(
   () => route.params.id,
   (newId, oldId) => {
      console.log('TaskDetailsView', newId, oldId);
   },
);
</script>
<template>
   <div>
      <h1>Задача {{ id }}</h1>
      <p>Детали задачи #{{ id }}</p>
   </div>
</template>

<style scoped></style>
