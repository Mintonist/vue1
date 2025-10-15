<script setup>
import BasketTable from './components/BasketTable.vue';
import { useBasketStore } from './stores/basket';
import { storeToRefs } from 'pinia';

const basketStore = useBasketStore();
const { basket, totalBasketPrice: totalPrice } = storeToRefs(basketStore);
const { removeBasketItem, updateBasketItem } = basketStore;

function increaseItemQuantity(item) {
   ++item.quantity;
   updateBasketItem(item.id, item);
}

function decreaseItemQuantity(item) {
   if (item.quantity > 1) {
      --item.quantity;
      updateBasketItem(item.id, item);
   }
}
</script>

<template>
   <div class="container basket">
      <BasketTable
         v-bind="{ totalPrice, basket }"
         @decrease-item-quantity="decreaseItemQuantity"
         @increase-item-quantity="increaseItemQuantity"
         @remove-item="removeBasketItem"
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
