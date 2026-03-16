<script setup lang="ts">
import LayoutContainer from '@/components/layouts/LayoutContainer.vue';

import ArticleDetailsForm from '@/components/ArticleDetailsForm.vue';
import { useRouter } from 'vue-router';
import { useArticlesStore } from '@/stores/articles';
import type { IArticle } from '@/types';

const articlesStore = useArticlesStore();

const router = useRouter();

const onAddArticale = async (data: IArticle) => {
   await articlesStore.addArticle(data);
   router.push('/');
};
</script>

<template>
   <LayoutContainer class="mt-4">
      <ArticleDetailsForm
         :article="{ id: '', content: '', imageUrl: '', title: '', publishedAt: '', comments: [] }"
         @onSaveArticale="onAddArticale"
         @onReturn="router.push('/')"
      />
   </LayoutContainer>
</template>

<style scoped></style>
