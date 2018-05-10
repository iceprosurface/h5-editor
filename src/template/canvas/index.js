import './canvas.scss';
import canvasHtml from './canvas.html';
import Template from '../template.class.js';
const canvas = new Template({
    entries: ['canvasContainer'],
    template: canvasHtml,
});
export default canvas;
