var AppActions = require('../actions/AppActions'); 
var AppActionsCommon = require('../common/actions/AppActions'); 
var twice = 1;
var Img = require('./img');
var timer = null;
var timerPhone = null;
var timerpassword = null;
var loginArea = {};
var Login = React.createClass({
	touchmove:function(e){
		e.preventDefault();
	},
	componentDidUpdate: function(prevProps, prevState) {
		var loginPart = this.props.loginPart;
		if(twice<3 && loginPart.active==true) {
			var img = this.props.img;
			clearTimeout(timer);
			timer = setTimeout(function() {
				img.fireLazyload();	
				twice++;
			},500);
		}
	},
	back:function() {
		AppActions.setLogin({
			active:false
		})
	},
	phone:function(ev) {
		clearTimeout(timerPhone)
		timerPhone = setTimeout(function(){
			loginArea.phone = ev.target.value;
		},100); 
	},
	password:function(ev) {
		clearTimeout(timerpassword)
		timerpassword = setTimeout(function(){
			loginArea.password = ev.target.value;
		},100); 
	},
	setRegister:function(params) {
		AppActions.setRegister({
			active:true
		});
	},
	goLogin:function() {
		if(!loginArea || !loginArea.phone || !loginArea.password) {
			AppActionsCommon.setToast({
				title:'失物招领提示',
				content:'请正确填写手机号码和密码！',
			})
		}else {
			var loginPart = this.props.loginPart;
			loginArea.selfcenter = loginPart.selfcenter;
			AppActions.goLogin(loginArea)
		}
	},
	render: function() {
		var loginPart = this.props.loginPart;
		return (
			<div className={loginPart.active?"loginpart loginpartAct":"loginpart"} onTouchMove={this.touchmove.bind(this)}>
				<div className="loginpart-wrap">
					<div className="loginpart-head">
						<div className="back" onClick={this.back}>
							<img src="../build/img/close.png" />
						</div>
						<div className="loginpart-text">
							登录
						</div>
					</div>
					<div className="part-l">
						<Img src="../build/img/logo.png" static={true} rname="part-logo"/>
						<div className="login-input">
							<div className="login-input-wrap">
								<div className="loging-phone">
									<Img src="../build/img/icon_shoujihao.png" static={true} rname="phone-img" />
									<input className="part-input" type="text" onChange={this.phone} placeholder="请输入手机号"/>
								</div>
								<div className="login-password">
									<Img src="../build/img/icon_mimaqueren.png" static={true} rname="password-img" />
									<input className="part-input" type="password" onChange={this.password.bind(this)} placeholder="请输入密码"/>
								</div>
							</div>
						</div>
						<div className="login-reg-btn">
							<div className="login-reg-btn-wrap">
								<div className="login-btn" onClick={this.goLogin}>
									登录
								</div>
								<div className="reg-btn" onClick={this.setRegister}>
									注册
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Login;