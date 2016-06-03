var Img = require('./img');
var AppActions = require('../actions/AppActions');
var AppActionsCommon = require('../common/actions/AppActions');
var lib = require('../lib/index');
var Header = React.createClass({
	setMainList:function(params) {
		var queryThing = {
			type:params.type
		};
		var headerText = document.querySelectorAll('.header-text');
		if(params.type=='lost') {
			headerText[0].classList.remove('header-text-active');
			headerText[1].classList.add('header-text-active');
		}else if(params.type=='found') {
			headerText[1].classList.remove('header-text-active');
			headerText[0].classList.add('header-text-active');
		}
		AppActions.setMainList({
			queryThing:queryThing,
			page:1
		});
		AppActions.setFloorActiveId({activeId:0});

	},
	showSelfCenter:function(params) {
		var mainList = document.querySelector('.mainList');
		var AllComponents = document.querySelector('.AllComponents')
		var selfCenterWrap = document.querySelector('.self-center-wrap');
		var FloatFixed = document.querySelector('.FloatFixed');
		AllComponents.scrollTop = 0;
		mainList.classList.add('mainListforselfcenter');
		selfCenterWrap.classList.remove('hidden');
		setTimeout(function() {
			FloatFixed.classList.remove('hidden');
		},480);
		AppActions.selfCenter()
	},
	showPublish:function() {
		$.ajax({
			url:lib.returnHost() + 'graduationDesign/api/lostAndFound/isLogin',
			dataType:"jsonp",
			success:function(data) {
				if(data && data.status==true) {
					AppActions.setPublish({active:true});
				}else {
					AppActions.setLogin({active:true});
				}
			},
			error:function() {
				AppActionsCommon.setToast({
					title:"失物招领提示",
					content:"网络请求异常"
				})
			}
		});
		
	},
	render: function() {
		var self = this;
		return (
			<div className="header">
				<div className="header-wrap">
					<div className="header-showl" onClick={this.showSelfCenter}>
						<Img src="../build/img/btn_self.png" static={true} rname="img-box" />
					</div>
					<div className="header-text header-text-active" onClick={function(){self.setMainList({type:"found"})}}>已捡到</div>
					<div className="header-text" onClick={function(){self.setMainList({type:"lost"})}}>已丢失</div>
					<div className="header-showr" onClick={this.showPublish}>
						<Img src="../build/img/edit.png" static={true} rname="img-box" />
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Header;