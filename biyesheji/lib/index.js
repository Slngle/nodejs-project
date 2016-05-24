var lib = {}

//返回请求的数据 支持jsonp
lib.sendData = function(request,data,res) {
	if(request.query && request.query.callback) {
        var str =  request.query.callback + '(' + JSON.stringify(data) + ')';
          res.send(str);
    }else {
        res.send(data);
    }
}

//生成随机数
lib.randomData = function(num) {
	var oDate = new Date();
	var str = '';
	for(var i = 0;i < num;i++) {
		str += parseInt(Math.random()*10);
	}
	return (oDate.getTime().toString() + str);
}

module.exports = lib;