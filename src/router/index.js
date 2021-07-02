import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Authors from '../views/Authors.vue'
import Author from '../views/Author.vue'
import Article from '../views/Article.vue'
import Explore from '../views/Explore.vue'
import AboutUs from '../views/AboutUs.vue'
import Create from '../views/Create.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors
  },
  {
    path: '/author',
    name: 'Author',
    component: Author
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/how-does-it-work',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
