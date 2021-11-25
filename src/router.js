import {createRouter, createWebHashHistory} from "vue-router";
import Login from './components/Login.vue'
import Index from './components/Index.vue'
import Annotation from "./components/Annotation/src/Annotation.vue";
const routes = [
    {
      path: '/',
      redirect: 'login'
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'index',
        path: '/index',
        component: Index,
        children: [
            {
                name: 'annotation',
                path: 'annotation',
                component: Annotation
            },
        ]
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// router.beforeEach((to, from, next) => {
//     if(to.path === '/login')next();
//     else{
//         const token = localStorage.getItem('token')
//         if(token)next();
//         else next('/login');
//     }
// })
export default router