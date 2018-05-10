import $ from 'jquery';

/**
 * 模板类
 */
export default class Template {
    _dom = null;
    _template = '';
    _entry = [];
    /**
     * 构造函数
     * @param {DOMString} template
     * @param {Array} entries
     */
    constructor({
        template,
        entries,
    }) {
        this._dom = $(template);
        this._template = template;
        if (!entries) return;
        for (const key of entries) {
            if (key) {
                let dom = this._dom.find('#' + key);
                this._entry.push([key, dom]);
                this[key] = dom;
            }
        }
    }
    /**
     * 迭代器
     * @param {Function} callback
     */
    forEach(callback) {
        this._entry.forEach(([key, dom], index, array) => {
            callback.call(dom, key, index, array);
        });
    }
}
