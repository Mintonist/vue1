import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useArticleStore = defineStore('article', () => {
   const article = ref({});

   const isEditMode = ref(false);

   const toggleEditMode = async () => {
      isEditMode.value = !isEditMode.value;
   };

   const fetchArticle = async (id) => {
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

         return 0;
      } catch (e) {
         console.log(e);
         throw e;
      }
   };

   const updateArticle = async ({ title, content, imageUrl }) => {
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

         return 0;
      } catch (e) {
         console.log(e);
      }
   };

   const addComment = async (txt) => {
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

         return 0;
      } catch (e) {
         console.log(e);
         throw e;
      }
   };

   const removeComment = async (id) => {
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

         return 0;
      } catch (e) {
         console.log(e);
         throw e;
      }
   };

   const removeArticle = async () => {
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
