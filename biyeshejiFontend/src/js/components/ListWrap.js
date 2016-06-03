var Img = require('./img');
var List = require('./List');
var ListWrap = React.createClass({
	render: function() {
		var img = this.props.img;
		var list = this.props.listData.list.map(function(data){
			return (
				<List img = {img} data={data}/>
			)
		});
		return (
			<div className="list-wrap overflowScrolling">
				{list}
			</div>
		);
	}

});

module.exports = ListWrap;