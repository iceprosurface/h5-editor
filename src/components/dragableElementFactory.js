const r = require.context('./dragableElement', true, /\.js$/);
const modules = new Map();
/**
 * 获取模块名称
 * @type {RegExp}
 */
const nameRegexp = /\/([^\/]+)\.js$/;
r.keys().forEach((key) => {
    let name = key.match(nameRegexp)[1];
    modules.set(name, r(key).default);
});

/**
 * dom工厂
 * @param {string} key
 * @return {DragableElement|AutoExportElement} 具体的每一个对象
 */
export default function factory(key) {
    if (!modules.has(key)) {
        throw new Error('unkown key of `' + key + '` of content');
    }
    let ClassOfObject = modules.get(key);
    return new ClassOfObject();
}
