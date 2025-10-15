import { getCurrentBasket, setCurrentBasket } from '@/localstorage.service';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { computed, reactive } from 'vue';

export const useBasketStore = defineStore('basket', () => {
   const basket = reactive(getCurrentBasket());

   const totalBasketItems = computed(() => basket.length);

   const totalBasketPrice = computed(() => {
      let total = 0;
      basket.forEach((item) => {
         total += item.price * item.quantity;
      });
      return total;
   });

   const addBasketItem = (data) => {
      console.log('addBasket', data);

      basket.push({ ...data, id: Date.now().toString() });
      saveToLocalStorage();
   };

   const removeBasketItem = (id) => {
      console.log('removeBasket', id);
      const index = basket.findIndex((data) => data.id === id);
      console.log('index', index);
      if (index >= 0) {
         basket.splice(index, 1);
         saveToLocalStorage();
      }
   };

   const updateBasketItem = (id, data) => {
      console.log('updateBasket', id, data);
      const index = basket.findIndex((data) => data.id === id);
      console.log('index', index);
      if (index >= 0) {
         basket[index] = { ...basket[index], ...data };
         saveToLocalStorage();
      }
   };

   const saveToLocalStorage = () => {
      console.log('saveToLocalStorage', basket);
      setCurrentBasket(basket);
   };

   return { basket, totalBasketItems, totalBasketPrice, addBasketItem, removeBasketItem, updateBasketItem };
});

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useBasketStore, import.meta.hot));
}
