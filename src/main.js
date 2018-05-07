import './main.scss'
import canvas from './template/canvas'
import menu from './template/menu'
import $ from 'jquery'
import {registerRegion} from './utils/eventCenter'
import {init as dragableElementInit} from './utils/dragableElement.class'
import Img from './components/dragableElement/img'
const $root = $('#root')
function appendTemplate (template) {
    this.append(template._dom)
}

$.fn.appendTemplate = appendTemplate
$root.appendTemplate(canvas)
$root.appendTemplate(menu)
registerRegion('canvas', canvas._dom[0])
dragableElementInit(canvas)
let img = new Img()
img.render()
