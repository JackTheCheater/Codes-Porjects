'use strict';

const {readFile} = require('fs');
const {createServer} = require('http');
const {parse} = require('url');
const headers = { "Content-Type": "application/json" };

function handle_error(error, data) {
    return `${JSON.stringify({ error: error.toString(), data: data || null })}\n`
}


function getRequest(req, res) {
    let url_req = parse(req.url, true);
    let filterObj = url_req.query;
    readFile('weather.json', (err, bufferRead) => {
        if (err) {
            res.writeHead(500, headers);
            res.end(handle_error(err, bufferRead));
        } else {

            let obj = JSON.parse(bufferRead);
            let filteredCsv = JSON_CSV(obj, formatKeys(filterObj));
            res.writeHead(200, headers);
            res.end(filteredCsv);
        }
    });

}


function postRequest(req, res) {
    let posted='';

    req.on('data', chunk => { // callback run synchronously when events of type 'data' are emitted
        console.log(`Received ${chunk.length} bytes of data`);
        posted+=chunk // 'posted' is a global variable here
    });

    req.on('end', () => { // callback run synchronously when events of type 'end' are emitted

        let query = parse(req.url,true);
        if(query.pathname == '/JSON_CSV'){
            try{
                let obj = JSON.parse(posted); // 'posted' is a global variable here
                let csv = JSON_CSV(obj,null);
                res.writeHead(200,headers);
                res.end(csv);
            }
            catch(err){
                res.writeHead(400, headers);
                res.end(handle_error(err,"Bad Request"));
            }

        }else{
            res.writeHead(403, headers);
            res.end("Forbidden");
        }
    });
} 


function formatKeys(obj) {
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {

            let new_prop = key.toUpperCase().replace(/  +/g, ' ').trim();
            obj[new_prop] = obj[key];
            delete obj[key];
        }
    }
    return obj;
}

function JSON_CSV(json_objects, filterObj) {

    let columns_set = new Set();
    let result = "";

    // formatting keys: upper case, trimming to single spaces
    json_objects.forEach(element => {
        formatKeys(element);
    });

    // filling the set of columns
    json_objects.forEach(element => {
        for (let key in element) {
            if (Object.prototype.hasOwnProperty.call(element, key))
                columns_set.add(key);
        }
    });


    // filtering the json
    let json_filtered = [];

    if (filterObj) {
        console.log(filterObj);
        json_objects.forEach(element => {

            let push = true;
            for (let key in filterObj) {
                if (!Object.prototype.hasOwnProperty.call(element, key) || element[key] != filterObj[key])
                    push = false;
                
                    
            }

            if (push) json_filtered.push(element);

        });
    }
    else {
        json_filtered = json_objects;
    }


    // adding first row with columns
    columns_set.forEach(column => {
        result = result.concat(String(column) + ",");
    });

    result = result.substring(0, result.length - 1);
    result += '\n';

    // adding each row with objects values
    json_filtered.forEach(function (row) {

        columns_set.forEach(column => {

            if (Object.prototype.hasOwnProperty.call(row, column))
                result = result.concat(String(row[column]));

            result += ',';
        })

        result = result.substring(0, result.length - 1);
        result += '\n';

    });

    return result;
}


let s = createServer(
    (req,res) =>{
        const {headers, method, url} = req;
        
        console.log("Header: ", headers)
        console.log("Method: ", method)
        console.log("URL: ", url)

        try{
            switch(method){

                case 'GET':
                    getRequest(req, res);
                    break;
                case 'POST':
                    postRequest(req, res)
                    break;

                default:
            }
        } catch(error){

            res.writeHead(500, headers);
            res.end(handle_error(error, "Server Error"));
        }

    }
)

s.listen(8080)
