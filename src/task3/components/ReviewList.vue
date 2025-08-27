<script setup>
import ReviewListItem from './ReviewListItem.vue';

defineProps({
   filteredReviews: { type: Array, required: true },
});
</script>

<template>
   <ul class="review-tiles">
      <li v-for="(review, index) in filteredReviews" :key="review.id" class="review-tiles__item">
         <ReviewListItem
            v-bind="{ review: review, index: index }"
            @toggle-like="$emit('toggle-like', review)"
            @remove-review="$emit('remove-review', index)"
         />
      </li>
      <li v-if="filteredReviews.length === 0" class="reviews-tiles__item reviews-tiles__item--empty">
         <p>Нет отзывов по выбранному фильтру.</p>
      </li>
   </ul>
</template>

<style scoped>
.container {
   max-width: 1200px;
   margin: 2rem auto;
   padding: 1rem;
   font-family: sans-serif;
}

.reviews__title {
   text-align: center;
   margin-bottom: 1rem;
}

.review-tiles {
   display: flex;
   flex-wrap: wrap;
   list-style: none;
   gap: 1rem;
   padding: 0;
}

.review-tiles__item {
   flex-basis: calc(100% / 3 - 5rem);
   border: 1px solid #bebcbd;
   border-radius: 10px;
   padding: 1rem 2rem;
}

.reviews-tiles__item--empty {
   text-align: center;
   padding: 1rem;
   font-style: italic;
   color: #777;
}

@media screen and (max-width: 850px) {
   .review-tiles__item {
      flex-basis: calc(100% - 2rem);
   }
}
</style>
