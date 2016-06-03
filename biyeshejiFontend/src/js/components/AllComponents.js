var AppActions = require('../actions/AppActions'); 
var AppActionsCommon = require('../common/actions/AppActions');
var img = new SGLib.img({
      'class': 'lazyload-img',//img 样式名称
      'lazyHeight': 0,
      'lazyWidth': 0,
      'fireEvent': 'scroll'
});
var bodyDom = document.body;
var fast = SGLib.FastClick(bodyDom);
var Floor = require("./Floor");
var Goup = require("../common/components/goup");
var Toast = require("../common/components/toast");
var Header = require("./Header");
var ListWrap = require("./ListWrap");
var SelfCenter = require("./SelfCenter");
var Detail = require("./Detail");
var FloatFixed = require("./FloatFixed");
var Publish = require('./Publish');
var Login = require('./Login');
var Register = require('./Register');
var lib = require('../lib/index.js');
var goUp;
var AllComponents = React.createClass({
	scrollChangeFloor:function() {
		var allTopBig = true;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		
		if(scrollTop>2000) {
			goUp.classList.remove('hidden');
		}else {
			goUp.classList.add('hidden');
		}
	},
	scroll:function() {
		img.fireLazyload();
	},
    componentDidMount:function() {
    	var self = this;
        img.fireLazyload();       
       	window.addEventListener('scroll',function(){
       		lib.throttle(self.scrollChangeFloor,100)();
       	},false)
       	goUp = document.querySelector('.goUp');
    },
	render: function() {

		return (
			<div className = "AllComponents" onScroll={this.scroll}>
				<div className="mainList">
					<div className="mainListWrap">
						<Header />
						<Floor floor = {this.props.floor} floorType = {this.props.floorType} />
						<ListWrap img = {img} listData = {this.props.mainList} />
					</div>
				</div>
				<FloatFixed />
				<Detail img = {img} detail = {this.props.detail} publish = {this.props.publish} />
				<SelfCenter img = {img} selfcenter = {this.props.selfcenter} />
				<Publish detail = {this.props.detail} publish = {this.props.publish} />
				<Login img = {img} loginPart = {this.props.loginPart} />
				<Register img = {img} register={this.props.register} />
				<Goup />
				<Toast />
			</div>
		);
	}

});

module.exports = AllComponents;