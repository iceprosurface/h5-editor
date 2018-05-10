import $ from 'jquery';
import _get from 'lodash/get';
import _isFunction from 'lodash/isFunction';
const $dom = $(document);
const REGION = new Map();
/**
 * 鼠标所处区域
 * @type {{regions: Array, has: region.has, init: (())}}
 */
const region = {
    regions: [],
    regionsMouse: new Map(),
    has: function(name) {
        return this.regions.indexOf(name) !== -1;
    },
    init() {
        this.regions = [];
    },
    /**
     * 判断是否在区域内
     * @param {string} name
     * @param {HTMLElement} targetDom
     * @return {boolean}
     */
    isInRegion(name, targetDom) {
        if (REGION.has(name)) {
            let sourceRegion = REGION.get(name);
            let sourceRect = sourceRegion.getBoundingClientRect();
            let targetRect = targetDom.getBoundingClientRect();
            return sourceRect.top < targetRect.top &&
                    sourceRect.left < targetDom.left &&
                    sourceRect.right > targetDom.right &&
                    sourceRect.bottom > targetDom.bottom;
        }
        return false;
    },
};
const data = {
    mouse: {},
    region,
};
const mouseEventMap = new Map();

/**
 * {Object} eventCenter 共有的data
 */
window.__eventCenterData = data;

/**
 *
 */
['mousedown', 'mouseup', 'mousemove'].forEach((value) => {
    $dom.on(value, function(event) {
        let bodyScroll;
        let mouseTop;
        let target = $(event.target);
        let keys = mouseEventMap.keys();
        let settings = {
            originalEvent: event,
            data,
        };
        bodyScroll = $(document).scrollTop();
        mouseTop = event.clientY + bodyScroll;
        data.mouse.x = event.clientX;
        data.mouse.y = mouseTop;
        data.mouse.originY = event.clientY;
        region.init();
        REGION.forEach((regionValue, key) => {
            if (regionValue && regionValue.getBoundingClientRect) {
                let rect = JSON.parse(JSON.stringify(regionValue.getBoundingClientRect()));
                rect.top += bodyScroll;
                // 高度实际位置为 鼠标 y - bodyScroll
                if (value==='mousedown') {
                    console.log(JSON.stringify(data.mouse) + JSON.stringify(rect));
                }
                if (
                    data.mouse.y > rect.top &&
                    data.mouse.y <= rect.top + rect.height &&
                    data.mouse.x > rect.left &&
                    data.mouse.x <= rect.left + rect.width
                ) {
                    region.regions.push(key);
                }
            }
        });
        for (let key of keys) {
            if (mouseEventMap.has(key)) {
                let mouseEventValue = mouseEventMap.get(key);
                let mouseEvent = _get(mouseEventValue, value);
                if (mouseEvent && _isFunction(mouseEvent)) {
                    if (mouseEvent.call(target, settings) === false) {
                        return false;
                    }
                }
            }
        }
    });
});

/**
 * 注册事件
 * @param {string} pluginName
 * @param {{mousedown: (()), mousemove: (()), mouseup: (())}}option
 * @param {object} pluginData
 */
export function bindEvent(pluginName, option, pluginData) {
    mouseEventMap.set(pluginName, option);
    data[pluginName] = pluginData;
}
/**
 * 移除事件
 * @param {string} pluginName
 */
export function removeEvent(pluginName) {
    mouseEventMap.delete(pluginName);
}
/**
 * 注册区域块
 * @param {string} name
 * @param {HTMLElement} dom
 */
export function registerRegion(name, dom) {
    REGION.set(name, dom);
}
