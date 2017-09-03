
export default class JiraIssue {

    constructor(fields) {
        this.fields = fields
    }

    get key() {
        return this.fields.key
    }

    get url() {
        return this.fields.self
    }

    get type() {
        return this.fields.issuetype.name
    }

    get priority() {
        return this.fields.priority.name
    }

    get labels() {
        return this.fields.labels
    }

    get assignee() {
        return this.fields.assignee.key
    }

    get assigneeName() {
        return this.fields.assignee.displayName
    }

    get status() {
        return this.fields.status.name
    }

    get components() {
        return this.fields.components.map((component) => component.name)
    }

    get description() {
        return this.fields.description
    }

    get summary() {
        return this.fields.summary
    }

    get reporter() {
        return this.fields.reporter.key
    }

    get reporterName() {
        return this.fields.reporter.displayName
    }
}
