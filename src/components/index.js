import canvas from './canvas';
import menu from './menu';
import * as DragableElement from './../utils/dragableElement.class';

/**
 * 初始化函数
 * @param {HTMLElement} $root
 */
export function init($root) {
    canvas().init($root);
    menu().init($root);
    // 初始化拖拽画布大小
    DragableElement.init(canvas().canvas);
}
