import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/entry/:slug',
      name: 'entry',
      component: () => import('@/views/EntryDetail.vue'),
    },
    {
      path: '/menus/:slug',
      name: 'menus',
      component: () => import('@/views/MenuList.vue'),
    },
    {
      path: '/document/:slug',
      name: 'document',
      component: () => import('@/views/DocumentDetail.vue'),
    },
    {
      path: '/entry-search/',
      name: 'search',
      component: () => import('@/views/EntrySearch.vue'),
    },
  ],
});

export default router;
