var EventEmitter  = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var actionType = require('../actions/ActionType');
var timeInterval = null;
var EVENT_CHANGE = 'store::change';
var lib = require('../../lib/index');
var AppActionsForWrap = require('../../actions/AppActions');
var AppStoresForCountdown = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(EVENT_CHANGE, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(EVENT_CHANGE, callback);
  },
  emitChange: function() {
    this.emit(EVENT_CHANGE);
  },
});

AppDispatcher.register(function(payload) {
  var action = payload;
  switch(action.actionType) {
    case actionType.setCountdown:
      return setCountdown(action.params);
    default:
      return true;
  }
});

function checkTime(s) {
    if(s<10) {
        var arr = '0'+s;
        return arr;
    }
    else if(s>=10) {
        return s;
    }
}

//startTime 还未到达的时间
//oDate 现在的时间
function time(startTime,oDate,before) {
    var pushDatac = pushData;
    var timeArr = [];
    var ts = startTime - oDate;//计算剩余的毫秒数  
    var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数  
    var hh = parseInt((ts-dd*86400000) /1000 / 60 / 60, 10);//计算剩余的小时数  
    var mm = parseInt((ts-dd*86400000-hh*3600000) / 1000 / 60 , 10);//计算剩余的分钟数  
    var ss = parseInt((ts-dd*86400000-hh*3600000-mm*60000)/1000, 10);//计算剩余的秒数  

    var thisTime = new Date(oDate);
    //var dataTime = Number(dd*24)+Number(hh);    
    dd = dd;  
    hh = checkTime(hh);  
    mm = checkTime(mm);  
    ss = checkTime(ss);  
    timeArr.push(dd,hh,mm,ss);
    pushDatac.timeArr = timeArr;
    pushDatac.before = before;
    pushDatac.timeInterval = timeInterval;
    pushDatac.systemTime = thisTime.getFullYear() + "-" + (thisTime.getMonth()+1) + "-" +thisTime.getDate()+" "+thisTime.getHours()+":"+thisTime.getMinutes()+":"+thisTime.getSeconds();
    AppStoresForCountdown.data = pushDatac;

    AppStoresForCountdown.emitChange();
}
var once = 1;
var onceBegin = 1;
function cacularTime(oDate,startTime,endTime,shouldShow,params) {    
        if(oDate<startTime) {
            if(once<3) {
                var paramsAdd = params;
                var date1 = new Date(oDate);
                var date2 = new Date(startTime);
                var date3 = new Date(endTime);
                paramsAdd.systemTime = date1.getFullYear() +"-"+ lib.checkTime({time:(date1.getMonth()+1)})+"-"+lib.checkTime({time:date1.getDate()})+" "+lib.checkTime({time:date1.getHours()})+":"+lib.checkTime({time:date1.getMinutes()})+":"+lib.checkTime({time:date1.getSeconds()});
                paramsAdd.startTime = date2.getFullYear() +"-"+ lib.checkTime({time:(date2.getMonth()+1)})+"-"+lib.checkTime({time:date2.getDate()})+" "+lib.checkTime({time:date2.getHours()})+":"+lib.checkTime({time:date2.getMinutes()})+":"+lib.checkTime({time:date2.getSeconds()});
                paramsAdd.endTime = date3.getFullYear() +"-"+ lib.checkTime({time:(date3.getMonth()+1)})+"-"+lib.checkTime({time:date3.getDate()})+" "+lib.checkTime({time:date3.getHours()})+":"+lib.checkTime({time:date3.getMinutes()})+":"+lib.checkTime({time:date3.getSeconds()});

                setTimeout(function() {
                    AppActionsForWrap && AppActionsForWrap.setAppStoresData && AppActionsForWrap.setAppStoresData(params);
                    once = once + 1;
                },10);
            }
        }
        if(oDate>startTime) {
            if(onceBegin<3 ) {
                var paramsAdd = params;
                var date1 = new Date(oDate);
                var date2 = new Date(startTime);
                var date3 = new Date(endTime);
                paramsAdd.systemTime = date1.getFullYear() +"-"+ lib.checkTime({time:(date1.getMonth()+1)})+"-"+lib.checkTime({time:date1.getDate()})+" "+lib.checkTime({time:date1.getHours()})+":"+lib.checkTime({time:date1.getMinutes()})+":"+lib.checkTime({time:date1.getSeconds()});
                paramsAdd.startTime = date2.getFullYear() +"-"+ lib.checkTime({time:(date2.getMonth()+1)})+"-"+lib.checkTime({time:date2.getDate()})+" "+lib.checkTime({time:date2.getHours()})+":"+lib.checkTime({time:date2.getMinutes()})+":"+lib.checkTime({time:date2.getSeconds()});
                paramsAdd.endTime = date3.getFullYear() +"-"+ lib.checkTime({time:(date3.getMonth()+1)})+"-"+lib.checkTime({time:date3.getDate()})+" "+lib.checkTime({time:date3.getHours()})+":"+lib.checkTime({time:date3.getMinutes()})+":"+lib.checkTime({time:date3.getSeconds()});

                setTimeout(function() {
                    AppActionsForWrap && AppActionsForWrap.setAppStoresData && AppActionsForWrap.setAppStoresData(params);
                    onceBegin = onceBegin+1;
                },10);  
            }              
        }


    var pushDatac = pushData;
    if(oDate<startTime) {
        time(startTime,oDate,true);
    } else if((oDate>startTime || oDate==startTime) && oDate<endTime) {
        if(shouldShow) {
           time(endTime,oDate);
         }else {
            clearInterval(timeInterval);
         }
    } else if(oDate>endTime || oDate==endTime) {
        clearInterval(timeInterval);
        pushDatac.end = true;
        pushDatac.timeInterval = timeInterval;
        AppStoresForCountdown.data = pushDatac;
        AppStoresForCountdown.emitChange();
    }
}
var pushData;
function setCountdown(params) {
    pushData = params;
    var systemTime = lib.timer({time:params.systemTime}).longTime;
    var oDate = new Date().getTime();
    var startTime = lib.timer({time:params.startTime}).longTime - systemTime + oDate;
    var endTime = lib.timer({time:params.endTime}).longTime - systemTime + oDate; 
    var shouldShow = params.shouldShow;//是否显示距离结束还有多少时间
    clearInterval(timeInterval);
    timeInterval = setInterval(function() {
        cacularTime(oDate,startTime,endTime,shouldShow,params);
        oDate= new Date().getTime();
    },1000);
}

AppStoresForCountdown.initData = {
    systemTime:'',
    startTime:'',
    endTime:'',
    dayStartTime:'',
    dayEndTime:'',
    timeArr:[],
    dayOn:true,
    end:false,
    before:true,
    timeInterval:timeInterval
}

module.exports = AppStoresForCountdown;