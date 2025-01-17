import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';


const routes = [
  { path: '/', name: 'lgoin', component: Login },
  { path: '/home', name: 'Home', component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
