var Login = React.createClass({
	touchmove:function(e){
		e.preventDefault();
	},
	render: function() {
		var loginPart = this.props.loginPart;
		return (
			<div className={loginPart.active?"loginpart loginpartAct":"loginpart"} onTouchMove={this.touchmove.bind(this)}>

			</div>
		);
	}

});

module.exports = Login;