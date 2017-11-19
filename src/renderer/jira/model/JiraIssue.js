import _ from 'lodash'
import * as Ensure from '@/util/Ensure'

export default class JiraIssue {
    constructor(data) {
        Ensure.isObject({data})

        this.data = data
    }

    get key() {
        return _.get(this.data, 'key')
    }

    get url() {
        return _.get(this.data, 'self')
    }

    get type() {
        return _.get(this.data, 'fields.issuetype.name')
    }

    get typeIcon() {
        return _.get(this.data, 'fields.issuetype.iconUrl')
    }

    get priority() {
        return _.get(this.data, 'fields.priority.name')
    }

    get priorityIcon() {
        return _.get(this.data, 'fields.priority.iconUrl')
    }

    get labels() {
        return _.get(this.data, 'fields.labels')
    }

    get assignee() {
        return _.get(this.data, 'fields.assignee.key')
    }

    get assigneeName() {
        return _.get(this.data, 'fields.assignee.displayName')
    }

    get assigneeIcon() {
        return _.get(this.data, 'fields.assignee.avatarUrls.48x48')
    }

    get status() {
        return _.get(this.data, 'fields.status.name')
    }

    get statusIcon() {
        return _.get(this.data, 'fields.status.iconUrl')
    }

    get components() {
        const components = _.get(this.data, 'fields.components')
        return _.isArray(components) ? components.map((component) => component.name) : []
    }

    get description() {
        return _.get(this.data, 'renderedFields.description')
    }

    get summary() {
        return _.get(this.data, 'fields.summary')
    }

    get reporter() {
        return _.get(this.data, 'fields.reporter.key')
    }

    get reporterName() {
        return _.get(this.data, 'fields.reporter.displayName')
    }

    get reporterIcon() {
        return _.get(this.data, 'fields.reporter.avatarUrls.48x48')
    }
}
