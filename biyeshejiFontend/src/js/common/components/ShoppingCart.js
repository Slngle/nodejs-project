var AppActions = require('../actions/AppActions');
var AppStoresForShoppingCart = require('../stores/AppStoresForShoppingCart');
var lib = require('../../lib/index');
var PAGE_OS = lib.navigator();
var jsonPrefixForHttps = lib.returnHost({forHttps:true});
var ShoppingCart = React.createClass({
    getInitialState:function() {
        return AppStoresForShoppingCart.initData
    },
    componentDidMount: function() {
        AppStoresForShoppingCart.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AppStoresForShoppingCart.removeChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(AppStoresForShoppingCart.data);
    },
    gotoShopingcart:function() {
        //去购物车逻辑
        if ((PAGE_OS.compareVersion(PAGE_OS.appVersion, '3.2.0')>=0 && PAGE_OS.isIOS) || (PAGE_OS.compareVersion(PAGE_OS.appVersion, '3.2.8')>=0 && PAGE_OS.isAndriod)) {
        //链接后加spm
          try{//"a_shandiangou.b_one_dollar_buying.c_1.d_"
              GlobalCart.goCartPage(lib.spm().shopCarts);
          }
          catch(e){
              window.location.href = jsonPrefixForHttps + 'buyer/trade/php/o2o/buyface/home/shopping_cart.php?page=new-app-page' + '&spm=' + lib.spm().shopCarts;  
          }
        } else {
        //native埋点
          try{
              try {
                  bridge.statistics('', 'clickMonitor', JSON.stringify({
                      Referrer: location.href + '&spm='+ (lib.getByUrl('spm')||''),
                      spm: '/buyer/trade/php/o2o/buyface/home/shopping_cart.php?page=new-app-page' + '&spm=' + lib.spm().shopCarts
                  }),2);
              } catch (e) {

              }
              GlobalCart.goCartPage(lib.spm().shopCarts);
          }
          catch(e){
              window.location.href = jsonPrefixForHttps + 'buyer/trade/php/o2o/buyface/home/shopping_cart.php?page=new-app-page' + '&spm='+lib.spm().shopCarts;  
          }
        }

    },
    render: function() {
        var cartNum = this.state.cartNum || 0;
        var styles = cartNum!=0?{ "visibility": "visible" }:{ "visibility": "hidden" };
        return (
            <div id="shoppingCart" className="shoppingCart" onClick={this.gotoShopingcart}>
                <span id="shoppingCartNumber" className="shoppingCartNumber" style={styles}>{cartNum}</span>
            </div>
        )
    }

});

module.exports = ShoppingCart;