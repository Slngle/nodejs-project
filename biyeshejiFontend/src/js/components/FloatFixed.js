
var FloatFixed = React.createClass({
	touchMove:function(e) {
		e.preventDefault();
	},
	hide:function(e) {
		var mainList = document.querySelector('.mainList');
		mainList.classList.remove('mainListforselfcenter');
		e.target.classList.add('hidden');
	},
	render: function() {
		return (
			<div className="FloatFixed hidden" onClick={this.hide.bind(this)} onTouchMove={this.touchMove.bind(this)}></div>
		);
	}

});

module.exports = FloatFixed;