import Constants from 'app-constants'
import JiraApi from 'request/jira-api'

import App from 'ui/app'

const api = new JiraApi(Constants)


App.onready = () => {
    App.createWindow('issues-list')
        .then(() => console.log('done'))
        .catch((err) => {
            console.error(err)
        })
}
