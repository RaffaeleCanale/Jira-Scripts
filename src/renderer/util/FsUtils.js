import fs from 'fs'
import * as Ensure from '@/util/Ensure'

export function readJsonSync(file) {
    Ensure.isString({file})

    return JSON.parse(fs.readFileSync(file, 'utf8'))
}

export function readJson(file) {
    Ensure.isString({file})

    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) return reject(err)

            try {
                return resolve(JSON.parse(data))
            } catch (e) {
                return reject(e)
            }
        })
    })
}

export function writeJson(file, data) {
    Ensure.isString({file})
    Ensure.isObject({data})

    return new Promise((resolve, reject) => {
        fs.writeFile(file, JSON.stringify(data), 'utf8', (err) => {
            if (err) return reject(err)
            return resolve()
        })
    })
}
