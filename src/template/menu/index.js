import './menu.scss';
import canvasHtml from './menu.html';
import Template from 'common/template.class.js';
const menu = new Template({
    template: canvasHtml,
    entries: ['menuImage', 'menuText'],
});
export default menu;
