<script setup>
import { getCurrentBasket, setCurrentBasket } from '@/localstorage.service';
import { computed, reactive } from 'vue';
import BasketTable from './components/BasketTable.vue';

const basket = reactive(getCurrentBasket());

function removeItem(id) {
   const index = basket.findIndex((item) => item.id == id);
   if (index >= 0) {
      basket.splice(index, 1);
      setCurrentBasket(basket);
   }
}

function increaseItemQuantity(item) {
   ++item.quantity;
   setCurrentBasket(basket);
}

function decreaseItemQuantity(item) {
   if (item.quantity > 1) {
      --item.quantity;
      setCurrentBasket(basket);
   }
}

const totalPrice = computed(() => {
   let total = 0;
   basket.forEach((item) => {
      total += item.price * item.quantity;
   });
   return total;
});
</script>

<template>
   <div class="container basket">
      <BasketTable
         v-bind="{ totalPrice, basket }"
         @decrease-item-quantity="decreaseItemQuantity"
         @increase-item-quantity="increaseItemQuantity"
         @remove-item="removeItem"
      />
   </div>
</template>

<style scoped>
.container {
   max-width: 1200px;
   margin: 0 auto;
   background-color: #fff;
}
</style>
