var EventEmitter  = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var actionType = require('../actions/ActionType');

var EVENT_CHANGE = 'store::change';
var AppStoresForToast = assign({}, EventEmitter.prototype, {
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
    case actionType.getOver:
      return getOver(action.params);
    case actionType.setToast:
      return setToast(action.params);  
    case actionType.showLoading:
      return showLoading(action.params);  
    case actionType.hideLoading:
      return hideLoading(action.params); 
    default:
      return true;
  }
});

//改变Toast的参数
function setToast(params) {
    AppStoresForToast.data = {
      data:params
    };
    AppStoresForToast.emitChange();
}

//出现loading
function showLoading() {
    AppStoresForToast.data = {
      data:{
        type:"loading",
        style:{
          'display':'-webkit-box'
        }
      }
    };
    AppStoresForToast.emitChange();
}

function hideLoading() {
    AppStoresForToast.data = {
      data:{
        type:"loading",
        style:{
          'display':'none'
        }
      }
    };
    AppStoresForToast.emitChange(); 
}

//点击抢完的按钮出文案
function getOver(params) {
    AppStoresForToast.data = {
      data:{
        style:{'display':'-webkit-box'},
        content:'抢完啦，坐等下次吧~'        
      }
    }
    AppStoresForToast.emitChange();
}

AppStoresForToast.initData = {
  data:{
    style : {
      display:"none"
    }
  }
}

module.exports = AppStoresForToast;