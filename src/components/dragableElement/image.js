import {DragableElement} from './../../utils/dragableElement.class';

/**
 * 画布上使用的 Img
 */
export default class _Image extends DragableElement {
    _img = null;
    /**
     * 初始化
     */
    constructor() {
        let _image = new Image();
        _image.width = 100;
        _image.height = 100;
        super(_image);
        this._img = _image;
    }
}
