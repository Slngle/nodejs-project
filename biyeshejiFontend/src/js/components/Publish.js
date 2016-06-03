var AppActions = require('../actions/AppActions');
var AppActionsCommon = require('../common/actions/AppActions');
var lib = require('../lib/index');
var queryData = {};//ttimg
var timer  = null;
var Publish = React.createClass({
	componentDidUpdate: function() {
		var publish = this.props.publish;
		var detail = this.props.detail;
		var mainList = document.querySelector('.mainList');
		if(publish && publish.active) {
			mainList && mainList.classList.add('mainListforDetail');
		}else if(!detail.active && !publish.active){
			mainList && mainList.classList.remove('mainListforDetail');
		}
	},
	submit:function(params) {
		if(!queryData || queryData.des=="描述......" || !queryData.des || !queryData.type || !queryData.itemType || !queryData.Ltime || !queryData.area) {
			AppActionsCommon.setToast({
				title:"失物招领提示",
				content:'请填写完整信息，再提交'
			});
		}else {
			AppActions.publish({
				data:queryData
			});
		}
	},
	componentDidMount: function() {
		//onfocus 和 onblur
		var text = document.querySelector('#text');
        text.addEventListener('focus',function() {
            this.style.border = "0";
            if(this.value == '描述......') {
                this.value = '';
            }
        },false);

        text.addEventListener('blur',function() {
            if(this.value == '') {
                this.value = '描述......';
            }
        },false);
	},
	touchMove:function(e) {
		e.preventDefault();
	},
	back:function() {
		AppActions.setPublish({active:false});
	},
	getDate:function() {
		var date=new Date();
		var nowDate=date.getDate();
		var str=[];
		for(var i=0;i<8;i++)
		{	
			date.setDate(nowDate-i);
			str.push(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate());
		}
		return str;
	},
	show:function(params) {
		var className = params.class;
		var id = params.id;
		var height = params.height;
		var jiantou = document.querySelector(className);
		var iHeight = document.querySelector(id);
		iHeight.classList.add(height);
		jiantou.classList.add('jiantouActive');
	},
	choose:function(params) {
		var chooseClass = params.chooseClass;
		var className = params.class;
		var id = params.id;
		var height = params.height;
		var jiantou = document.querySelector(className);
		var iHeight = document.querySelector(id);
		var choose = document.querySelector(chooseClass);
		var type = params.type;
		var target = params.e.target;
		if(target.nodeName == 'LI') {
			jiantou.classList.remove('jiantouActive');
			iHeight.classList.remove(height);
			choose.innerHTML = target.innerHTML;
			if(type=="type" && choose.innerHTML == '丢失') {
				queryData[type] = "lost";
			}else if(type=="type" && choose.innerHTML == '捡到'){
				queryData[type] = "found";
			}else {
				queryData[type] = choose.innerHTML;
			}
		}
	},
	onTextChange:function(params) {
		clearTimeout(timer);
		timer = setTimeout(function() {
			var target = params.ev.target;
			queryData.des = target.value;			
		},200);
	},
	upLoad:function(ev) {
		var target = ev.target;
		if(target && target.files && target.files.length>0) {
			var fileObj = target.files[0];//获取文件对象
			var FileController = lib.returnHost() + "graduationDesign/api/lostAndFound/upload_file";   // 接收上传文件的后台地址
			// FormData 对象
			var form = new FormData();
			form.append("file", fileObj);// 文件对象
			// XMLHttpRequest 对象
			var xhr = new XMLHttpRequest();
			xhr.open("post", FileController, true);

			xhr.onreadystatechange = function () {
	           if (xhr.readyState == 4) {
	               if (xhr.status == 200) {
	                   var response = xhr.responseText;
	                   var J_pzImg = document.querySelector("#J_pzImg");
	                   try {
	                   		response = JSON.parse(response);
	                   }catch(ex) {
	                   		console.log(ex);
	                   }
	                   J_pzImg.src = lib.returnHost() + response.url;
	                   queryData.ttimg = response.url;
	                   AppActionsCommon.setToast({
	                   		title:'失物招领提示',
	                   		type:'toast',
	                   		content:'上传成功'
	                   });
	               }
	           }
	       };
	       xhr.send(form);
		}else {
            AppActionsCommon.setToast({
           		title:'失物招领提示',
           		content:'请选择一个图片！'
           	});
        }
	},
	render: function() {
		var publish = this.props.publish;
		var self = this;
		var date = this.getDate();
		var left = '';
		var right = '';
		for(var i=0;i<date.length;i++) {
			if(i%2) {
				right += '<li>'+date[i]+'</li>';
			}else {
				left += '<li>'+date[i]+'</li>';
			}
		}

		return (
			<div className={publish && publish.active?"publish publish-act":"publish"} onTouchMove={function(e){self.touchMove(e)}}>
				<div className="publish-wrap">
					<div className="publish-head">
						<div className="back" onClick={this.back}>
							<img src="../build/img/btn_fanhui.png" />
						</div>
						<div className="publish-text">
							发布信息
						</div>
						<div className="publish-btn" onClick={this.submit}>
							提交
						</div>
					</div>

					<div className="intro">
			            <textarea className="text" id="text" onChange={function(e){self.onTextChange({ev:e})}}>描述......</textarea>
			            <div className="photo">
			                <div className="photoKuang">
			                    <img src="" id="J_pzImg" />

			                    <div className="content-uploadfile" style={{width:"1.6rem",height:"1.6rem",position:"absolute",zIndex:999}}>
			                         <form method="post" enctype="multipart/form-data">
			                             <input type="file" id="file" accept="image/*;capture=camera" style={{"width":"1.6rem","height":"1.6rem","opacity":0,"border":0}} onChange={this.upLoad.bind(this)}/> 
			                         </form>
			                    </div> 

			                </div>
			                <p className="addphoto">添加图片</p>
			            </div>
			        </div>

					<div className="fl fl1 mt" onClick={function(){self.show({"class":'.fl1 .jiantou',"id":'#J_flMain0',"height":'height1'})}}>
			            <p className="fl-text">类别</p>
			            <p className="choose"></p>
			            <div className="jiantou">
			                <img src="../build/img/jt.png"/>
			            </div>
			        </div>

			        <i className="fl-box" id="J_flMain0" onClick={function(e){self.choose({"type":'type','chooseClass':'.fl1 .choose',"class":'.fl1 .jiantou',"id":"#J_flMain0",e:e,height:'height1'})}}>
			            <div className="fl-box-left">
			                <ul>
			                	<li>丢失</li>
			                </ul>
			            </div>
			            <div className="fl-box-right">
			                <ul>
								<li>捡到</li>
			                </ul>
			            </div>          
			        </i>
					<div className="fl fl2 mt" onClick={function(){self.show({"class":'.fl2 .jiantou',"id":'#J_flMain1',height:'height2'})}}>
			            <p className="fl-text">分类</p>
			            <p className="choose"></p>
			            <div className="jiantou">
			                <img src="../build/img/jt.png"/>
			            </div>
			        </div>

			        <i className="fl-box" id="J_flMain1" onClick={function(e){self.choose({"type":'itemType','chooseClass':'.fl2 .choose',"class":'.fl2 .jiantou',"id":"#J_flMain1",e:e,height:'height2'})}}>
			            <div className="fl-box-left">
			                <ul id="left-fl">
			                	<li>电子产品</li>
			                	<li>办公用品</li>
			                	<li>各类卡</li>
			                	<li>雨伞</li>
			                	<li>钥匙</li>
			                </ul>
			            </div>
			            <div className="fl-box-right">
			                <ul id="right-fl">
								<li>学习资料</li>
								<li>水杯</li>
								<li>衣服</li>
								<li>钱包</li>
								<li>其他</li>
			                </ul>
			            </div>          
			        </i>

			        <div className="fl fl3" onClick={function(){self.show({"class":'.fl3 .jiantou',"id":'#J_flMain2',height:'height3'})}}>
			            <p className="fl-text">时间</p>
			            <p className="choose"></p>
			            <div className="jiantou">
			                <img src="../build/img/jt.png"/>
			            </div>
			        </div>

			        <i className="fl-box" id="J_flMain2" onClick={function(e){self.choose({"type":'Ltime','chooseClass':'.fl3 .choose',"class":'.fl3 .jiantou',"id":"#J_flMain2",e:e,height:'height3'})}}>
			            <div className="fl-box-left">
			                <ul id="left-sj" dangerouslySetInnerHTML={{__html:left}}></ul>
			            </div>
			            <div className="fl-box-right">
			                <ul id="right-sj" dangerouslySetInnerHTML={{__html:right}}>
			                </ul>
			            </div>          
			        </i>

			        <div className="fl fl4" onClick={function(){self.show({"class":'.fl4 .jiantou',"id":'#J_flMain3',height:'height4'})}}>
			            <p className="fl-text">地点</p>
			            <p className="choose"></p>
			            <div className="jiantou">
			                <img src="../build/img/jt.png"/>
			            </div>
			        </div>

			        <i className="fl-box" id="J_flMain3" onClick={function(e){self.choose({"type":'area','chooseClass':'.fl4 .choose',"class":'.fl4 .jiantou',"id":"#J_flMain3",e:e,height:'height4'})}}>
			            <div className="fl-box-left">
			                <ul id="left-dd">
			                	<li>教学区南一门</li>
			                	<li>生活区南一门</li>
			                	<li>运动场南一门</li>
			                </ul>
			            </div>
			            <div className="fl-box-right">
			                <ul id="right-dd">
			                	<li>教学区南二门</li>
			                	<li>生活区南二门</li>
			                	<li>运动场南二门</li>
			                </ul>
			            </div>          
			        </i>

				</div>
			</div>
		);
	}
});

module.exports = Publish;