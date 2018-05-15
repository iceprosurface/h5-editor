import './main.scss';
import {init} from './components/index';
import $ from 'jquery';
const $root = $('#root');
import toolbar from './template/toolbars';
import {build} from './utils/download';
/**
 * 绑定对象
 * @param {Template} template
 */
$.fn.appendTemplate = function appendTemplate(template) {
    this.append(template._dom);
};

$root.appendTemplate(toolbar);
toolbar._dom.find('button[data-type="download"]').click(function() {
    build({
        images: [{
            name: 'c.png',
            data: 'asdqwer',
        }],
        jss: [{
            name: 'test.js',
            data: 'console.log(1)',
        }],
        csss: [{
            name: 'let.css',
            data: 'text.css { border: 1px solid #111;}',
        }],
        htmls: [{
            name: 'index.html',
            data: '<html><body><div>111</div></body></html>',
        }],
    });
});
init($root);

