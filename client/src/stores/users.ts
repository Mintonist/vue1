import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';
import type { IAPIResponse, IUser } from '@/types';

export const useUsersStore = defineStore('users', () => {
   const users = ref<IUser[]>([]);

   const fetchUsers = async (): Promise<IAPIResponse<IUser[]>> => {
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
         return { error: (e as Error)?.message };
      }
   };

   const removeUser = async (id: string): Promise<IAPIResponse<string>> => {
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
         return { error: (e as Error)?.message };
      }
   };

   const changeUser = async (userId: string, roleId: number): Promise<IAPIResponse<IUser>> => {
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
         return { error: (e as Error)?.message };
      }
   };

   return { users, fetchUsers, removeUser, changeUser };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot));
}
