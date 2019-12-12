import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/components/home/Home'
import Image from '@/components/home/Image'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/images/:filename',
            name: 'Image',
            component: Image
        }
    ]
})