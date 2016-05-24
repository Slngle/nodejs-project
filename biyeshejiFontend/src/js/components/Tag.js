var Tag = React.createClass({

	render: function() {
		var data = this.props.data;
		return (
			<div className="tag">
				{data}
			</div>
		);
	}

});

module.exports = Tag;