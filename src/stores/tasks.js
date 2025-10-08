import { getCurrentTasks, setCurrentTasks } from '@/localstorage.service';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { computed, reactive } from 'vue';

export const useTasksStore = defineStore('tasks', () => {
   const tasks = reactive(getCurrentTasks());

   const getTotalTasks = computed(() => tasks.length);

   const addTask = (data) => {
      console.log('addTask', data);

      tasks.push({ ...data, id: Date.now().toString() });
      saveToLocalStorage();
   };

   const removeTask = (id) => {
      console.log('removeTask', id);
      const index = tasks.findIndex((data) => data.id === id);
      console.log('index', index);
      if (index >= 0) {
         tasks.splice(index, 1);
         saveToLocalStorage();
      }
   };

   const updateTask = (id, data) => {
      console.log('updateTask', id, data);
      const index = tasks.findIndex((data) => data.id === id);
      console.log('index', index);
      if (index >= 0) {
         tasks[index] = { ...tasks[index], ...data };
         saveToLocalStorage();
      }
   };

   const saveToLocalStorage = () => {
      console.log('saveToLocalStorage', tasks);
      setCurrentTasks(tasks);
   };

   return { tasks, getTotalTasks, addTask, removeTask, updateTask };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
