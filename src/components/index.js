import Canvas from './canvas'
import Menu from './menu'
import * as DragableElement from './../utils/dragableElement.class'

export function init ($root) {
    Canvas().init($root);
    Menu().init($root);
    // 初始化拖拽画布大小
    DragableElement.init(Canvas().canvas);
}