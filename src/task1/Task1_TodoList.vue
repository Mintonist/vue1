<script setup>
import { declOfNumText } from '@/helpers';
import { computed, onMounted, ref } from 'vue';
import { useFetch } from './composbles/useFetch';

const todos = ref([]);
const { error, isLoading, fetchData } = useFetch();

const fetchTodos = async () => {
   const data = await fetchData('http://localhost:3000/todos');

   if (!error.value) {
      //todos.value = [];
      todos.value.push(...data);
   }
};

const removeTodo = async (id) => {
   await fetchData('http://localhost:3000/todos/' + id, { method: 'DELETE' });
   if (!error.value) todos.value = todos.value.filter((item) => item.id != id);
};

const addTodo = async () => {
   const newTodo = { id: Date.now().toString(), text: newItem.value, completed: false };
   await fetchData('http://localhost:3000/todos/', { method: 'POST', body: newTodo });
   console.log('error', error.value);
   if (!error.value) {
      console.log('newTodo', newTodo);
      todos.value.push(newTodo);
      newItem.value = '';
   }
};

const completeTodo = async (id) => {
   const modifyTodo = { completed: true };
   await fetchData('http://localhost:3000/todos/' + id, { method: 'PATCH', body: modifyTodo });
   if (!error.value)
      todos.value.forEach(async (item) => {
         if (item.id == id) {
            item.completed = true;
         }
      });
};

const fetchTodos2 = async () => {
   error.value = '';
   isLoading.value = true;
   try {
      const response = await fetch('http://localhost:3000/todos/');
      if (!response.ok) {
         error.value = await response.json();
         return;
      }
      const data = await response.json();
      todos.value.push(...data);
   } catch (err) {
      error.value = err.message;
   } finally {
      isLoading.value = false;
   }
};

const removeTodo2 = async (id) => {
   error.value = '';
   isLoading.value = true;
   try {
      const response = await fetch('http://localhost:3000/todos/' + id, { method: 'DELETE' });
      if (!response.ok) {
         error.value = await response.json();
         return;
      }

      todos.value = todos.value.filter((item) => item.id != id);
   } catch (err) {
      error.value = err.message;
   } finally {
      isLoading.value = false;
   }
};

const addTodo2 = async () => {
   error.value = '';
   isLoading.value = true;
   const newTodo = { id: Date.now().toString(), text: newItem.value, completed: false };
   try {
      const response = await fetch('http://localhost:3000/todos/', { method: 'POST', body: JSON.stringify(newTodo) });
      if (!response.ok) {
         error.value = await response.json();
         return;
      }

      todos.value.push(newTodo);
      newItem.value = '';
   } catch (err) {
      error.value = err.message;
   } finally {
      isLoading.value = false;
   }
};

const completeTodo2 = async (id) => {
   error.value = '';
   isLoading.value = true;
   const modifyTodo = { completed: true };
   try {
      const response = await fetch('http://localhost:3000/todos/' + id, {
         method: 'PATCH',
         body: JSON.stringify(modifyTodo),
      });
      if (!response.ok) {
         error.value = await response.json();
         return;
      }

      todos.value.forEach(async (item) => {
         if (item.id == id) {
            item.completed = true;
         }
      });
   } catch (err) {
      error.value = err.message;
   } finally {
      isLoading.value = false;
   }
};

onMounted(() => {
   fetchTodos();
});

const newItem = ref('');

// function addTodo(data) {
//    console.log('addTodo', data);

//    if (newItem.value?.length > 0) {
//       todos.value.push({ id: Date.now(), text: newItem.value, completed: false });
//       newItem.value = '';
//    }
// }

// function removeTodo(id) {
//    todos.value = todos.value.filter((item) => item.id != id);
// }

// async function removeComleted() {
//    todos.value.forEach(async (item) => {
//       if (item.completed) {
//          await removeTodo(item.id);
//       }
//    });
// }

function removeComleted() {
   todos.value.forEach((item) => {
      if (item.completed) {
         removeTodo(item.id);
      }
   });
}

function removeAll() {
   todos.value.forEach((item) => {
      removeTodo(item.id);
   });
}

const uncompletedAmount = computed(() => {
   return todos.value.filter((item) => !item.completed).length;
});
</script>

<template>
   <div class="container todo-app">
      <h1 class="title">Todo List</h1>

      <form class="form" @submit.prevent="addTodo">
         <div class="form__group form__group--todo">
            <input v-model.trim="newItem" class="form-control" type="text" placeholder="Новая задача" />
            <button :disabled="newItem?.length == 0" class="btn btn--add-todo" type="submit">Добавить</button>
         </div>
      </form>

      <div v-if="!isLoading" class="todo-app__main">
         <ul v-if="todos.length > 0" class="todo-list">
            <li
               v-for="todo in todos"
               :key="todo.id"
               class="todo-list__item"
               :class="{ 'todo-list__item--completed': todo.completed }"
            >
               <span class="todo-list__item-text">{{ todo.text }}</span>
               <button
                  @click="completeTodo(todo.id)"
                  class="btn btn--check"
                  aria-label="Завершить"
                  :disabled="todo.completed"
               >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="15" height="22">
                     <path
                        d="M438.6 109.4c-12.5-12.5-32.8-12.5-45.3 0L160 320.7l-92.3-92.3c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0l288-288c12.6-12.5 12.6-32.8 .1-45.3z"
                     />
                  </svg>
               </button>
               <button @click="removeTodo(todo.id)" class="btn btn--delete" aria-label="Удалить">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="15" height="22">
                     <path
                        d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                     />
                  </svg>
               </button>
            </li>
         </ul>
         <div v-else class="todo-list__empty">
            <p>Список задач пуст</p>
         </div>
      </div>
      <div v-else>
         <p>Идёт загрузка...</p>
      </div>

      <div class="todo-app__footer">
         <p class="todo-app__footer-text">
            {{ 'Осталось ' + declOfNumText(uncompletedAmount, ['задание', 'задания', 'заданий'], true) }}
         </p>
         <button @click="removeComleted" class="btn btn--clear">Удалить завершенные</button>
         <button @click="removeAll" class="btn btn--clear">Очистить список</button>
      </div>

      <div v-if="error" class="error">
         <p>Ошибка {{ error }}</p>
      </div>
   </div>
</template>

<style scoped src="./task1.css" />
