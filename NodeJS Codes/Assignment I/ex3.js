'use strict'

function JSON_CSV(json_strings) {

    let columns_set=new Set();
    let result = "";
    let json_objects=[];

    // create objects from String
    json_strings.forEach(element => {
        // each element is one row
        json_objects.push(JSON.parse(element));
    });

    // formatting keys: upper case, trimming to single spaces
    json_objects.forEach(element => {
        for (let key in element) {
            if (Object.prototype.hasOwnProperty.call(element, key)) {

                let new_prop = key.toUpperCase().replace(/  +/g, ' ').trim();
                element[new_prop] = element[key];
                delete element[key];
            }
        }
    });

    // fill the set of columns 
    json_objects.forEach(element => {
        for (let key in element) {
            if (Object.prototype.hasOwnProperty.call(element, key)) 
                columns_set.add(key);
        }
    });


    // print out on standard output

    // add first row with columns
    columns_set.forEach(column =>{
        result = result.concat(String(column) + ",");
    });

    result = result.substring(0, result.length - 1);
    result += '\n';

    // add each row with objects values
    json_objects.forEach(function(row){

        columns_set.forEach(column =>{
            
            if(Object.prototype.hasOwnProperty.call(row,column))
                result = result.concat(String(row[column]));
            
            
            result += ',';
        })
        
        result = result.substring(0, result.length - 1);
        result += '\n';

    });

    return result.substring(0, result.length - 1);
}

console.log(JSON_CSV(['{" air quality":"yellow","temperature":20," sea conditions ":3,"city":"Genova"}','{"city":"Milano","air  quality":"red","temperature ":10}']));
