var Img = require('./img');
var Tag = require('./Tag');
var AppActions = require('../actions/AppActions');
var List = React.createClass({
	setSelfDetail:function(params) {
		AppActions.setSelfDetail(params);
	},
	render: function() {
		var data = this.props.data;
		var tag = data && data.tags && data.tags.map(function(data) {
			return (
				<Tag data={data}/>
			)
		});
		var self = this;
		return (
			<div className="list">
				<div className="list-in">
					<div className="list-head">
						<Img src={data.img} rname="p-pic" />
						<div className="p-name">{data.name}</div>
						<div className="p-time">{data.time && data.time.minute}</div>
					</div>
					<div className="list-content">
						<Img src={data.ttImg} rname="content-img"/>
						<div className="content-text-tag" onClick={function(){self.setSelfDetail({ArticleID:data.ArticleID})}}>
							<div className="content-des">
								{data.des}
							</div>
							<div className="content-tag">
								{tag}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = List;