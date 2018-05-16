/**
 * @desc create element map
 * @type {Map<string, DragableElement>}
 */
const elementsMap = new Map();
// eslint-disable-next-line
window.elementsMap = elementsMap;

/**
 * @param {string} key
 * @param {AutoExportElement} element
 */
export function set(key, element) {
    elementsMap.set(element.key, element);
}

/**
 * @return {IterableIterator<AutoExportElement>}
 */
export function getAll() {
    return elementsMap.values();
}
