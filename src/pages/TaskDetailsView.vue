<script setup>
import { useTasksStore } from '@/stores/tasks';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({ id: { type: String, required: true } });

const router = useRouter();
const taskStore = useTasksStore();

const { updateTask, removeTask } = taskStore;

const isEditing = ref(false);

const route = useRoute();
watch(
   () => route.params.id,
   (newId, oldId) => {
      console.log('TaskDetailsView', newId, oldId);
   },
);

const onPressEdit = () => {
   isEditing.value = !isEditing.value;
};

const onPressDelete = () => {
   removeTask(props.id);
   router.push('/tasks');
};
</script>

<template>
   <div>
      <h1>Задача {{ id }}</h1>
      <p>Детали задачи #{{ id }}</p>
      <button @click="onPressEdit" class="btn btn--edit">Редактировать</button>
      &nbsp;
      <button @click="onPressDelete" class="btn btn--delete">Удалить</button>
   </div>
</template>

<style scoped>
.form-control {
   display: block;
   width: 100%;
   box-sizing: border-box;
   margin-bottom: 20px;
   padding: 8px;
   border: 1px solid #ccc;
   border-radius: 4px;
   resize: none;
}

.btn {
   padding: 8px 12px;
   border: none;
   border-radius: 4px;
   cursor: pointer;
}

.btn--edit {
   background-color: #007bff;
   color: white;
}

.btn--edit:hover {
   background-color: #0056b3;
}

.btn--delete {
   background-color: #dc3545;
   color: white;
}

.btn--delete:hover {
   background-color: #c82333;
}

.btn--save {
   background-color: #28a745;
   color: white;
}

.btn--save:hover {
   background-color: #218838;
}
</style>
