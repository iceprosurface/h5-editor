import './main.scss';
import {init} from './components/index';
import $ from 'jquery';
const $root = $('#root');
import toolbar from './template/toolbars';
/**
 * 绑定对象
 * @param {Template} template
 */
$.fn.appendTemplate = function appendTemplate(template) {
    this.append(template._dom);
};

$root.appendTemplate(toolbar);

init($root);

