import { getCurrentTasks, setCurrentTasks } from '@/localstorage.service';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { computed, ref } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
   const tasks = ref(getCurrentTasks());

   const getTotalTasks = computed(() => tasks.value.length);

   const addTask = (data) => {
      console.log('addTask', data);
      tasks.value.push(data);
      saveToLocalStorage();
   };

   const removeTask = (id) => {
      console.log('removeTask', id);
      const index = tasks.value.find((data) => data.id === id);
      console.log('index', index);
      if (index) {
         tasks.value.splice(index, 1);
         saveToLocalStorage();
      }
   };

   const updateTask = (id, data) => {
      console.log('updateTask', id, data);
      const index = tasks.value.find((data) => data.id === id);
      if (index) {
         tasks.value[index] = { ...tasks.value[index], data };
         saveToLocalStorage();
      }
   };

   const saveToLocalStorage = () => {
      console.log('saveToLocalStorage', tasks.value);
      setCurrentTasks(tasks.value);
   };

   return { tasks, getTotalTasks, addTask, removeTask, updateTask };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
