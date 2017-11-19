import request from 'request'
import _ from 'lodash'

import JiraIssue from '@/jira/model/JiraIssue'
import * as Ensure from '@/util/Ensure'

export default class JiraApi {
    constructor(options) {
        Ensure.isString(options, 'hostname', 'username')
        Ensure.isObject(options, 'cookies')

        this._username = options.username
        this._requestOptions = {
            method: 'GET',
            baseURL: options.hostname + '/rest/api/2',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': _.map(options.cookies, (v, k) => `${k}=${v}`).join('; '),
            }
        }
    }

    getIssue(id) {
        Ensure.isString({ id })

        return this._apiGet(`/issue/${id}?expand=renderedFields`)
            .then((data) => new JiraIssue(data))
    }

    getIssuesAssignedToMe() {
        return this._apiGet(`/search?jql=assignee=${this._username}&expand=renderedFields`)
            .then((data) => {
                return data.issues
                    .map((issue) => new JiraIssue(issue))
                    .filter((issue) => issue.status !== 'Done')
            })
    }

    _apiGet(path) {
        return new Promise((resolve, reject) => {
            const options = _.assign({
                uri: `${this._requestOptions.baseURL}${path}`
            }, this._requestOptions)

            request(options, (error, response, body) => {
                if (error) return reject(error)
                try {
                    return resolve(JSON.parse(body))
                } catch (e) {
                    return reject(e)
                }
            })
        })
    }
}
