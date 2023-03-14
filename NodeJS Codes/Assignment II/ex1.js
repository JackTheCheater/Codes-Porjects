'use strict'

const {open,read,write,close}=require('fs')
const BUFFER_SIZE=2**20

function handle_error(error) {
    console.error(`ERROR: ${error.code} ${error.message}`);
    process.exit();
}

function copy(rpath,wpath){
    if (typeof copy.offset === 'undefined') {
        copy.offset = 0;
    }

    open(rpath, 'r', (error, fdFrom) => {

        if (error) handle_error(error)

        let buff = Buffer.allocUnsafe(BUFFER_SIZE);

        read(fdFrom, buff, 0, BUFFER_SIZE, copy.offset, (error, bytesRead) => {

            if (error) handle_error(error);

            if (bytesRead === 0) {
              close(fdFrom, (err)=>{
                if(err)
                  console.error("Failed to close file",err);
                else
                  console.log("\n Operation completed, file successfully closed");})
              return;
            }

            open(wpath, (copy.offset === 0) ? 'ax' : 'a' , (error, fdTo) =>{

                if(error) handle_error(error);

                write(fdTo, buff, 0, bytesRead, (error, bytesWritten) =>{

                    if(error) handle_error(error);

                    copy.offset += bytesWritten;
                    copy(rpath, wpath);
                })
            });

        });
    });
}

copy(process.argv[2]||'in.txt',process.argv[3]||'out.txt')