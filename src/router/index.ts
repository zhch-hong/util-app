import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import task from '../views/task.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'task',
    component: task,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
