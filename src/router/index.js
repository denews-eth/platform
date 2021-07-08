import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Authors from '../views/Authors.vue'
import Author from '../views/Author.vue'
import Article from '../views/Article.vue'
import Contacts from '../views/Contacts.vue'
import Explore from '../views/Explore.vue'
import AboutUs from '../views/AboutUs.vue'
import Create from '../views/Create.vue'
import HelpCenter from '../views/HelpCenter.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import PageNotFound from '../views/PageNotFound.vue'
import Verify from '../views/Verify.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props:true
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    component: Article,
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors
  },
  {
    path: '/author',
    name: 'Author',
    component: Author,
    props:true
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Explore
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/how-does-it-work',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/help-center',
    name: 'HelpCenter',
    component: HelpCenter
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/verify',
    name: 'Verify',
    component: Verify,
    props: true
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  { path: '/login/:oauth_token', redirect: { name: 'Verify' }},
  { path: "/:catchAll(.*)", component: PageNotFound }

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
