import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
      { path: '/users', name: 'users', component: () => import('../views/UsersView.vue') },
      { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
      { path: '/posts', name: 'posts', component: () => import('../views/NewArticleView.vue') },
   ],
});

export default router;
