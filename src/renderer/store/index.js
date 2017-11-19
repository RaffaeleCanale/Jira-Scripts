import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import {loadCookieFromChrome} from '@/util/CookiesHelpers'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production',
    actions: {
        init(context) {
            return context.dispatch('Config/load')
                .then((config) => {
                    const cookies = config.cookies
                    if (_.isEmpty(cookies)) {
                        return loadCookieFromChrome(config.hostname)
                            .then((cookies) => {
                                context.commit('Config/setCookies', cookies)
                                return context.dispatch('Config/save')
                            })
                    }
                })
                .then(() => {
                    return context.dispatch('Jira/fetchTickets')
                })
        },
    }
})
