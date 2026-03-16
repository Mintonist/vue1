<script setup lang="ts">
import ArticleList from '@/components/ArticleList.vue';
import LayoutContainer from '@/components/layouts/LayoutContainer.vue';
import PaginationBase from '@/components/base/PaginationBase.vue';
import SearchBase from '@/components/base/SearchBase.vue';
import { useArticlesStore } from '@/stores/articles';

const articlesStore = useArticlesStore();

const doSearch = (searchQuery: string) => {
   articlesStore.fetchArticles({ search: searchQuery });
};
const doPaginate = (page: number) => {
   articlesStore.fetchArticles({ page: page });
};
</script>

<template>
   <LayoutContainer>
      <SearchBase :on-search="doSearch" />
      <ArticleList />
      <PaginationBase
         v-if="articlesStore.totalPage > 1"
         :currentPage="articlesStore.currentPage"
         :totalPage="articlesStore.totalPage"
         :onPageChanged="doPaginate"
      />
   </LayoutContainer>
</template>

<style scoped></style>
