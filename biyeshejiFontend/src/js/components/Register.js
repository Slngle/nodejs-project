var AppActions = require('../actions/AppActions');
var AppActionsCommon = require('../common/actions/AppActions');
var Img = require('./img');
var timer = null;
var regData = {};
var twice = 1;
var Register = React.createClass({
	touchMove:function(e) {
		e.preventDefault();
	},
	back:function() {
		AppActions.setRegister({
			active:false
		});
	},
	register:function() {
		if(regData.password != regData.passwordagin) {
			AppActionsCommon.setToast({
				title:'失物招领提示',
				content:'两次密码不一致！'
			});
		}else if(!regData.name || !regData.phone || !regData.password || !regData.passwordagin) {
			AppActionsCommon.setToast({
				title:'失物招领提示',
				content:'请补充完整注册信息！'
			});
		}else {
			AppActions.register(regData);
		}
	},
	reg:function(params) {
		clearTimeout(timer);
		timer = setTimeout(function(){
			var ele = params.ev.target;
			var type = params.type;
			regData[type] = ele.value;
		},200);

	},
	componentDidUpdate: function() {
		var register = this.props.register;
		if(twice<3 && register.active==true) {
			var img = this.props.img;
			img.fireLazyload();	
			twice++		
		}
	},
	render: function() {
		var register = this.props.register;
		var self = this;
		return (
			<div className={register.active?"register register-act":"register"} onTouchMove={this.touchMove.bind(this)}>
				<div className="register-wrap">
					<div className="register-head">
						<div className="back" onClick={this.back}>
							<img src="../build/img/btn_fanhui.png" />
						</div>
						<div className="register-text">
							注册
						</div>
					</div>
					<div className="part-r">
						<div className="reg-input">
							<div className="reg-input-wrap">
								<div className="reg-phone">
									<Img src="../build/img/icon_nicheng.png" static={true} rname="phone-img" />
									<input className="part-input" type="text" placeholder="请设置昵称" onChange={function(ev){self.reg({type:"name",ev:ev})}}/>
								</div>
								<div className="reg-password">
									<Img src="../build/img/icon_shoujihao.png" static={true} rname="password-img" />
									<input className="part-input" type="text" placeholder="请输入手机号码" onChange={function(ev){self.reg({type:"phone",ev:ev})}}/>
								</div>
								<div className="reg-phone">
									<Img src="../build/img/icon_mimaqueren.png" static={true} rname="phone-img" />
									<input className="part-input" type="password" placeholder="请输入密码" onChange={function(ev){self.reg({type:"password",ev:ev})}}/>
								</div>
								<div className="reg-password">
									<Img src="../build/img/icon_mimaqueren.png" static={true} rname="password-img" />
									<input className="part-input" type="password" placeholder="请再次输入密码" onChange={function(ev){self.reg({type:"passwordagin",ev:ev})}}/>
								</div>
							</div>
						</div>
					</div>
					<div className="regBtn" onClick={this.register}>
						注册
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Register;