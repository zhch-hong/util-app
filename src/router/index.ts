import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Task from '@/views/task/task.vue';
import Sync from '@/views/sync/sync.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Task,
  },
  {
    path: '/sync',
    component: Sync,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
