<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
</script>

<template>
   <h1 class="bg-blue-200">You did it!</h1>
   <p>Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the documentation</p>
   <FontAwesomeIcon :icon="faFloppyDisk" />
</template>

<style scoped></style>
