<script setup lang="ts">
const props = defineProps({
   type: { type: String, validtor: (value: string) => ['info', 'success', 'warning', 'error'].includes(value) },
});

const getClass = (): string => {
   switch (props.type) {
      case 'info':
         return 'text-blue-500';
      case 'warning':
         return 'text-yellow-500';
      case 'success':
         return 'text-green-500';
      case 'error':
         return 'text-red-500';
      default:
         return '';
   }
};
</script>

<template>
   <span class="block" :class="getClass()">
      <slot></slot>
   </span>
</template>
