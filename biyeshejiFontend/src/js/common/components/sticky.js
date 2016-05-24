var lib = require('../../lib/index.js');
var PAGE_OS = lib.navigator();
var Sticky = React.createClass({
	componentDidMount: function() {
		var self = this;
		if(PAGE_OS.isAndroid) {
			window.addEventListener('scroll',function() {
				lib.throttle(self.navPos,100)();
			},false);
		}
	},
	navPos:function() {
		var element = document.querySelector('.webkit-sticky');
	    var top = element.getBoundingClientRect().top;
	    var soldlisttitleWrapPos = document.querySelector('.webkit-sticky-fixed-wrap');
	    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	        if(top < 0 || top == 0) {
	            soldlisttitleWrapPos.classList.add('nav-in-active');
	        }
	        else if(top > 0 ) {
	            soldlisttitleWrapPos.classList.remove('nav-in-active');
	        }          
	},
	checkInApp:function() {
		var tspBar = lib.getByUrl("tspBar");
		
	    //判断是否在app里 没有的话不能把top设置大
	    if(tspBar == 'true') {
	        if(PAGE_OS.isAndroid && !PAGE_OS.isApp) {
	          	return "android";
	        } else if(PAGE_OS.isIOS && !PAGE_OS.isApp) {
	          	return "ios";
	        }else if(!PAGE_OS.isApp) {
	        	return "other";
	        }
	        return true;
	    } else {
	        if(PAGE_OS.isAndroid && !PAGE_OS.isApp) {
	          	return "android";
	        } else if(PAGE_OS.isIOS && !PAGE_OS.isApp) {
	          	return "ios";
	        } else if(!PAGE_OS.isApp) {
	        	return "other";
	        }
	        return true;
	    }
	},
	render: function() {
		var style1 = this.props.style || {}
		var style2 = {};
		if(this.checkInApp() == 'ios') {
			style1.top = '0';
		}else if(this.checkInApp() == 'android') {
			style2.top = '0';
		}else if(this.checkInApp() == "other") {
			style2.top = '0';
		}
		//alert(JSON.stringify(style1)+" "+JSON.stringify(style2));
		return (
			<div className="webkit-sticky" style = {style1}>
				<div className="webkit-sticky-fixed-wrap" style = {style2}>
					{this.props.children}
				</div>
			</div>
		);
	}

});

module.exports = Sticky;