var EventEmitter  = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var actionType = require('../actions/ActionType');
var EVENT_CHANGE = 'store::change';
var AppStoresForShoppingCart = assign({}, EventEmitter.prototype, {
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
    case actionType.setCartNum:
      return setCartNum(action.params);
    default:
      return true;
  }
});

function setCartNum(params) {
    AppStoresForShoppingCart.data = {
        cartNum:params.cartNum
    }
    AppStoresForShoppingCart.emitChange();
}

AppStoresForShoppingCart.initData = {
    cartNum:0
}

module.exports = AppStoresForShoppingCart;