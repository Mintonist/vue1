import { ref } from 'vue';

const isLoggesIn = ref(false);

const login = () => {
   isLoggesIn.value = true;
};

const logout = () => {
   isLoggesIn.value = false;
};

export { isLoggesIn, login, logout };
