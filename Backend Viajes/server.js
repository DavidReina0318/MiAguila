var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    path = require("path"),
    http = require('http'),
    log4js = require('log4js'),
    mongoose = require('mongoose');

let log = log4js.getLogger();
let logError = log4js.getLogger("error");
let logAlert = log4js.getLogger("alert");
let logTrace = log4js.getLogger("task");
let config = require('./config/env.json')[process.env.NODE_ENV || 'development'];

if (config.multiprocessor && cluster.isMaster) {
    app.use(log4js.connectLogger(log, { level: 'auto' }));
    let cpuCount = require('os').cpus().length;
    for (let i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
    cluster.on('exit', function (worker) {
        logError.error('Worker %d died', worker.id);
        cluster.fork();
    });
} else {
    var trips = require('./routes/tripsRoute');

    app.use(log4js.connectLogger(log, { level: 'auto' }));
    mongoose.connect(config.database.uri, { server: { auto_reconnect: true } })
        .then(() => {
            logTrace.info("Connected");
        })
        .catch(err => {
            logAlert.error(err);
        });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/api', trips);

    app.use(function (req, res, next) {
        var err = new Error('Uri Not Found');
        res.status(404).send({
            message: err.message,
            error: err
        });
    });

    if (app.get('env') === 'development') {
        app.use(function (err, req, res) {
            logError.error(err);
            res.status(err.status || 500);
            res.status(500).send({
                message: err.message,
                error: err
            });
        });
    }

    var server = http.createServer(app).listen(config.server.http.port, () => {
        logTrace.info('Server listening on port ' + server.address().port + " with pid " + process.pid);
        console.log('Server listening on port ' + server.address().port + " with pid " + process.pid);
    });
}

exports = app;
