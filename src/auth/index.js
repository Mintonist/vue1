import { getCurrentLoginStatus, setCurrentLoginStatus } from '@/localstorage.service';
import { ref } from 'vue';

const isLoggesIn = ref(getCurrentLoginStatus());

const login = () => {
   isLoggesIn.value = true;
   setCurrentLoginStatus(true);
};

const logout = () => {
   isLoggesIn.value = false;
   setCurrentLoginStatus(false);
};

export { isLoggesIn, login, logout };
