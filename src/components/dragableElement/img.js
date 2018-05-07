import { DragableElement } from './../../utils/dragableElement.class'

export default class Img extends DragableElement {
    _img = null
    constructor () {
        let _image = new Image ()
        _image.width = 100
        _image.height = 100
        super (_image)
        this._img = _image
    }
}