var SelfCenter = React.createClass({
	touchmove:function(e) {
		e.preventDefault();
	},
	render: function() {
		return (
			<div className="self-center" onTouchMove={this.touchmove.bind(this)}>
				<div className="self-center-wrap hidden">
					<div className="self-header">
						个人中心
					</div>
					<div className="per-img">
						<div className="self-pic">
							<img src="../build/img/pp-pic.png" />
						</div>
						<div className="user-nick">
							王蛋蛋
						</div>
					</div>
					<div className="self-list">
					</div>
				</div>
			</div>
		);
	}

});

module.exports = SelfCenter;