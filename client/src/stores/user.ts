import { computed, ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';
import ROLES from '@/constants/roles.js';

import type { IAPIResponse, IUser } from '@/types';

const initUserData: IUser = {
   id: '',
   login: '',
   roleId: -1,
   registeredAt: '',
};

export const useUserStore = defineStore('user', () => {
   const user = ref(initUserData);

   const isAuth = computed(() => !!user.value.id);

   const isAdmin = computed(() => isAuth.value && user.value.roleId === ROLES.ADMIN);

   const isModerator = computed(() => isAuth.value && user.value.roleId === ROLES.MODERATOR);

   const register = async (login: string, password: string): Promise<IAPIResponse<IUser>> => {
      try {
         const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
         });
         if (!response.ok) {
            throw new Error('User response error: ' + response.status);
         }

         const data = await response.json();
         console.log('userStore.register()', data);

         if (!data.error && data.user) user.value = data.user;

         return { data: data.user };
      } catch (e) {
         console.log(e);
         return { error: (e as Error)?.message };
      }
   };

   const login = async (login: string, password: string): Promise<IAPIResponse<IUser>> => {
      try {
         const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
         });
         if (!response.ok) {
            throw new Error('User response error: ' + response.status);
         }

         const data = await response.json();
         console.log('userStore.login()', data);

         if (!data.error && data.user) user.value = data.user;

         return { data: data.user };
      } catch (e) {
         console.log(e);
         return { error: (e as Error)?.message };
      }
   };

   const logout = async (): Promise<IAPIResponse<string>> => {
      try {
         const response = await fetch('/api/logout', {
            method: 'POST',
         });
         if (!response.ok) {
            throw new Error('User response error: ' + response.status);
         }

         const data = await response.json();
         console.log('userStore.logout()', data);

         if (!data.error) user.value = initUserData;

         return data;
      } catch (e) {
         console.log(e);
         return { error: (e as Error)?.message };
      }
   };
   return { user, isAuth, isAdmin, isModerator, register, login, logout };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
