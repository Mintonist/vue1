<script setup>
import LayoutContainer from '@/components/layouts/LayoutContainer.vue';

import ArticleDetailsForm from '@/components/ArticleDetailsForm.vue';
import { useRouter } from 'vue-router';
import { useArticlesStore } from '@/stores/articles';

const articlesStore = useArticlesStore();

const router = useRouter();

const onAddArticale = async (data) => {
   await articlesStore.addArticle(data);
   router.push('/');
};
</script>

<template>
   <LayoutContainer class="mt-4">
      <ArticleDetailsForm
         :article="{ content: '', imageUrl: '', title: '' }"
         @onSaveArticale="onAddArticale"
         @onReturn="router.push('/')"
      />
   </LayoutContainer>
</template>

<style scoped></style>
