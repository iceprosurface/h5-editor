import './main.scss';
// import canvas from './template/canvas';
// import menu from './template/menu';
import {init} from './components/index';
import $ from 'jquery';
// import Img from './components/dragableElement/img'
const $root = $('#root');

/**
 * 绑定对象
 * @param {Template} template
 */
$.fn.appendTemplate = function appendTemplate(template) {
    this.append(template._dom);
};

init($root);
// let img = new Img();
// img.render();
