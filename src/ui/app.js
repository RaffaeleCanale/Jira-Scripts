import fs  from 'fs'
import ejs from 'ejs'
import {
    app,
    BrowserWindow
} from 'electron'


class App {

    constructor() {
        this.mainWindow = undefined

        app.on('window-all-closed', function() {
            app.quit()
        })

        app.on('activate', function() {
            if (this.mainWindow === undefined) {
                createWindow()
            }
        })

        app.on('ready', () => {
            if (this.onready) {
                this.onready()
            }
        })
    }

    createWindow(path) {
        try {
            const loadController = require(`ui/controller/${path}`).load

            return Promise.all([
                loadController(),
                this._loadTemplate(path)
            ]).then((data) => this._createWindow(data[0], data[1]))
        } catch (e) {
            return Promise.reject(e)
        }
    }

    _loadTemplate(path) {
        return new Promise((resolve, reject) => {
            const templateFile = `${process.env.PWD}/src/ui/template/${path}.html`

            fs.readFile(templateFile, 'utf8', (err, template) => {
                if (err) return reject(err)
                return resolve(template)
            })
        })
    }

    _createWindow(controller, template) {
        // returns a Promise
        try {
            if (this.mainWindow) return Promise.reject('mainWindow is already open')

            const html = ejs.render(template, controller)
            const url = 'data:text/html,' + encodeURIComponent(html);

            this.mainWindow = new BrowserWindow({
                width: 800,
                height: 600
            })
            this.mainWindow.on('closed', () => {
                this.mainWindow = undefined
            })

            this.mainWindow.loadURL(url)

            return Promise.resolve()
        } catch (e) {
            return Promise.reject(e)
        }
    }
}

const singleton = new App()

export default singleton
