'use strict'
const fs = require('fs')
const EventEmitter = require('events')
const BUFF_SIZE = 2**4

class Reader extends EventEmitter {

    constructor() {
        super(); // use the constructor of EventEmitter
        this.buffer = Buffer.allocUnsafe(BUFF_SIZE);
        this.started = false; // if it's already open
    }

    handle_error(error) {
        this.emit('error', error);
        process.exit();
    }

    readBuffer(fd, buffer, buffer_size, offset) {
        
        // try to read a new chunk
        fs.read(fd, buffer, 0, buffer_size, offset, (error, bytesRead) => {

            if (error) this.handle_error(error);
                
            // if there is no more bytes to read
            if(bytesRead == 0) {

                fs.close(fd, error =>{

                    if(error) this.handle_error(error);
                    this.emit('close', fd);
                    })

                return;
                }

            this.emit('data', bytesRead, buffer);
            offset += bytesRead;
            this.readBuffer(fd, buffer, buffer_size, offset);
        })
    }

    // start reading file
    readFile(path) {

        if(this.started) {
            console.log('A reader can be started only a once, it is already trying to read' + path);
            process.exit();
        }

        this.started = true;

        fs.open(path, 'r', (error, fd) => {

            if(error) this.handle_error(error);

            if(typeof this.offset == 'undefined') this.offset = 0;
            
            this.emit('open', fd);
            console.log('Reading of ' + path + ' is began'+' \n');
            this.readBuffer(fd, this.buffer, this.buffer.length, this.offset);
        })
    }

}

const r=new Reader()
r.readFile(process.argv[2]||'test.txt')
r.once('error',console.error) 
r.once('open',()=>console.log('File opened'))
r.on('data',(bytes,buf)=>console.log(buf.toString('utf8',0,bytes)))
r.once('close',()=>console.log('File closed'))
