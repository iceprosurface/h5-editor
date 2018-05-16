import './main.scss';
import {init} from './components/index';
import $ from 'jquery';
const $root = $('#root');
import toolbar from './template/toolbars';
import {build} from './utils/download';
import * as store from 'elementStore';
/**
 * 绑定对象
 * @param {Template} template
 */
$.fn.appendTemplate = function appendTemplate(template) {
    this.append(template._dom);
};

$root.appendTemplate(toolbar);
toolbar._dom.find('button[data-type="download"]').click(function() {
    /**
     *
     * @type {FormDataEntryValue[] | string[]}
     */
    let arrays = Array.from(store.getAll());
    let css = arrays.reduceRight((pre, curr)=> {
        return pre + curr.exportCssClass();
    }, '');
    let body = arrays.reduceRight((pre, curr)=> {
        return pre + curr.exportHtmlElement();
    }, '');
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
        }, {
            name: 'default.css',
            data: css,
        }],
        htmls: [{
            name: 'index.html',
            data: `
                <html>
                    <header>
                        <link href="./css/default.css">
                    </header>
                    <body>
                        ${body}
                    </body>
                </html>
            `,
        }],
    });
});
init($root);

