import {DragableElement} from 'common/dragableElement.class';
import mixins from 'common/mixins.decorator';
import AutoExportElement from 'common/autoExportElement.mixin';

@mixins(AutoExportElement)
/**
 * 画布上使用的 Img
 * @mixes AutoExportElement
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
