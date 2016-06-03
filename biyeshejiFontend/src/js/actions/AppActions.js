var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionType = require('./ActionType');

var AppActions = {
    mtop: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.mtop,
            params: params
        });
    },
    setMainList: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.setMainList,
            params: params
        });
    },
    setSelfDetail: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.setSelfDetail,
            params: params
        });
    },
    setSelfCenter: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.setSelfCenter,
            params: params
        });
    },
    setFloorActiveId: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.setFloorActiveId,
            params: params
        });
    },
    setPublish: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.setPublish,
            params: params
        });
    },
    publish: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.publish,
            params: params
        });
    },
    setLogin: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.setLogin,
            params: params
        });
    },
    goLogin: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.goLogin,
            params: params
        });
    },
    setRegister: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.setRegister,
            params: params
        });
    },
    register: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.register,
            params: params
        });
    },
    selfCenter: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.selfCenter,
            params: params
        });
    },   
    logout: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.logout,
            params: params
        });
    },   

};

module.exports = AppActions;