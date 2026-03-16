import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

import type { IArticle, IAPIResponse, IComment } from '@/types';

export const useArticleStore = defineStore('article', () => {
   const article = ref<IArticle>({ id: '', title: '', imageUrl: '', content: '', publishedAt: '', comments: [] });

   const isEditMode = ref(false);

   const toggleEditMode = async () => {
      isEditMode.value = !isEditMode.value;
   };

   const fetchArticle = async (id: string): Promise<IAPIResponse<IArticle>> => {
      try {
         const response = await fetch(`/api/post/${id}`);
         if (!response.ok) {
            throw new Error('Article response error: ' + response.status);
         }

         const data = await response.json();
         console.log(data);

         if (!data.error && data.data) {
            article.value = data.data;
         } else {
            throw new Error('Article response error: ' + response.status);
         }

         return data;
      } catch (e) {
         console.log(e);
         return { error: (e as Error)?.message };
      }
   };

   const updateArticle = async ({ title, content, imageUrl }: IArticle): Promise<IAPIResponse<IArticle>> => {
      try {
         const response = await fetch(`/api/post/${article.value.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               title: title ? title : article.value.title,
               content: content ? content : article.value.content,
               imageUrl: imageUrl ? imageUrl : article.value.imageUrl,
            }),
         });
         if (!response.ok) {
            throw new Error('Article response error: ' + response.status);
         }

         const data = await response.json();
         console.log(data);

         if (!data.error && data.data) {
            article.value = data.data;
         } else {
            throw new Error('Article response error: ' + response.status);
         }

         return data;
      } catch (e) {
         console.log(e);
         return { error: (e as Error)?.message };
      }
   };

   const addComment = async (txt: string): Promise<IAPIResponse<IComment>> => {
      try {
         const response = await fetch(`/api/post/${article.value.id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               content: txt,
            }),
         });
         if (!response.ok) {
            throw new Error('Article response error: ' + response.status);
         }

         const data = await response.json();
         console.log(data);

         if (!data.error && data.data) {
            article.value.comments.push(data.data);
         } else {
            throw new Error('Article response error: ' + data);
         }

         return data;
      } catch (e) {
         console.log(e);
         return { error: (e as Error)?.message };
      }
   };

   const removeComment = async (id: string): Promise<IAPIResponse<string>> => {
      try {
         const response = await fetch(`/api/post/${article.value.id}/comments/${id}`, {
            method: 'DELETE',
         });
         if (!response.ok) {
            throw new Error('Article response error: ' + response.status);
         }

         const data = await response.json();
         console.log(data);

         if (!data.error) {
            console.log(id, article.value.comments);
            article.value.comments = article.value.comments.filter((item) => item.id !== id);
         } else {
            throw new Error('Article response error: ' + data);
         }

         return data;
      } catch (e) {
         console.log(e);
         return { error: (e as Error)?.message };
      }
   };

   const removeArticle = async (): Promise<IAPIResponse<string>> => {
      try {
         const response = await fetch(`/api/post/${article.value.id}`, {
            method: 'DELETE',
         });
         if (!response.ok) {
            throw new Error('Article response error: ' + response.status);
         }

         const data = await response.json();
         console.log(data);

         return data;
      } catch (e) {
         console.log(e);
         return { error: (e as Error)?.message };
      }
   };

   return {
      article,
      isEditMode,
      toggleEditMode,
      fetchArticle,
      updateArticle,
      removeArticle,
      addComment,
      removeComment,
   };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useArticleStore, import.meta.hot));
}
