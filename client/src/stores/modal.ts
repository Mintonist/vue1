import { ref } from 'vue';
import { acceptHMRUpdate, defineStore } from 'pinia';

export const useModalStore = defineStore('modal', () => {
   const message = ref('');
   const isVisible = ref(false);
   let _callback: () => void;

   const open = (msg: string, callback: () => void) => {
      message.value = msg;
      _callback = callback;
      isVisible.value = true;
   };

   const close = () => {
      isVisible.value = false;
   };

   const confirm = () => {
      _callback();
      close();
   };

   return { message, isVisible, open, close, confirm };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot));
}
