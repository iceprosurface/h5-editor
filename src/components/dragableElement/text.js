import {DragableElement} from './../../utils/dragableElement.class';

/**
 * text
 * @desc 画布上使用的 text
 */
export default class Text extends DragableElement {
    _text = null;
    _content = 'default';
    /**
     * 初始化
     */
    constructor() {
        let _text = document.createElement('div');
        super(_text);
        this._text = _text;
    }
    /**
     * 文本内容
     * @return {string} 返回具体的内容
     */
    get content() {
        return this._content;
    }

    /**
     * render
     * @override
     * @param {Arguments} arg
     */
    render(...arg) {
        this._text.innerHTML = this.content;
        super.render(...arg);
    }
}
