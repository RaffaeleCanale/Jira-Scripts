import request from 'request'
import fs      from 'fs'
import _       from 'lodash'

import JiraIssue   from 'model/jira-issue'
import * as Ensure from 'util/ensure'

export default class JiraApi {

    constructor(options) {
        Ensure.isString(options, 'hostname', 'jiraUsername')

        this.options = _.assign({}, options)

        this._cookiesHeader = undefined
    }

    get cookiesHeader() {
        if (!this._cookiesHeader) {
            throw Error('Must set an auth cookie first')
        }

        return this._cookiesHeader
    }

    setAuthCookie(data) {
        Ensure.isDefined({data})

        if (_.isPlainObject(data)) {
            this._cookiesHeader = _.map(cookies, (v, k) => `${k}=${v}`).join('; ')
        } else if (_.isString(data)) {
            this._cookiesHeader = data
        } else {
            throw Error(`Invalid type for: ${data}`)
        }
    }

    setAuthCookieFromFile(file) {
        Ensure.isString({file})

        return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) return reject(err)

                try {
                    const cookies = JSON.parse(data)
                    this.setAuthCookie(cookies)

                    return resolve()
                } catch (e) {
                    return reject(e)
                }
            })
        })
    }

    getIssue(id) {
        Ensure.isString({id})

        return this._doRequest('/issue/' + id)
                .then((data) => new JiraIssue(data))
    }

    getIssuesAssignedToMe() {
        return this._doRequest('/search?jql=assignee=' + this.options.jiraUsername)
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
                    uri: this.options.hostname + '/rest/api/2' + path,
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
