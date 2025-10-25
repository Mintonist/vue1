import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useUsersStore = defineStore('users', () => {
   const users = ref([]);

   const fetchUsers = async () => {
      try {
         const response = await fetch(`/api/users`);
         if (!response.ok) {
            throw new Error('Users response error: ' + response.status);
         }

         const data = await response.json();
         console.log(data);

         if (!data.error && data.data) users.value = data.data;

         return data;
      } catch (e) {
         console.log(e);
      }
   };

   const removeUser = async (id) => {
      try {
         const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
         if (!response.ok) {
            throw new Error('Users response error: ' + response.status);
         }

         const data = await response.json();
         console.log(data);

         if (!data.error) {
            users.value = users.value.filter((item) => item.id !== id);
         }

         return data;
      } catch (e) {
         console.log(e);
      }
   };

   const changeUser = async (userId, roleId) => {
      try {
         const response = await fetch(`/api/users/${userId}`, {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roleId }),
         });
         if (!response.ok) {
            throw new Error('Users response error: ' + response.status);
         }

         const data = await response.json();
         console.log(data);

         if (!data.error) {
            users.value.forEach((item) => {
               if (item.id === userId) item.roleId == roleId;
            });
         }

         return data;
      } catch (e) {
         console.log(e);
      }
   };

   return { users, fetchUsers, removeUser, changeUser };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot));
}
