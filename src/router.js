import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('./shared/presentation/views/home.vue');
const About = () => import('./shared/presentation/views/about.vue');
const PageNotFound = () => import('./shared/presentation/views/page-not-found.vue');
const cafeOrderForm = () => import('./orders/domain/presentation/views/cafe-order-form.vue');

const routes = [
  { path: '/home', name: 'home', component: Home, meta: { title: 'Home' } },
  { path: '/cafe/orders/new', name: 'new-cafe-order', component: cafeOrderForm, meta: { title: 'New Cafe Order' } },
  { path: '/about', name: 'about', component: About, meta: { title: 'About' } },
  { path: '/', redirect: '/home' },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound, meta: { title: 'Page Not Found' } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;