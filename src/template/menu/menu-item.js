import $ from 'jquery';
import './menu.scss';
import menuItemHtml from './menu-item.html';
import Template from '../template.class.js';
const menuItem = new Template({
    template: menuItemHtml,
    entries: ['globalMenusItem'],
});
menuItem.hide = function() {
    this._dom.hide();
};
menuItem.render = function(position) {
    this._dom.show();
    this._dom.css({
        top: position.y,
        left: position.x,
        position: 'fixed',
    });
    this._dom.html(this.name);
    $('body').append(this._dom);
};
menuItem.name = 'test';
export default menuItem;
