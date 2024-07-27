import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import './style.css';
import App from './App.vue';
import './index.css';
import HomeView from './views/Home.vue';
import { createStore } from 'vuex';
import '@oscarcorac/core-ui/dist/main.css';

const routes = [{ path: '/', component: HomeView }];

const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App).use(store).use(router).mount('#app');
