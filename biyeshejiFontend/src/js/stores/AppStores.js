var EventEmitter  = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionType = require('../actions/ActionType');
var AppActionsCommon = require('../common/actions/AppActions');
var lib = require('../lib/index.js');
var setSpm = lib.spm();
var EVENT_CHANGE = 'store::change';
var AppStores = assign({}, EventEmitter.prototype, {
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
    case actionType.mtop:
      return mtop(action.params);
    case actionType.setMainList:
      return setMainList(action.params);
    case actionType.setSelfDetail:
      return setSelfDetail(action.params);
    case actionType.setSelfCenter:
      return setSelfCenter(action.params);
    case actionType.setFloorActiveId:
      return setFloorActiveId(action.params);
    case actionType.setPublish:
      return setPublish(action.params);
    case actionType.publish:
      return publish(action.params);
    default:
      return true;
  }
});

AppStores.data = {
  mainList:{},
  selfCenter:{},
  floorType:'found',
  detail:{
      active:false,
      data:{}
  },
  floor : {
    list:[{id:0,name:'所有物品'},
            {id:1,name:'电子产品'},
            {id:2,name:'办公用品'},
            {id:3,name:'各类卡'},
            {id:4,name:'雨伞'},
            {id:5,name:'钥匙'},
            {id:6,name:'学习资料'},
            {id:7,name:'水杯'},
            {id:8,name:'衣服'},
            {id:9,name:'钱包'},
            {id:10,name:'其他'}],
    activeId:0
  },
  publish:{
    active:false,
    data:{}
  },
  loginPart:{
    active:false,
  }
}

//初始数据获取
function mtop(params) {
  var queryThing = {
          "type" : "found" 
        };
  $.ajax({
    url:'http://localhost:3009/graduationDesign/api/lostAndFound/getPosts',
    dataType:'jsonp',
    data:{
      queryThing:JSON.stringify(queryThing),
      "page":1
    },
    success:function(data) {
      if(data && data.status == true) {
          var entry = data.entry;
          AppStores.data.mainList.list = entry.docs;
          AppStores.data.requestOver = true;
          AppStores.data.haveData = true;
          AppStores.emitChange();
      }
    },
    error:function(ex) {
      console.log(ex);
    }
  });
}

function setLogin(params) {
    AppStores.data.publish.active = params.active;
    AppStores.emitChange();
}

function setPublish(params) {
    AppStores.data.loginPart.active = params.active;
    AppStores.emitChange();
}

function publish(params) {
    $.ajax({
      url:'http://localhost:3009/graduationDesign/api/lostAndFound/post',
      dataType:'jsonp',
      data:params.data,
      success:function(data) {
          if(data && data.status==true) {
              AppActionsCommon.setToast({
                title:"失物招领提示",
                type:"toast",
                content:'发布成功',
              }); 
              setTimeout(function() {
                  AppStores.data.publish.active = false;
                  AppStores.emitChange();                
              },1500);
          }else {
              AppActionsCommon.setToast({
                title:"失物招领提示",
                content:'发布失败'
              }); 
          }
      },
      error:function(ex) {
          AppActionsCommon.setToast({
            title:"失物招领提示",
            content:'发布失败'
          }); 
      }
    })
}



function setMainList(params) {
    var queryThing = params.queryThing;
    $.ajax({
      url:'http://localhost:3009/graduationDesign/api/lostAndFound/getPosts',
      dataType:'jsonp',
      data:{
        queryThing:JSON.stringify(queryThing),
        page:params.page
      },
      success:function(data) {
          if(data && data.status == true) {
              var entry = data.entry;
              AppStores.data.mainList.list = entry.docs;
              AppStores.data.floorType = params.queryThing.type;
              AppStores.emitChange();
          }
      },
      error:function(ex) {
        console.log(ex);
      }
    });
}

function setSelfDetail(params) {
    if(params && params.back) {
      AppStores.data.detail.active = false;
      AppStores.emitChange();
      return;
    }
    $.ajax({
      url:'http://localhost:3009/graduationDesign/api/lostAndFound/getDetail',
      dataType:'jsonp',
      data:{
        ArticleID:params.ArticleID
      },
      success:function(data) {
        if(data && data.status == true) {
            var entry = data.entry;
            AppStores.data.detail.active = true;
            AppStores.data.detail.data = entry && entry.docs;
            AppStores.emitChange();
        }
      },
      error:function(ex) {
        console.log(ex);
      }
    });
}

function setSelfCenter(params) {
    $.ajax({
      url:'http://localhost:3009/graduationDesign/api/lostAndFound/getUserOwn',
      dataType:'jsonp',
      success:function(data) {
        if(data && data.status == true) {
            var entry = data.entry;
            AppStores.data.selfCenter.haveData = false;
            AppStores.data.selfCenter.pic = entry.pic;
            AppStores.data.selfCenter.name = entry.name;
            AppStores.data.selfCenter.list = entry.docs;
            AppStores.emitChange();
        }
      },
      error:function(ex) {
        console.log(ex);
      }
    })
}

function setFloorActiveId(params) {
    AppStores.data.floor.activeId = params.activeId;
    AppStores.emitChange();
}

AppStores.initData = {
    requestOver:false,
    haveData:false,
    error:{
      display:{display:"none"},
      text:{
        p1:"",
        p2:""
      }
    },
    loading:{
      display:"block"
    },
    selfCenter:{
        haveData:false,
        data:{
          pic:'',
          name:'',
          list:[]
        }
    },
    floorType:'found',
    floor : {
      list:[{id:0,name:'所有物品'},
            {id:1,name:'电子产品'},
            {id:2,name:'办公用品'},
            {id:3,name:'各类卡'},
            {id:4,name:'雨伞'},
            {id:5,name:'钥匙'},
            {id:6,name:'学习资料'},
            {id:7,name:'水杯'},
            {id:8,name:'衣服'},
            {id:9,name:'钱包'},
            {id:10,name:'其他'}],
      activeId:0
    },
    detail:{
      active:false,
      data:{}
    },
    publish:{
      active:false,
      data:{}
    },
    loginPart:{
      active:false,
    }
}

module.exports = AppStores;