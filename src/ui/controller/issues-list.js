import JiraIssue from 'model/jira-issue'

const issues = [
    new JiraIssue({key: 'FUL-3649', summary: 'foo bar'}),
    new JiraIssue({key: 'FUL-3449', summary: 'hello world'})
]

export function load() {
    return Promise.resolve({issues})
}
