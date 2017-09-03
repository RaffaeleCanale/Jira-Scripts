import request from 'request'
import fs      from 'fs'
import _       from 'lodash'

import JiraIssue   from 'model/jira-issue'
import * as Ensure from 'util/ensure'

export default class JiraApi {

    constructor(options) {
        Ensure.isString(options, 'hostname', 'jiraUsername')

        this.hostname = options.hostname
        this.jiraUsername = options.jiraUsername

        this.cookiesHeader = ''
    }

    loadCookies(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) return reject(err)

                try {
                    const cookies = JSON.parse(data)
                    this.cookiesHeader = _.map(cookies, (v, k) => `${k}=${v}`).join('; ')

                    return resolve()
                } catch (e) {
                    return reject(e)
                }
            })
        })
    }

    getIssue(id) {
        return this._doRequest('/issue/' + id)
                .then((data) => new JiraIssue(data))
    }

    getIssuesAssignedToMe() {
        return this._doRequest('/search?jql=assignee=' + this.jiraUsername)
                .then((data) => {
                    return data.issues
                            .map((issue) => new JiraIssue(issue.fields))
                            .filter((issue) => issue.status !== 'Done')
                })
    }

    _doRequest(path) {
        return new Promise((resolve, reject) => {
            request({
                    method: 'GET',
                    uri: this.hostname + '/rest/api/2' + path,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': this.cookiesHeader
                    }
                },
                (error, response, body) => {
                    if (error) return reject(error)

                    try {
                        const data = JSON.parse(body)
                        return resolve(data)
                    } catch (e) {
                        return reject(e)
                    }
                })
        })
    }
}
