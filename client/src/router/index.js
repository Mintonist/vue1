import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
      { path: '/users', name: 'users', component: () => import('../views/UsersView.vue'), meta: { requreAuth: true } },
      { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
      {
         path: '/register',
         name: 'register',
         component: () => import('../views/RegistrationView.vue'),
      },
      {
         path: '/posts',
         name: 'posts',
         component: () => import('../views/NewArticleView.vue'),
         meta: { requreAuth: true },
      },
      {
         path: '/post/:id',
         name: 'post',
         component: () => import('../views/ArticleView.vue'),
         meta: { requreAuth: true },
      },
   ],
});

router.beforeEach((to, from, next) => {
   const userStore = useUserStore();
   const { isAuth } = storeToRefs(userStore);
   if (to.meta.requreAuth) {
      if (!isAuth) {
         next();
      } else {
         next('/login');
      }
   } else {
      next();
   }
});

export default router;
