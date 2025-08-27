<script setup>
defineProps({
   review: { type: Object, required: true },
   index: { type: Number, required: true },
});
</script>

<template>
   <div class="review">
      <div class="review__header">
         <p class="review__author">{{ review.author }}</p>
         <div class="review__rating">
            <span v-for="n in 5" :key="`star-${n}`" class="star">
               {{ n <= review.rating ? '★' : '☆' }}
            </span>
         </div>
      </div>
      <p class="review__text">"{{ review.text }}"</p>
      <div class="review__actions">
         <button @click="$emit('toggle-like')" class="btn btn--like">
            {{ review.liked ? '❤️' : '🤍' }}
         </button>
         <button @click="$emit('remove-review')" class="btn btn-delete">Удалить</button>
      </div>
   </div>
</template>

<style scoped>
.review__header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 10px;
   margin-bottom: 1rem;
}

.review__text {
   color: #807d7e;
   margin-bottom: 1.5rem;
}

.review__author {
   font-weight: bold;
   margin-bottom: 0.3rem;
}

.review__rating {
   color: gold;
   font-size: 1.2rem;
}

.review__actions {
   display: flex;
   gap: 10px;
}

.btn--like,
.btn--delete {
   padding: 4px 10px;
}

.btn--like {
   background: #f9f9f9;
}

.btn--delete {
   background: #ffdddd;
}
</style>
