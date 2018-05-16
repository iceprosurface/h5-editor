/**
 * @mixin AutoExportElement
 */
const AutoExportElement = {
    _getClassName() {
        return 'i' + this.key;
    },
    exportCssClass() {
        let className = this._getClassName();
        let left = this.x ? `left: ${this.x}px;` : '';
        let top = this.y ? `top: ${this.y}px;`: '';
        return `
            .${className} {
                ${left}
                ${top}
            }
        `;
    },
    exportJsEvent() {
        return '';
    },
    exportJsAnimation() {
        return '';
    },
    exportHtmlElement() {
        let className = this._getClassName();
        let innerHTML = this._dom.html();
        return `
            <div class="${className} item">${innerHTML}</div>
        `;
    },
};
export default AutoExportElement;
