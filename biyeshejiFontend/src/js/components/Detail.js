var AppActions = require('../actions/AppActions');
var lib = require('../lib/index');
var Img = require('./img');
var Tag = require('./Tag');
var twice = 1;
var Detail = React.createClass({
	componentDidUpdate: function() {
		var detail = this.props.detail;
		var publish = this.props.publish;
		var mainList = document.querySelector('.mainList');
		if(detail && detail.active) {
			mainList.classList.add('mainListforDetail');
		}else if(!detail.active && !publish.active){
			mainList.classList.remove('mainListforDetail');
		}
		if(twice<3 && detail.active==true) {
			var img = this.props.img;
			img.fireLazyload();	
			twice++		
		}
	},
	touchMove:function(e) {
		e.preventDefault();
	},
	back:function() {
		AppActions.setSelfDetail({back:true});
	},
	render: function() {
		var detail = this.props.detail;
		var data = detail && detail.data || {};
		var self = this;
		var listTag = detail && detail.data && detail.data.tags && detail.data.tags.map(function(data) {
			return (
				<Tag data={data} />
			)
		});
		return (
			<div className={detail && detail.active?"detail detail-act":"detail"}>
				<div className="detail-wrap">
					<div className="detail-head">
						<div className="back" onClick={this.back}>
							<img src="../build/img/btn_fanhui.png" />
						</div>
						<div className="detail-text">
							详情页
						</div>
					</div>
					<div className="detail-content overflowScrolling">
						<div className="detail-c-p-message">
							<div className="detail-pp-img">
								<img src={data.img || "../build/img/logo.png"} />
							</div>
							<div className="nameanddate">
								<div className="name">{data.name}</div>
								<div className="time">{data.time && data.time.minute}</div>
							</div>
						</div>
						<ul className="detail-message">
							<li>{data.des}</li>
							<li>联系人：{data.name}</li>
							<li>手机号：<a href={"tel:"+data.phone}>{data.phone}</a></li>
							<li>物品ID：{data.ArticleID}</li>
						</ul>
						<div className="content-tags clear">
							{listTag}
						</div>
						<div className="detail-b-img">
							{data.ttimg?<img src={lib.returnHost()+data.ttimg} />:<div></div>}
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Detail;