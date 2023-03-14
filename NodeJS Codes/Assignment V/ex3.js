

const EventEmitter = require('events')
const {createReadStream} = require('fs')

class Readline extends EventEmitter {
    
	constructor(stream) {
		super();
		this.readStream = stream;
		var emitter=this;
		
		this.readStream.on("data", function(chunk) {
			let chunks = chunk.toString().split("\n");
			chunks.forEach((line) => {
				emitter.emit("line",line);
			});
		});
		
		this.readStream.on("error", function(err){
			emitter.emit("error");
		});
		
		this.readStream.on("end", function(){
			emitter.emit("end");
		});
		
		this.readStream.on("close", function(){
			emitter.emit("close");
		});
	}
	
}

// test 1 reads from a file and prints its lines on stdout 
const rl1=new Readline(createReadStream(process.argv[2]||'test.txt'))

rl1.on('line',console.log)
rl1.on('error',console.error)
rl1.on('end',()=>console.log('end'))
rl1.on('close',()=>console.log('close'))

// test 2 echoes stdin on stdout
const rl2=new Readline(process.stdin)  

rl2.on('line',console.log)
rl2.on('error',console.error)
rl2.on('end',()=>console.log('end'))
rl2.on('close',()=>console.log('close'))