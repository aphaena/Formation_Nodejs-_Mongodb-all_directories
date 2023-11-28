

import { createRouter, createWebHistory } from 'vue-router';
import AllProducts from './components/AllProducts.vue';
import OneThing from './components/OneThing.vue';
import DeleteThing from './components/DeleteThing.vue';
import ModifyingThing from './components/ModifyingThing.vue';
import CreateThing from './components/CreateThing.vue';

const routes = [
  { path: '/', component: AllProducts },
   { path: '/', name: 'AllProducts', component: AllProducts },
  { path: '/:id', name: 'OneThing', component: OneThing, props: true },
  { path: '/delete/:id', name: 'delete', component: DeleteThing, props: true },
  { path: '/modify/:id', name: 'modify', component: ModifyingThing, props: true },
  { path: '/create/', name: 'create', component: CreateThing },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
