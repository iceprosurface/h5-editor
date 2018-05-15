/**
 * @desc 基础类，提供 mixins 方式的 decorator
 * @param {Array} list
 * @return {Function}
 */
export default function mixins(...list) {
    return function(target) {
        Object.assign(target.prototype, ...list);
    };
}
