// 金额转换
function(){
    if(s!==undefined){
        // 订单中的金额不进行取舍
        if(s/100000000 >1 && type=='order'){
            // 大于1亿 四舍五入
            s = (s/100000000).toFixed(2)
            w = '亿'
        }else if(s/10000 >1 && type=='order'){
            // 大于1万 四舍五入
            s = (s/10000).toFixed(2)
            w = '万'
        }else{
            s = s
            w = ''
        }
        // 判断是否为负数
        var sign = s<0 ? '-':''
        // 取绝对值
        s = s<0 ? Math.abs(s) : s
        // \g全局匹配 -负号、\.小数点、\d数字的字符串，转换为parseFloat浮点型并toFixed(2)保留小数点2位
        // []：包含的意思,默认是一个字符长度
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";   
        //使用.分割字符串，在使用空分割每个字符，并反转
        var l = s.split(".")[0].split("").reverse(),   
        r = s.split(".")[1]; 
        // 初始化t值
        t = "";   
        for(i = 0; i < l.length; i ++ ){
            // 字符串链接，每格3个数且长度不等于总长度则增加一个逗号
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
        }
        // 分割t字符串并反转合并，因保留2位小数，所以必须增加小数点
        return sign+t.split("").reverse().join("") + "." + r +w;   
    }
}

// 数字金额转换大写
function(){
    /**
    * 思路: 数据逻辑例子;壹万壹仟壹佰壹拾壹'亿'壹仟壹佰壹拾壹'万'壹仟壹佰壹拾壹'元'
    * 1,大写金额只有角和分，且仟佰拾反复循环，元，万，亿只出现一次
    * 2，使用循环获取最后一位数字，并转换为她的大写，且每循环4次后跟上一个万，每8次跟上一个亿
    */
    if(n){
        // 初始化数字大写对应的汉字
        var fraction = ['角','分'];  
        var digit = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖']
        // 因上万之后，拾佰仟依然重复出现，所以分为2维数组
        var unit = [['元','万','亿'], ['','拾','佰','仟']]
        // 若为负数,则..
        var head = n < 0? '欠': '' 
        // 取绝对值
        n = Math.abs(n)
        var s = ''
        // 获取小数点右边的大写，只有2位角和分
        for (var i = 0; i < fraction.length; i++){  
            // 乘10取10的余数，获取小数位的数字，正则舍去零和其后1个任意字符
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');  
        }  
        s = s || '整';  
        // 获取小数点左边的大写
        n = Math.floor(n);  
        // 元、万、亿 中包含 拾佰仟
        for (var i = 0; i < unit[0].length && n > 0; i++){  
            var p = ''; 
            // 循环是否超过万
            for (var j = 0; j < unit[1].length && n > 0; j++){
                // 获取个位数字
                p = digit[n % 10] + unit[1][j] + p; 
                // 舍去给位数
                n = Math.floor(n / 10);  
            } 
            // 舍去零和其后1个任意字符
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;
            // 零*零 替换为空
        } 
        // /(零.)*零元/ 匹配零....零元 ：/(零.)+/g 匹配任职零*
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    }
}
// 计算时间长度
 function(time){
    // 获取当前时间
    var now = new Date()
    // 获取过去时间
    var oldtime = new Date(time)
    // var temp = Math.floor((oldtime-now)/1000/24/60/60)
    // 向上取整,获取天数
    var temp = Math.ceil((oldtime - now) / 1000 / 24 / 60 / 60)
    if (now > oldtime) {
        return '0'
    } else {
        return temp
    }
}
// 倒计时
function(time,flag){
    var oldtime = new Date(time)
    var now = new Date()
    var tm = oldtime-now
    var dd =parseInt(tm/1000/60/60/24,10)
    var hh =parseInt(tm/1000/60/60%24,10)
    var mm =parseInt(tm/1000/60%60,10)
    var ss =parseInt(tm/1000%60,10)
    var dhms = dd+'天'+hh+'小时'+mm+'分'+ss+'秒'
    if(flag=='hs'){
        return now>oldtime ? 0 : dhms
    }else{
        return now>oldtime ? 0 : dd
    }
}
// 获取将来时间
function (e) {
    var nowTime = (new Date()).getTime()
    var futurnTime = nowTime + parseInt(e) * 24 * 3600 * 1000
    return new Date(futurnTime)
}