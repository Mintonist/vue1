<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';

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
      <h1>Задача {{ route.params.id }}</h1>
      <p>Детали задачи #{{ route.params.id }}</p>
   </div>
</template>

<style scoped></style>
