import canvas from './../template/canvas/index.js';
import Event from './../utils/eventBus.js';
import {registerRegion} from './../utils/eventCenter';
// import Img from './dragableElement/img';
import factory from './dragableElementFactory';
import * as store from 'elementStore';
registerRegion('canvas', canvas._dom[0]);

/**
 * 初始化canvas
 * @param {jquery.fn} $root
 */
function init($root) {
    $root.appendTemplate(canvas);
}

/**
 * 创建一个元素
 * @param {string} type
 * @param {{x: number, y: number}} position
 */
function createElement(type, position) {
    // console.log(type, position)
    let element = factory(type);
    let item = canvas.canvasContainer[0].getBoundingClientRect();
    element.setPosition({
        x: position.x - item.x,
        y: position.y - item.y,
    });
    element.render();
    store.set(element.key, element);
}
Event.listen('canvas:createElement', createElement);
/**
 *
 * @return {{init: init, canvas: Template}}
 */
export default function() {
    return {
        init,
        canvas,
    };
}
