<template>
<div class="row">
    <div v-bind:class="{'col-md-1': !viewMode.enabled}" />
    <div v-bind:class="[
        'tickets-table',
        {'col-md-2': viewMode.enabled},
        {'col-md-10': !viewMode.enabled}

    ]">
        <button class="btn btn-primary" v-show="viewMode.enabled" type="button" v-on:click="view()">Back</button>
        <table class="table table-hover">
            <thead v-show="!viewMode.enabled">
                <tr>
                    <td v-show="!viewMode.enabled">P</td>
                    <td v-show="!viewMode.enabled">T</td>
                    <td>Key</td>
                    <td v-show="!viewMode.enabled">Summary</td>
                    <td v-show="!viewMode.enabled">Status</td>
                    <td v-show="!viewMode.enabled">Assignee</td>
                    <td v-show="!viewMode.enabled"></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in tickets" class="issue-row" v-on:click="view(ticket)">
                    <!-- <transition name="fade"> -->
                    <td v-bind:class="{hidden: viewMode.enabled}" class="priority"><img width="16" v-bind:src="ticket.priorityIcon" v-bind:alt="ticket.priority" /></td>
                    <!-- </transition> -->
                    <!-- <transition name="fade"> -->
                    <td v-bind:class="{hidden: viewMode.enabled}"><img width="16" v-bind:src="ticket.typeIcon" v-bind:alt="ticket.type" /></td>
                    <!-- </transition> -->
                    <td class="key">{{ ticket.key }}</td>
                    <!-- <transition name="fade"> -->
                    <td v-bind:class="{hidden: viewMode.enabled}">{{ ticket.summary }}</td>
                    <!-- </transition> -->
                    <!-- <transition name="fade"> -->
                    <td v-bind:class="{hidden: viewMode.enabled}"><span v-bind:class="['badge', getStatusClass(ticket)]">{{ ticket && ticket.status ? ticket.status.toUpperCase() : '' }}</span></td>
                    <!-- </transition> -->
                    <!-- <transition name="fade"> -->
                    <td v-bind:class="{hidden: viewMode.enabled}"><img width="32" v-bind:src="ticket.assigneeIcon" v-bind:alt="ticket.assigneeName" /></td>
                    <!-- </transition> -->
                    <!-- <transition name="fade"> -->
                    <td v-bind:class="{hidden: viewMode.enabled}">
                        <button type="button" class="btn btn-primary" v-on:click="work(ticket, $event)">Work</button>
                    </td>
                    <!-- <transition name="fade"> -->
                    <!-- </transition> -->
                </tr>
            </tbody>

        </table>
    </div>
    <!-- <transition name="fade"> -->
    <div id="summary" v-bind:class="viewMode.enabled ? 'summary' : 'hidden2'" class="col-md-10" v-html="viewMode.ticket ? viewMode.ticket.description : ''">
    </div>
    <!-- </transition> -->
</div>
</template>

<script>
// const viewMode = {
//     enabled: false,
//     ticket: undefined
// }

export default {
    name: 'tickets-table',
    data: () => {
        return {
            viewMode: {
                enabled: false,
                ticket: undefined
            }
        }
    },
    computed: {
        tickets: function() {
            return this.$store.getters['Jira/tickets']
        }
    },
    methods: {
        getStatusClass: function(ticket) {
            if (ticket === undefined || ticket.status === undefined) {
                return ''
            }

            const status = ticket.status.toLowerCase()
            switch (status) {
            case 'done':
            case 'qa':
                return 'badge-success'
            case 'in progress':
                return 'badge-primary'
            case 'new':
            case 'to do':
                return 'badge-danger'
            default:
                return 'badge-warning'
            }
        },
        view: function(ticket) {
            this.viewMode.ticket = ticket

            if (!this.viewMode.enabled) {
                this.viewMode.enabled = true
            } else if (ticket === undefined) {
                this.viewMode.enabled = false
            }
        },
        work: function(ticket, event) {
            if (event) {
                event.stopPropagation()
            }
        }
    },
}
</script>

<style>
    @import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css');


    .tickets-table {
        transition: all .3s linear;
    }

    .tickets-table .key {
        white-space: nowrap;
    }

    .priority {
        /*visibility: visible;
        opacity: 1;

        transition-delay: 0s;*/
        /*transform: scale(0);
        transition: transform .4s cubic-bezier(.5,0,.3,1);*/
    }


    .hidden {
        display: none;
        /*visibility: hidden;*/
        /*position: fixed;*/
        /*left: 0;*/
        /*display: inline-block;*/
        white-space: nowrap;
        /*text-overflow: ellipsis;*/
        /*overflow: hidden;*/
        opacity: 0;

        transition: visibility 0s linear 0.33s, opacity 0.33s linear;

        /*transform: scale(1);*/
    }

    .summary {
        animation: fontbulger 1s
    }

    .hidden2 {
        opacity: 0;
    }

    .issue-row {
        height: 50pt;
    }

    .fade-enter-active, .fade-leave-active {
        transition: color-me-in 1s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0
    }

    @keyframes fontbulger {
        0%   { opacity: 0; }
        33%  { opacity: 0; }
        100% { opacity: 1; }
    }
</style>
