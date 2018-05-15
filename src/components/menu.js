import menus from './../template/menu/index.js';
import menuItem from './../template/menu/menu-item';
import Event from './../utils/eventBus.js';
import {registerRegion} from './../utils/eventCenter';
import {bindEvent} from './../utils/eventCenter.js';
const PLUGIN_NAME = 'menus';
registerRegion('menus', menus._dom[0]);
const CANVAS_REGION = 'canvas';
bindEvent(PLUGIN_NAME, {
    mousedown: function({data}) {
        let type = this.data('drag-type');
        if (type === PLUGIN_NAME) {
            let item = this[0].getBoundingClientRect();
            data[PLUGIN_NAME].dragedElement = this.data('drag-element');

            menuItem.name = this.data('drag-element');
            data[PLUGIN_NAME].originalOffset = {
                deltaX: item.x - data.mouse.x,
                deltaY: item.y - data.mouse.y,
            };
            menuItem.render({
                x: data.mouse.x + data[PLUGIN_NAME].originalOffset.deltaX,
                y: data.mouse.y + data[PLUGIN_NAME].originalOffset.deltaY,
            });
            data[PLUGIN_NAME].dragedDom = menuItem;
        }
    },
    mouseup: function({data}) {
        data[PLUGIN_NAME].dragedDom.hide();
        if (data.region.has(CANVAS_REGION) && data[PLUGIN_NAME].dragedElement) {
            Event.trigger('canvas:createElement', data[PLUGIN_NAME].dragedElement, {
                x: data.mouse.x + data[PLUGIN_NAME].originalOffset.deltaX,
                y: data.mouse.y + data[PLUGIN_NAME].originalOffset.deltaY,
            });
        }
        data[PLUGIN_NAME].dragedElement = null;
    },
    mousemove: function({data}) {
        if (data[PLUGIN_NAME].dragedElement) {
            data[PLUGIN_NAME].dragedDom.render({
                x: data.mouse.x + data[PLUGIN_NAME].originalOffset.deltaX,
                y: data.mouse.y + data[PLUGIN_NAME].originalOffset.deltaY,
            });
        }
    },
}, {
    dragedElement: null,
    dragedDom: null,
});

/**
 * 初始化整个插件
 * @param {JQuery} $root
 */
function init($root) {
    $root.appendTemplate(menus);
}

/**
 * 单例工厂
 * @return {{init: init, menus: Template}}
 */
export default function() {
    return {
        init,
        menus,
    };
}
