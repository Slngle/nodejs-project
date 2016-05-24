var lib = {}; 
//节流函数
lib.throttle = function (func, wait) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function () {
        previous = Date.now();
        timeout = null;
        result = func.apply(context, args);
    };
    return function () {
        var now = Date.now();
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

//获取链接里的参数
lib.getByUrl = function(key,source) {
  var url = source?decodeURIComponent(decodeURIComponent(source)):decodeURIComponent(decodeURIComponent(window.location.href));
  var re = new RegExp("[&?]"+key+'=[^&#]+','g');
  var getUrl = url.match(re) && url.match(re)[0] && url.match(re)[0].split('=') && url.match(re)[0].split('=')[1];
  return getUrl;
}

//设置native的透明头
lib.setNativeBar = function() {
    var PAGE_OS = lib.navigator();
    if(window.bridge && PAGE_OS.isApp) {
        bridge.callNativeSync("setChangePos",{distance:164});
    }
}

//数组去重
lib.parseArray = function(params) {
    var arr = params.arr;
    var newArr = [];
    var lastOne ;
    for(var i=0;i<arr.length;i++) {
        if(i==0) {
            newArr.push(arr[0]);
            lastOne = arr[0];
        }else if(arr[i].id!=lastOne.id){
             newArr.push(arr[i]);
             lastOne = arr[i];
        }
    }
    return newArr;
}

//返回网络异常页面
lib.callNativeError = function() {
    bridge.callNativeSync('netWorkError');
}

//从购物车回到二级页 触发brige监听 运行方法 只有一次消费 bridgeCallJsFn是一个放在window下面的函数 里面可以有若干函数
lib.bindDisplayBack = function () {
    var PAGE_OS = lib.navigator();
    if(window.bridge && PAGE_OS.isApp){
        bridge.displayReload('bridgeCallJsFn');
    }
}

//返回埋点信息
lib.spm = function() {
    var spm = {
        shopCarts:'a_shandiangou.b_full_reduction_activities.c_a.d_',
        foodLink:'a_shandiangou.b_full_reduction_activities.c_b.d_'
    };
    return spm;
}

//返回host
lib.returnHost = function(params) {
    var hostname = window.location.hostname;
    var https = params && params.forHttps?"":"http:";
    if(hostname.match("daily")) {
        return (https+'//daily.52shangou.com/');
    }else if(hostname.match("gray")) {
        return (https+'//gray.52shangou.com/');
    }else if(hostname.match("h5") || hostname.match("www")) {
        return (https+'//www.52shangou.com/');
    }else {
        return (https+'//daily.52shangou.com/');
    }
}

//生成随机数 规则取当前时间long类型 +num位字符串
lib.randomData = function(num) {
    var oDate = new Date();
    var str = oDate.getTime();
    for(var i = 0;i < num;i++) {
        str += parseInt(Math.random()*10);
    }
    return str;
}

//parse 数字 23.00
lib.parse = function (x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        console.log('function:changeTwoDecimal->parameter error');
        return false;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}

//根据服务器时间返回前几天 或者后几天 的时间
//参数 setDates 
 lib.returnDate = function (params) {
  if(!params) {
    console.log('请输入时间');
    return ;
  }
  var oDate = new Date(params.date);
  var setDates = params.set;
  if(setDates) {
    oDate.setDate(oDate.getDate() + setDates)
  }
  return (
    oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate()
  )
}

//不满10 加上0
lib.checkTime = function(params) {
    var time = params.time;
    if(time<10) {
        return "0" + time;
    }else {
        return time;
    }
}

//比较时分秒的大小
lib.biger = function(params) {
    var re = /-/g;
    if(params.time1.match('24:00:00')) {
        params.time1 = params.time1.replace('24:00:00','23:59:59');
    }
    if(params.time2.match('24:00:00')) {
        params.time2 = params.time2.replace('24:00:00','23:59:59');
    }
    var time1 = params.time1 && params.time1.replace(re,"/");
    var time2 = params.time2 && params.time2.replace(re,"/");

    var date1 = new Date(time1);
    var date2 = new Date(time2);
    date1.setFullYear(date2.getFullYear());
    date1.setMonth(date2.getMonth());
    date1.setDate(date2.getDate());
    if((date1.getTime() - date2.getTime())>0) {
        return true;
    }else {
        return false;
    }
}

//两个时间差
lib.dateDifference = function(params) {
    var re = /-/g;
    var time1 = params.time1 && params.time1.replace(re,"/");
    var time2 = params.time2 && params.time2.replace(re,"/");
    var oDate1 = new Date(time1);
    var oDate2 = new Date(time2);
    var dateCha = oDate1.getTime() - oDate2.getTime();
    var oDateCha = new Date(dateCha);
    return (oDateCha.getTime()/1000/86400);
}

//返回不同格式的时间
lib.timer = function(params) {
    if(!params || !params.time) {
        return;
    }
    var time = params.time;
    var re = /-/g;
    time = time.replace(re,"/");
    var oDate = new Date(time);
    return {
        yy_mm_dd_hh_mm_ss:oDate.getFullYear() +"-"+ lib.checkTime({time:(oDate.getMonth()+1)})+"-"+lib.checkTime({time:oDate.getDate()})+" "+lib.checkTime({time:oDate.getHours()})+":"+lib.checkTime({time:oDate.getMinutes()})+":"+lib.checkTime({time:oDate.getSeconds()}),
        yymmdd:oDate.getFullYear() + "年" + (oDate.getMonth()+1) + "月" + oDate.getDate() + "日",
        yymm:oDate.getFullYear() + "年" + (oDate.getMonth()+1) + "月",
        mmdd:(oDate.getMonth()+1) + "月" + oDate.getDate() + "日",
        _hhmmss:lib.checkTime({time:oDate.getHours()}) + ":" +lib.checkTime({time:oDate.getMinutes()})+":"+lib.checkTime({time:oDate.getSeconds()}),
        _hhmm:lib.checkTime({time:oDate.getHours()}) + ":" +lib.checkTime({time:oDate.getMinutes()}),
        longTime:oDate.getTime(),
    }
}

//环境判断
lib.navigator = function() {
    var u = navigator.userAgent;
    // 判断环境
    var PAGE_OS = {};
    PAGE_OS.ua = navigator.userAgent;
    if (/bridgeLibVersion/.test(PAGE_OS.ua)){
        PAGE_OS.isApp = true;
    }else {
        PAGE_OS.isApp = false;
    }
    PAGE_OS.appVersion = (PAGE_OS.ua.match(/appVersion\(([^)]+)\)/) && PAGE_OS.ua.match(/appVersion\(([^)]+)\)/)[1]) || '0.0.0';
    PAGE_OS.isIOS = /(iPhone|iPad|iPod)/.test(PAGE_OS.ua);
    PAGE_OS.isAndroid = /Android/.test(PAGE_OS.ua);

    // 判断app版本号大小
    PAGE_OS.compareVersion = function (v1, v2) {
        v1 = v1.toString().split('.');
        v2 = v2.toString().split('.');

        for (var i = 0; i < v1.length || i < v2.length; i++) {
            var n1 = parseInt(v1[i], 10), n2 = parseInt(v2[i], 10);

            if (window.isNaN(n1)) {
                n1 = 0;
            }
            if (window.isNaN(n2)) {
                n2 = 0;
            }
            if (n1 < n2) {
                return -1;
            }
            else if (n1 > n2) {
                return 1;
            }
        }
        return 0;
    }
    return PAGE_OS;
}


window.lib = lib;
module.exports = lib;