<script setup>
import LayoutContainer from '@/components/layouts/LayoutContainer.vue';
import ArticleDetails from '@/components/ArticleDetails.vue';
import CommentsList from '@/components/CommentsList.vue';
import CommentForm from '@/components/CommentForm.vue';
import { onBeforeMount } from 'vue';
import { useArticleStore } from '@/stores/article';
import { storeToRefs } from 'pinia';
import ArticleDetailsForm from '@/components/ArticleDetailsForm.vue';
import { useRouter } from 'vue-router';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';

const props = defineProps({
   // придёт автоматически из роута, т.к. у маршрута стоит флаг props=true
   id: { type: String, reqired: true },
});

const articleStore = useArticleStore();
const { article, isEditMode } = storeToRefs(articleStore);

const modalStore = useModalStore();
const router = useRouter();

console.log(article.value);

const userStore = useUserStore();

onBeforeMount(() => {
   articleStore.fetchArticle(props.id);
});

const onRemoveArticale = () => {
   console.log('onRemoveArticale');
   modalStore.open('Вы уверены в удалении статьи?', onConfirmRemove);
};

const onConfirmRemove = async () => {
   console.log('onConfirmRemove');
   await articleStore.removeArticle();
   router.push('/');
};
const onUpdateArticale = (data) => {
   articleStore.updateArticle(data);
   articleStore.toggleEditMode();
};
</script>

<template>
   <LayoutContainer class="mt-4">
      <div v-if="!isEditMode">
         <ArticleDetails
            @onEditArticle="articleStore.toggleEditMode()"
            @onRemoveArticale="onRemoveArticale"
            :article="article"
         />

         <div>
            <h2 class="text-2xl font-bold mb-4">
               Комментарии ({{ article.comments ? article.comments?.length : '0' }})
            </h2>
            <CommentsList :data="article.comments" />
            <CommentForm v-if="userStore.isAuth" />
         </div>
      </div>
      <ArticleDetailsForm
         v-else
         :article="article"
         @onUpdateArticale="onUpdateArticale"
         @onReturn="articleStore.toggleEditMode()"
      />
   </LayoutContainer>
</template>

<style scoped></style>
