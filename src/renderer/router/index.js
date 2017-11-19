import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'tickets-table',
            component: require('@/components/TicketsTable')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
