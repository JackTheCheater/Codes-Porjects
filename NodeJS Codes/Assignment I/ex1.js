'use strict'

function stringify(value) {
    function replacer(k, v) {
        if(v && Array.isArray(v)){
            return v;
        }
        
        if (v && typeof v === 'object') {
            let replacement = {};
            for (let k1 in v) {
                if (Object.hasOwnProperty.call(v, k1)) {
                    replacement[k1.toUpperCase()] = v[k1];
                }
            }
            return replacement;
        }
        return v;
    }
    return JSON.stringify(value, replacer);
}

let a=[{blob:Symbol(),city:'Milano',air_quality:'red',temperature:10},{air_quality:'yellow','temperature':20,'sea_conditions':3,city:'Genova',fun(x){return x},und:undefined}]
a.prop='prop'
console.log(stringify(a))

