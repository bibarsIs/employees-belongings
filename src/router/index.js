import {createRouter, createWebHistory} from "vue-router";
import HomePage from "../views/HomePage.vue";
import EditPage from "../views/EditPage.vue";
import NotFound from "../components/NotFound.vue";
import CreatePage from "../views/CreatePage.vue";

const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/edit/:id',
        name: 'EditPage',
        component: EditPage
    },
    {
        path: '/edit',
        name: 'CreatePage',
        component: CreatePage
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
