'use strict'
const fs = require('fs')
const EventEmitter = require('events')
const {promisify}=require('util')
const [open,read,close]=[promisify(fs.open),promisify(fs.read),promisify(fs.close)]
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

    // Read file
    readFile(path) {
		
        if(this.started) {
            console.log('A reader can be started only a once, it is already trying to read' + path);
            process.exit();
        }
		
		this.started = true
		let file_descr
		
		let first_read=(fd)=> {
			file_descr=fd
			this.emit('open')
			console.log('Reading of ' + path + ' is began'+' \n');
			return read(file_descr, this.buffer, 0, this.buffer.length, null)
		}
		
		let read_buffer=(promise)=> {
                
			if(promise.bytesRead == 0){
				this.emit('close', file_descr)
				close(file_descr)
				return
			}
			
			this.emit('data', promise.bytesRead, this.buffer);
			return read(file_descr, this.buffer, 0, this.buffer.length, null).then(read_buffer);
		}
	

		open(path, 'r').then(first_read).then(read_buffer).catch(this.handle_error)
	}

}

const r=new Reader()
r.readFile(process.argv[2]||'test.txt')
r.once('error',console.error) 
r.once('open',()=>console.log('File opened'))
r.on('data',(bytes,buf)=>console.log(buf.toString('utf8',0,bytes)))
r.once('close',()=>console.log('File closed'))