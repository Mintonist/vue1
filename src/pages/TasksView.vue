<script setup></script>
<template>
   <div>
      <h1>Список задач</h1>
      <ul class="task-list">
         <li class="task-item"><RouterLink to="/tasks/1" class="task-link">Задача 1</RouterLink></li>
         <li class="task-item"><RouterLink to="/tasks/2" class="task-link">Задача 2</RouterLink></li>
      </ul>
   </div>
</template>

<style scoped>
.task-list {
   list-style-type: none;
   padding: 0;
   margin: 0;
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
