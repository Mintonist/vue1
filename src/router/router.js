import { createRouter, createWebHistory } from 'vue-router';
// import DashboardView from '../pages/DashboardView.vue';
// import TasksView from '@/pages/TasksView.vue';
// import TaskDetailsView from '@/pages/TaskDetailsView.vue';
// import ProfileView from '@/pages/ProfileView.vue';
// import NotFoundView from '@/pages/NotFoundView.vue';
// import SettingsView from '@/pages/SettingsView.vue';
// import SecurityView from '@/pages/SecurityView.vue';

import { isLoggesIn } from '@/auth';

const routes = [
   // базовый статический импорт (в дистрибутиве будет один большой js файл):
   //  { path: '/', component: DashboardView },
   //  { path: '/dashboard', redirect: '/' },
   //  { path: '/tasks', component: TasksView },
   //  { path: '/tasks/:id', component: TaskDetailsView },
   // динамический импорт (в дистрибутиве будут отдельные js файлы для уменьшения времени загрузки страниц):
   { path: '/', component: () => import('../pages/DashboardView.vue'), meta: { requiresAuth: true } },
   { path: '/login', component: () => import('../pages/LoginView.vue') },
   { path: '/dashboard', redirect: '/' },
   { path: '/tasks', component: () => import('../pages/TasksView.vue'), meta: { requiresAuth: true } },
   {
      path: '/tasks/:id',
      component: () => import('../pages/TaskDetailsView.vue'),
      props: true,
      meta: { requiresAuth: true },
   },
   {
      path: '/settings',
      component: () => import('../pages/SettingsView.vue'),
      meta: { requiresAuth: true },
      children: [
         { path: '', redirect: '/settings/profile' },
         { path: 'profile', component: () => import('../pages/ProfileView.vue') },
         { path: 'security', component: () => import('../pages/SecurityView.vue') },
      ],
   },
   { path: '/404', component: () => import('../pages/NotFoundView.vue') },
   {
      path: '/:catchAll(.*)',
      redirect: '404',
   },
];

const router = createRouter({
   routes,
   history: createWebHistory(),
   linkActiceClass: 'router-link--intermediate',
   linkExactActiveClass: 'router-link--active',
});

router.beforeEach(async (to) => {
   const canAccess =
      to.meta.requiresAuth == undefined || to.meta.requiresAuth == false || (to.meta.requiresAuth && isLoggesIn.value);
   console.log(
      'to.meta.requiresAuth: ' + to.meta.requiresAuth,
      'isLoggesIn: ' + isLoggesIn.value,
      'canAccess: ' + canAccess,
   );
   if (!canAccess) return '/login';
});

export default router;
