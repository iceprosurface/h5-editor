import JSZip from 'jszip';

/**
 * @param {Blob} blob
 * @param {string} name
 */
function downloadBlob(blob, name) {
    let alink = window.document.createElement('a');
    let evt = window.document.createEvent('HTMLEvents');
    evt.initEvent('click', false, false);
    alink.download = name;
    alink.href = window.URL.createObjectURL(blob);
    alink.dispatchEvent(evt);
    alink.click();
}
/**
 * @param {Array} images
 * @param {Array} jss
 * @param {Array} csss
 * @param {Array} htmls
 * @return {Promise}
 */
function buildZip({images, jss, csss, htmls} = datas) {
    let zip = new JSZip();
    let img = zip.folder('images');
    let js = zip.folder('js');
    let css = zip.folder('css');
    images.forEach((image) =>img.file(image.name, image.data));
    jss.forEach((jsFile) =>js.file(jsFile.name, jsFile.data));
    csss.forEach((cssFile) =>css.file(cssFile.name, cssFile.data));
    htmls.forEach((html) => zip.file(html.name, html.data));
    return zip.generateAsync({type: 'blob'})
        .then(function(content) {
            return Promise.resolve(content);
        });
}

/**
 * @param {Object} data
 */
export async function build(data) {
    let content = await buildZip(data);
    console.log(content);
    downloadBlob(content, 'test');
}
