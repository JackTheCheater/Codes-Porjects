const {createReadStream, createWriteStream }=require('fs')
const {Transform, pipeline}=require('stream')

const in_name=process.argv[3]
const out_name=process.argv[4]

const readStream=in_name!==undefined?createReadStream(in_name):process.stdin
const writeStream=out_name!==undefined?createWriteStream(out_name):process.stdout

function handle_error(err){
	if(err)
		return console.error(err)}

const converter=new Transform({
	
	transform(chunk, encoding, callback){
		
		let temp=JSON.parse(process.argv[2])
		if(!Array.isArray(temp)){
			console.log("Template is not an array\nClosing the application...")
			process.exit()
		}
		const template=temp
		writeStream.write(template.join(','))
		let prev_chunk=''
		
	    let valuePropertyStart, valuePropertyEnd, count

        // format inputs
        prev_chunk=chunk.toString()
            .replace(/"|":|[{\r\n\s[\]]/g, "")
            .replace(/},|}/g, ",\n").split('\n')

        chunk='\n'

        prev_chunk.forEach((line)=>{
            if(line!=''){
                count=0
                template.forEach((attr)=>{
                    valuePropertyStart=line.search(attr)+attr.length+1
                    valuePropertyEnd=valuePropertyStart
                    while (line.charAt(valuePropertyEnd)!=','){
                        valuePropertyEnd+=1
                    }

                    if(count<template.length-1){
                        chunk+=line.substring(valuePropertyStart, valuePropertyEnd)+','
                    }
                    else{
                        // if it is at the end not add the comma
                        chunk+=line.substring(valuePropertyStart, valuePropertyEnd)
                    }
                    count++
                })
                chunk+='\n'
            }
        })
        // write the output
        writeStream.write(chunk,callback)
    }
	
})

pipeline(readStream,converter,writeStream,handle_error)