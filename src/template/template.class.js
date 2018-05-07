import $ from 'jquery'
export default class Template {
    _dom = null
    _template = ''
    _entry = []
    constructor ({
        template,
        entries
    }) {
        this._dom = $(template)
        this._template = template
        if (!entries) return 
        for (const key of entries) {
            if (key) {
                let dom = this._dom.find('#' + key)
                this._entry.push([key, dom])
                this[key] = dom
            }
        }
    }
    forEach (callback) {
        this._entry.forEach(([key, dom], index, array) => {
            callback.call(dom, key, index, array)
        })
    }

}