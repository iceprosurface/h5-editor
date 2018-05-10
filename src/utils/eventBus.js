/*
 * 如有侵权请联系我
 * @author 尐轩
 * @see https://blog.csdn.net/q1056843325/article/details/53353850
 * 是否修改： 是
 */
let msg;
const list = {};
const listen = function(key, fn) {
    // 监听事件函数
    if (!list[key]) {
        // 如果事件列表中还没有key值命名空间，创建
        list[key] = [];
    }
    // 将回调函数推入对象的“键”对应的“值”回调数组
    list[key].push(fn);
};
/**
 * 触发函数
 * @return {boolean}
 */
const trigger = function(...args) {
    let key = Array.prototype.shift.call(args);
    // 第一个参数指定“键”
    msg = list[key];
    if (!msg || msg.length === 0) {
        // 如果回调数组不存在或为空则返回false
        return false;
    }
    for (let i = 0; i < msg.length; i++) {
        // 循环回调数组执行回调函数,this用途明确可以使用
        // eslint-disable-next-line
        msg[i].apply(this, args);
    }
};
/**
 * 移除事件函数
 * @param {string} key
 * @param {function} fn
 * @return {boolean}
 */
const remove = function(key, fn) {
    let msg = list[key];
    if (!msg) {
        // 事件不存在直接返回false
        return false;
    }
    if (!fn) {
        // 如果没有后续参数，则删除整个回调数组
        delete list[key];
    } else {
        for (let i = 0; i < msg.length; i++) {
            if (fn === msg[i]) {
                // 删除特定回调数组中的回调函数
                msg.splice(i, 1);
            }
        }
    }
};
const Event = {
    listen: listen,
    trigger: trigger,
    remove: remove,
};

export default Event;
