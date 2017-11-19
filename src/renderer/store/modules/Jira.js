import JiraApi from '@/jira/api/JiraApi'

export default {
    namespaced: true,

    state: {
        api: undefined,
        tickets: [],
    },

    getters: {
        api: (state, getters, rootState, rootGetters) => {
            return new JiraApi(rootGetters['Config/config'])
        },
        tickets: (state) => state.tickets
    },

    mutations: {
        setTickets(state, tickets) {
            state.tickets = tickets
        },
    },

    actions: {
        fetchTickets(context) {
            return context.getters.api.getIssuesAssignedToMe()
                .then(tickets => {
                    context.commit('setTickets', tickets)
                })
        },
    }
}
