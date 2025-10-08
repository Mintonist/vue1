<script setup>
import TaskForm from '@/components/TaskForm.vue';
import { useTasksStore } from '@/stores/tasks';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({ id: { type: String, required: true } });

const router = useRouter();
const taskStore = useTasksStore();

const { removeTask, updateTask } = taskStore;

const isEditing = ref(false);

const route = useRoute();

const taskInfo = computed(() => taskStore.tasks.find((data) => data.id == props.id));

if (!taskInfo.value) {
   router.replace('/404');
}

watch(
   () => route.params.id,
   (newId, oldId) => {
      console.log('TaskDetailsView', newId, oldId);
   },
);

const onSwitchEdit = () => {
   isEditing.value = !isEditing.value;
};

const onSubmit = (data) => {
   updateTask(props.id, data);
   onSwitchEdit();
};

const onPressDelete = () => {
   removeTask(props.id);
   router.push('/tasks');
};
</script>

<template>
   <div v-if="taskInfo">
      <div v-if="!isEditing">
         <h1>{{ taskInfo?.title }}</h1>
         <p>{{ taskInfo?.description }}</p>
         <button @click="onSwitchEdit" class="btn btn--edit">Редактировать</button>
         &nbsp;
         <button @click="onPressDelete" class="btn btn--delete">Удалить</button>
      </div>
      <TaskForm v-else :info="taskInfo" @reset="onSwitchEdit" @submit="onSubmit" />
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
