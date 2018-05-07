import './main.scss'
import canvas from './template/canvas'
import menu from './template/menu'
import {init} from './components/index'
import $ from 'jquery'
// import Img from './components/dragableElement/img'
const $root = $('#root');
function appendTemplate (template) {
    this.append(template._dom);
}
$.fn.appendTemplate = appendTemplate;

init($root);
// let img = new Img();
// img.render();
