

const EventEmitter = require('events')
const {open,read,close} = require('fs')
const async = require('async')
const BUFF_SIZE = 2 ** 4

class Reader extends EventEmitter {
    constructor() {
        super(); // using the constructor of EventEmitter
        this.buffer = Buffer.allocUnsafe(BUFF_SIZE);
        this.started = false;
    }

    start(path) {
        if (this.started) {
            console.log('A reader can be started only a once, it is already trying to read ' + path);
            process.exit();
        }

        this.started = true;
    }

    readFileAsync(path) {
        var buf = this.buffer;
        var emitter = this;

        function open_file(callback) { //opens the file with the specified path
            open(path, 'r', (error, fd) => {
                if (error) {
                    emitter.emit('error', error);
                    process.exit();
                }
                emitter.emit('open');
                console.log('Reading of ' + path + ' is began');
                callback(error, fd); //passing the fd to read_loop
            });
        }

        function read_loop(fd, callback) { //reads the already opened file
            let bytes = 1;

            function end_loop_callback(err) {
                if (bytes == 0)
                    callback(null, fd); //passing the fd to close_file
                handle_error(err);
            }

            function read_step(callback) {
                read(fd, buf, 0, buf.length, null, (error, bytesRead) => {
                    if (error) {
                        handle_error(error);
                    }
                    if (bytesRead > 0)
                        emitter.emit('data', bytesRead, buf);
                    bytes = bytesRead;
                    callback();
                })
            }

            //whilst operation
            async.whilst(
                function() {return bytes > 0;}, //condition
                read_step,						//single iteration step
                end_loop_callback				//final callback
            );
        }

        function handle_error(error) {
            if (error) {
                emitter.emit('error', error);
                process.exit();
            }
        }

        function close_file(fd, callback) { //closes the opened file which corresponds to the specified fd
            close(fd, error => {
                if (error) {
                    handle_error(error);
                }
                emitter.emit('close');
            })
        }

        //combining all the previously defined functions in a waterfall operation
        async.waterfall([open_file, read_loop, close_file], handle_error);
    }
}

const r = new Reader()
const path = process.argv[2] || 'test.txt'
r.start(path)
r.readFileAsync(path)
r.once('error', console.error)
r.once('open', () => console.log('opened'))
r.on('data', (bytes, buf) => console.log(buf.toString('utf8', 0, bytes)))
r.once('close', () => console.log('closed'))