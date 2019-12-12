import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '../libs/hvue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        children: [
            {
                path: '/me',
                name: 'me',
                component: () => import(/* webpackChunkName: "about" */ '../views/me.vue'),
            },
            {
                path: '/he',
                name: 'he',
                component: () => import(/* webpackChunkName: "about" */ '../views/he.vue'),
            }
        ]
    }
]

const router = new VueRouter({
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes
})

export default router
