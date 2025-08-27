<script setup>
import { declOfNumText } from '@/helpers';
import { computed, ref } from 'vue';

const todos = ref([
    { id: 1, text: 'Задача 1', completed: false },
    { id: 2, text: 'Задача 2', completed: false },
    { id: 3, text: 'Задача 3', completed: false },
    { id: 4, text: 'Задача 4', completed: false },
]);

function removeTodo(id) {
    todos.value = todos.value.filter((item) => item.id != id);
}

function removeComleted() {
    todos.value = todos.value.filter((item) => !item.completed);
}

function removeAll() {
    todos.value = [];
}

const uncompletedAmount = computed(() => {
    return todos.value.filter((item) => !item.completed).length;
});
</script>

<template>
    <div class="container todo-app">
        <h1 class="title">Todo List</h1>

        <div class="todo-app__main">
            <ul v-if="todos.length > 0" class="todo-list">
                <li
                    v-for="todo in todos"
                    :key="todo.id"
                    class="todo-list__item"
                    :class="{ 'todo-list__item--completed': todo.completed }"
                >
                    <span class="todo-list__item-text">{{ todo.id + ' ' + todo.text }}</span>
                    <button
                        @click="
                            () => {
                                todo.completed = true;
                            }
                        "
                        class="btn btn--check"
                        aria-label="Завершить"
                        :disabled="todo.completed"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            width="15"
                            height="22"
                        >
                            <path
                                d="M438.6 109.4c-12.5-12.5-32.8-12.5-45.3 0L160 320.7l-92.3-92.3c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0l288-288c12.6-12.5 12.6-32.8 .1-45.3z"
                            />
                        </svg>
                    </button>
                    <button
                        @click="removeTodo(todo.id)"
                        class="btn btn--delete"
                        aria-label="Удалить"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            width="15"
                            height="22"
                        >
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

        <div class="todo-app__footer">
            <p class="todo-app__footer-text">
                {{
                    'Осталось ' +
                    declOfNumText(uncompletedAmount, ['задание', 'задания', 'заданий'], true)
                }}
            </p>
            <button @click="removeComleted" class="btn btn--clear">Удалить завершенные</button>
            <button @click="removeAll" class="btn btn--clear">Очистить список</button>
        </div>
    </div>
</template>

<style scoped src="./task1.css" />
