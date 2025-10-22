import { computed, ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

const initUserData = {
   id: '',
   login: '',
   roleId: 0,
   registeredAt: '',
};

export const useUserStore = defineStore('user', () => {
   const user = ref(initUserData);

   const isAuth = computed(() => !!user.value.id);

   const register = async (login, password) => {
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

         return data;
      } catch (e) {
         console.log(e);
      }
   };

   const login = async (login, password) => {
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

         return data;
      } catch (e) {
         console.log(e);
      }
   };

   const logout = async () => {
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
      }
   };
   return { user, isAuth, register, login, logout };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
