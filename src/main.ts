import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import App from './App.vue';
import './index.css';
import '@oscarcorac/core-ui/dist/main.css';

const routes = [
  { path: '/', component: () => import('./views/Countries.vue') },
  { path: '/countries', component: () => import('./views/Countries.vue') },
  { path: '/animals', component: () => import('./views/Animals.vue') },
  { path: '/cars', component: () => import('./views/Cars.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
