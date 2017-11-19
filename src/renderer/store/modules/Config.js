import _ from 'lodash'
import { readJson, writeJson } from '@/util/FsUtils'

const CONFIG_FILE = 'jira_config.json'

export default {
    namespaced: true,

    state: {
        username: undefined,
        hostname: undefined,
        cookies: undefined,
    },

    getters: {
        config: state => _.assign({}, state),
    },

    mutations: {
        _updateState(state, data) {
            const strippedData = _.pick(data, _.keys(state))
            _.assign(state, strippedData)
        },

        setCookies(state, cookies) {
            state.cookies = cookies
        }
    },

    actions: {
        load(context) {
            return readJson(CONFIG_FILE)
                .then((data) => {
                    if (!data.username || !data.hostname) {
                        return Promise.reject(Error('Please set the username and hostname in the config'))
                    }
                    context.commit('_updateState', data)
                    return context.getters.config
                })
        },

        save(context) {
            return writeJson(CONFIG_FILE, context.state)
        },
    }
}
