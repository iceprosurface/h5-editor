import $ from 'jquery';
import {bindEvent} from '../eventCenter.js';
import {uuid} from '../guid';
let _canvas = {
    _dom: $(document.body),
};
/**
 * 画布容器的大小
 * @type {{x: number, y: number, width: number, height: number, bottom: number, right: number, left: number, top: number}}
 */
let canvasContainerRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
};
/**
 * 所有被注册的DragableElement
 * @type {Map}
 */
const DragableElementMap = new Map();
// 暂不使用注释
// const CANVAS = {
//     height: 1000,
//     width: 1000,
// };
// const MIN_CANVAS = {
//     height: 480,
//     width: 320,
// };
/**
 * 插件名称
 * @type {string}
 */
const PLUGIN_NAME = 'DragableElement';
/**
 * 被注册画布区域名称
 * @type {string}
 */
const CANVAS_REGION = 'canvas';
bindEvent(PLUGIN_NAME, {
    mousedown: function({data}) {
        let _id = this.attr('_id');
        if (_id) {
            if (DragableElementMap.has(_id)) {
                let item = DragableElementMap.get(_id);
                if (!item.dragable) {
                    return;
                }
                data[PLUGIN_NAME].holding = _id;
                data[PLUGIN_NAME].originalOffset = {
                    deltaX: item.x + canvasContainerRect.left - data.mouse.x,
                    deltaY: item.y + canvasContainerRect.top - data.mouse.y,
                };
            }
        }
    },
    mouseup: function({data}) {
        data[PLUGIN_NAME].holding = null;
    },
    mousemove: function({data}) {
        let _id = data[PLUGIN_NAME].holding;
        let originalOffset = data[PLUGIN_NAME].originalOffset;
        if (_id && data.region.has(CANVAS_REGION)) {
            let item = DragableElementMap.get(_id);
            let position = {
                x: originalOffset.deltaX + data.mouse.x - canvasContainerRect.left,
                y: originalOffset.deltaY + data.mouse.y - canvasContainerRect.top,
            };
            item.setPosition(position);
            item.render({region: data.region});
            data[PLUGIN_NAME].disableMove = false;
        } else {
            data[PLUGIN_NAME].disableMove = true;
        }
    },
}, {
    holding: null,
    originalOffset: {
        deltaY: 0,
        deltaX: 0,
    },
    disableMove: false,
});

/**
 * 可拖拽元素
 * @desc 所有的可拖拽元素都继承此类
 */
export class DragableElement {
    /**
     * 是否可以拖拽
     * @type {boolean}
     */
    dragable = true;
    /**
     * 主键
     * @type {string}
     */
    key = '';
    /**
     * x坐标
     * @type {number}
     */
    x = 0;
    /**
     * y坐标
     * @type {number}
     */
    y = 0;
    _dom;
    /**
     *
     * @param {HTMLElement} dom
     */
    constructor(dom) {
        this.key = uuid(8);
        DragableElementMap.set(this.key, this);
        this._dom = $(dom);
        this._dom.attr('_id', this.key);
        this._dom.find('*').attr('_id', this.key);
    }

    /**
     * 设定位置
     * @param {number} x
     * @param {number} y
     */
    setPosition({x, y}) {
        this.x = x ? x : this.x;
        this.y = y ? y : this.y;
    }

    /**
     * 主渲染函数
     * @param {{isInRegion: Function}} region
     */
    render({region} = {
        region: {
            isInRegion: () => true,
        },
    }) {
        // if (region.isInRegion(CANVAS_REGION, this._dom[0])) {
            this._dom.css({
                top: this.y + 'px',
                left: this.x + 'px',
                position: 'absolute',
            });
        // }
        _canvas.canvasContainer.append(this._dom);
    }
}
/**
 * 初始化插件
 * @param {jquery.fn} canvas
 */
export function init(canvas) {
    _canvas = canvas;
    canvasContainerRect = canvasContainer.getBoundingClientRect();
}
