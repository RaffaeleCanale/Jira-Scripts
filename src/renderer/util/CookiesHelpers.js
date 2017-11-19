import chrome from 'chrome-cookies-secure'
import * as Ensure from '@/util/Ensure'

export function loadCookieFromChrome(domain) {
    Ensure.isString({domain})

    return new Promise((resolve, reject) => {
        chrome.getCookies(domain, (err, cookies) => {
            if (err) return reject(err)

            return resolve(cookies)
        })
    })
}
