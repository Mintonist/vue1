<script setup>
defineProps({
   totalPrice: { type: Number, required: true },
});
</script>

<template>
   <div class="basket-table__summary">
      <p class="basket-table__total">
         Total <b>${{ totalPrice }}</b>
      </p>
      <p>Tax ${{ (totalPrice * 0.1).toFixed(2) }}</p>
   </div>
</template>

<style scoped>
.basket-table__summary {
   text-align: right;
}

.basket-table__total {
   font-size: 1.4rem;
}
</style>
