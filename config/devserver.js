const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const http = require('http');
let portStart = 8867;

let config = require('./webpack.dev.js');
config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${portStart}/`);
let compiler = webpack(config);
/**
 * 查找可用端口
 * @param {number} portStart
 * @param {function} cb
 */
const getPort = function getPort(portStart, cb) {
    let port = portStart;
    let server = http.createServer();
    server.listen(port, function() {
        server.once('close', function() {
            cb(port);
        });
        server.close();
    });
    server.on('error', function() {
        getPort(portStart + 1, cb);
    });
};
getPort(portStart, function(availablePort) {
    const server = new WebpackDevServer(compiler, {
        open: true,
        hot: true,
        host: 'localhost',
    });
    server.listen(availablePort);
    console.log('server on localhost:' + availablePort);
});
