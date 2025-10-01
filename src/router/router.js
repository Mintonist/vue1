import { createRouter, createWebHistory } from 'vue-router';
// import DashboardView from '../pages/DashboardView.vue';
// import TasksView from '@/pages/TasksView.vue';
// import TaskDetailsView from '@/pages/TaskDetailsView.vue';
// import ProfileView from '@/pages/ProfileView.vue';
// import NotFoundView from '@/pages/NotFoundView.vue';
// import SettingsView from '@/pages/SettingsView.vue';
// import SecurityView from '@/pages/SecurityView.vue';

const routes = [
   // базовый статический импорт (в дистрибутиве будет один большой js файл):
   //  { path: '/', component: DashboardView },
   //  { path: '/dashboard', component: DashboardView },
   //  { path: '/tasks', component: TasksView },
   //  { path: '/tasks/:id', component: TaskDetailsView },
   // динамический импорт (в дистрибутиве будут отдельные js файлы для уменьшения времени загрузки страниц):
   { path: '/', component: () => import('../pages/DashboardView.vue') },
   { path: '/dashboard', component: () => import('../pages/DashboardView.vue') },
   { path: '/tasks', component: () => import('../pages/TasksView.vue') },
   { path: '/tasks/:id', component: () => import('../pages/TaskDetailsView.vue') },
   {
      path: '/settings',
      component: () => import('../pages/SettingsView.vue'),
      children: [
         { path: '', component: () => import('../pages/ProfileView.vue') },
         { path: 'profile', component: () => import('../pages/ProfileView.vue') },
         { path: 'security', component: () => import('../pages/SecurityView.vue') },
      ],
   },
   {
      path: '/:catchAll(.*)',
      component: () => import('../pages/NotFoundView.vue'),
   },
];

const router = createRouter({
   routes,
   history: createWebHistory(),
   linkActiceClass: 'router-link--intermediate',
   linkExactActiveClass: 'router-link--active',
});

export default router;
