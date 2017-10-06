import * as Ensure from 'util/ensure'

import _ from 'lodash'

export default class JiraIssue {

    constructor(fields) {
        Ensure.isObject(fields)

        this.fields = fields
    }

    get key() {
        return _.get(this.fields, 'key')
    }

    get url() {
        return _.get(this.fields, 'self')
    }

    get type() {
        return _.get(this.fields, 'issuetype.name')
    }

    get priority() {
        return _.get(this.fields, 'priority.name')
    }

    get labels() {
        return _.get(this.fields, 'labels')
    }

    get assignee() {
        return _.get(this.fields, 'assignee.key')
    }

    get assigneeName() {
        return _.get(this.fields, 'assignee.displayName')
    }

    get status() {
        return _.get(this.fields, 'status.name')
    }

    get components() {
        return _.isArray(this.fields.components) ?
            this.fields.components.map((component) => component.name) :
            []
    }

    get description() {
        return _.get(this.fields, 'description')
    }

    get summary() {
        return _.get(this.fields, 'summary')
    }

    get reporter() {
        return _.get(this.fields, 'reporter.key')
    }

    get reporterName() {
        return _.get(this.fields, 'reporter.displayName')
    }
}
