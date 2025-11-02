import { createRouter, createWebHistory } from 'vue-router'
import Feed from '@/views/Feed.vue';
import Post from '@/views/Post.vue';
import PostCreate from '@/views/PostCreate.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Feed,
    },
    {
      path: '/posts/:post_id',
      name: 'post',
      component: Post,
      props: true
    },
    {
      path: '/posts/create',
      name: 'create post',
      component: PostCreate
    },
    {
      path: '/communities/create',
      name: 'create community',
      component: PostCreate
    },
    {
      path: '/login',
      name: 'login',
      component: Feed,
      props: { showLogin: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Feed,
      props: { showLogin: true }
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(''),
    // },
  ],
});

export default router
