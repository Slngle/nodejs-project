var Tag = require('./Tag');

var SelfcenterList = React.createClass({
	render: function() {
		var data = this.props.data || {};
		var tags = data && data.tags;
		var Tags = tags && tags.map(function(data){
			return (
				<Tag data={data} />
			)
		});
		return (
			<div className="self-list-wrap">
				<div className="self-list-content">
					<div className="self-list-title">
						{data.des}
					</div>
					<div className="self-list-tags clear">
						{Tags}
					</div>
				</div>
			</div>
		);
	}

});

module.exports = SelfcenterList;