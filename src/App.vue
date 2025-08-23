<script setup>
import Task1_TodoList from './components/Task1_TodoList.vue'
import Task2_ShoppingCart from './components/Task2_ShoppingCart.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="55" height="55" />

    <div class="wrapper">
      <p>Курс Vue от ResultSchool</p>
    </div>
  </header>

  <main>
    <Task1_TodoList />
    <Task2_ShoppingCart />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  align-self: center;
  margin: 1rem 1rem;
  font-size: 2rem;
}

main {
  display: flex;
  flex-direction: column;
  place-items: flex-start;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
