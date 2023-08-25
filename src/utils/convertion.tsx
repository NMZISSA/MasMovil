export function toStrMoney(num: number) {
    
    let s = num.toFixed(2).toString();
    let len = s.length;
    let k = len - s.indexOf('.')
    let dec = s.substr(len-k, k)
    let nstr = s.substr(0, len-k)
    len = nstr.length
        

    let md = len%3;
        
    let r = [];
    let res = "";
    res = nstr.substr(0, md);
    if(res.length > 0) r.push(res);
    for(let i = md; i < len; i += 3) {
        let tree = nstr.substr(i, 3);
        r.push(tree)
    }
    
    //console.log(r);
    
    res = "";
    
    for(let i = 0; i < r.length; i++) {	
        if(i == r.length-1) {
            res = res + r[i];
        } else {
            res = res + r[i] + ",";
        }
    }

    if(res.length == 0) res = "0";
    
    return res + dec;
    
}