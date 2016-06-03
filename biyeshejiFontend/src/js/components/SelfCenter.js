var SelfcenterList = require('./SelfcenterList');
var AppActions = require('../actions/AppActions');
var SelfCenter = React.createClass({
	touchmove:function(e) {
		e.preventDefault();
	},
	goLogin:function() {
		AppActions.setLogin({selfcenter:true,active:true});
	},
	logout:function() {
		AppActions.logout({selfcenter:true});
	},
	render: function() {
		var selfcenter = this.props.selfcenter;
		console.log(selfcenter);
		var selfcenterData = selfcenter && selfcenter.data && selfcenter.data.docs;
		var selfcenterList = selfcenterData && selfcenterData.map(function(data) {
				return (
					<SelfcenterList data={data}/>
				)
		});
		if(selfcenter.active) {
			return (
				<div className="self-center">
					<div className="self-center-wrap">
						<div className="per-img" onTouchMove={this.touchmove.bind(this)}>
							<div className="self-pic">
								<img src={selfcenter.data.img ||"../build/img/logo.png"} />
							</div>
							<div className="user-nick">
								{selfcenter.data.name}
							</div>
						</div>
						<div className={selfcenterData && selfcenterData.length?"self-list":"self-list no-self-list"}>
							{selfcenterData && selfcenterData.length?selfcenterList:<img src="../build/img/nodata.jpg" />}
						</div>
						<div className="loginandout" onTouchMove={this.touchmove.bind(this)}>
							<div className="l-o" onClick={this.logout}>
								注销
							</div>
						</div>
					</div>
				</div>
			)
		}else {
			return (
				<div className="self-center" onTouchMove={this.touchmove.bind(this)}>
					<div className="self-center-wrap">
						<div className="per-img">
							<div className="self-pic">
								<img src="../build/img/logo.png" />
							</div>
							<div className="user-nick">
								未登录
							</div>
						</div>
						<div className="self-list no-self-list">
								<img src="../build/img/nodata.jpg" />
						</div>
						<div className="loginandout">
							<div className="l-o" onClick={this.goLogin}>
								登录
							</div>
						</div>
					</div>
				</div>
			)			
		}

	}

});

module.exports = SelfCenter;