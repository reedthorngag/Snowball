import { createRouter, createWebHistory } from 'vue-router'
import Feed from '@/components/Feed.vue';
import Post from '@/views/Post.vue';
import PostCreate from '@/views/PostCreate.vue';
import CommunityCreate from '@/views/CommunityCreate.vue';
import Community from '@/views/Community.vue';
import User from '@/views/User.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Feed,
    },
    {
      path: '/posts/:post_id',
      name: 'Post',
      component: Post,
      props: true
    },
    {
      path: '/communities/:community_id',
      name: 'Community',
      component: Community,
      props: true
    },
    {
      path: '/users/:user_id',
      name: 'User',
      component: User,
      props: true
    },
    {
      path: '/posts/create',
      name: 'Create post',
      component: PostCreate
    },
    {
      path: '/communities/:community_id/posts/create',
      name: 'Create post',
      component: PostCreate,
      props: true
    },
    {
      path: '/communities/create',
      name: 'Create community',
      component: CommunityCreate
    },
    {
      path: '/login',
      name: 'Login',
      component: Feed,
      props: { showLogin: true }
    },
    {
      path: '/signup',
      name: 'Signup',
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
