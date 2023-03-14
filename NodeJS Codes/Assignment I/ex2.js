'use strict'

function stringify(o, ...kept_keys) {
	
	o.forEach(obj=>{
		for (const i in obj)
			if(!kept_keys.includes(i))
				delete obj[i]})
	
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
    return JSON.stringify(o, replacer);
}

console.log(stringify([{city:'Milano',air_quality:'red',temperature:10},{air_quality:'yellow','temperature':20,'sea_conditions':3,city:'Genova'}],'temperature','city'))


