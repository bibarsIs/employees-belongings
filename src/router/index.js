import {createRouter, createWebHistory} from "vue-router";
import HomePage from "../views/HomePage.vue";
import EditPage from "../views/EditPage.vue";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/edit',
        name: 'EditPage',
        component: EditPage
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
