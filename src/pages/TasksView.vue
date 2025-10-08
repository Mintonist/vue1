<script setup>
import TaskForm from '@/components/TaskForm.vue';
import TasksList from '@/components/TasksList.vue';
import { useTasksStore } from '@/stores/tasks';

const taskStore = useTasksStore();
const { addTask } = taskStore;
</script>

<template>
   <div>
      <TasksList />
      <hr />
      <TaskForm @submit="addTask" />
   </div>
</template>

<style scoped></style>
