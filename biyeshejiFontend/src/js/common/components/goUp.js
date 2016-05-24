var GoUp = React.createClass({
	goTop:function() {
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	},
	render: function() {
		return (
			<div className="goUp hidden" onClick={this.goTop}>

			</div>
		);
	}

});

module.exports = GoUp;