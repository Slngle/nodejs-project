var AppDispatcher = require('../../dispatcher/AppDispatcher');
var actionType = require('./ActionType');

var AppActions = {
    getOver: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.getOver,
            params: params
        });
    },
    setToast: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.setToast,
            params: params
        });
    },    
    showLoading: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.showLoading,
            params: params
        });
    },
    hideLoading: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.hideLoading,
            params: params
        });
    },
    setCountdown: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.setCountdown,
            params: params
        });        
    },
    setCartNum: function(params) {
        AppDispatcher.dispatch({
            actionType: actionType.setCartNum,
            params: params
        });        
    }
};

module.exports = AppActions;