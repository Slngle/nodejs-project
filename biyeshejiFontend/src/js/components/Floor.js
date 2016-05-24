var Sticky = require("../common/components/sticky");
var widthList = (function(){
	var html = document.getElementsByTagName('html')[0];
	var attr = html && html.getAttribute('data-dpr');
	if(attr==1) {
		return 52;
	}else if (attr==2) {
		return 104;
	}else if(attr==3) {
		return 156;
	}
})();
var AppActions = require('../actions/AppActions');
var Floor = React.createClass({
	getTop:function(e) {
	    var offset=e.offsetTop;
	    if(e.offsetParent!=null) offset+=this.getTop(e.offsetParent);
	    return offset;
	},
	click:function(params) {
		if(params.activeId == 0) {
			var queryThing = {
				type:params.type
			};
		}else {
			var queryThing = {
				type:params.type,
				itemType:params.itemType
			};
		}

		AppActions.setFloorActiveId({activeId:params.activeId});
		AppActions.setMainList({
			queryThing:queryThing,
			page:1
		});
	},
	componentDidUpdate: function() {
		setTimeout(function() {
			var comStickyWrap = document.querySelector('.com-sticky-wrap');
			var activeType = document.querySelector('.type-active'); 
			comStickyWrap.scrollLeft = activeType.offsetLeft + activeType.offsetWidth - comStickyWrap.offsetWidth + widthList;
		},20);
	},
	render: function() {
		var self = this;
		var floorType = this.props.floorType;
		var list = this.props.floor.list.map(function(data,i) {
			if(data.id == self.props.floor.activeId) {
				return (
					<div data-id={'F'+(data && data.id)} data-type={floorType} className="type type-active" onClick={function(ev){self.click({activeId:data.id,itemType:data.name,type:floorType})}}>
						{data && data.name}
					</div>
				)
			}else {
				return (
					<div data-id={'F'+(data && data.id)} data-type={floorType} className="type" onClick={function(ev){self.click({activeId:data.id,itemType:data.name,type:floorType})}}>
						{data && data.name}
					</div>
				)
			}
		});

		return (
				<Sticky>
					<div className="webkit-sticky-relative-wrap">
						<div className="flex1">
							<div className="com-sticky-wrap">
								<div className="com-sticky-wrap-webkit">
									{list}
								</div>
							</div>
						</div>
					</div>
				</Sticky>
		);
	}

});

module.exports = Floor;