var Img = require('./img');
var List = require('./List');
var ListWrap = React.createClass({
	render: function() {
		var list = this.props.listData.list.map(function(data){
			return (
				<List data={data}/>
			)
		});
		return (
			<div className="list-wrap">
				{list}
			</div>
		);
	}

});

module.exports = ListWrap;