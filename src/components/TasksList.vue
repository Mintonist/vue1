<script setup>
import { useTasksStore } from '@/stores/tasks';
import { storeToRefs } from 'pinia';

const taskStore = useTasksStore();
const { tasks, getTotalTasks } = storeToRefs(taskStore);
</script>

<template>
   <div>
      <h1 v-if="getTotalTasks > 0">Список задач ({{ getTotalTasks }})</h1>
      <h1 v-else>Нет задач для отображения</h1>
      <ul class="task-list">
         <li v-for="info in tasks" :key="info.id" class="task-item">
            <RouterLink :to="'/tasks/' + info.id" class="task-link">{{ info.title }}</RouterLink>
         </li>
      </ul>
   </div>
</template>

<style scoped>
.task-list {
   list-style-type: none;
   padding: 0;
   margin: 0 0 30px;
   display: flex;
   gap: 20px;
   flex-wrap: wrap;
}

.task-item {
   flex-basis: 30%;
}

.task-link {
   display: block;
   text-decoration: none;
   color: #333;
   font-weight: bold;
   background-color: #f0f0f0;
   padding: 40px 10px;
   border-radius: 4px;
   transition: background-color 0.3s;
   text-align: center;
}

.task-link:hover {
   background-color: #e0e0e0;
}
</style>
