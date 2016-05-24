var AppStoresForCountdown = require('../stores/AppStoresForCountdown');
var lib = require('../../lib/index');
var Countdown = React.createClass({
	getInitialState:function() {
		var Countdown = this.props.Countdown || {};	
		var longTimeSystem = lib.timer({time:Countdown.systemTime}).longTime;
		var longTimeStart = lib.timer({time:Countdown.startTime}).longTime;
		var longTimeEnd = lib.timer({time:Countdown.endTime}).longTime;
		Countdown.dayOn = true;
		Countdown.before = true;
		Countdown.end = false;
		if(Countdown.dayEndTime.match("00:00:00")) {
			Countdown.dayEndTime = Countdown.dayEndTime.replace('00:00:00','24:00:00');
		}
        if(lib.biger({time1:Countdown.dayStartTime,time2:Countdown.systemTime}) || lib.biger({time1:Countdown.systemTime,time2:Countdown.dayEndTime})) {
            Countdown.dayOn = false;
        }

        if(lib.timer({time:Countdown.systemTime}).longTime > lib.timer({time:Countdown.startTime}).longTime) {
            Countdown.before = false;
        }

        if(lib.timer({time:Countdown.systemTime}).longTime > lib.timer({time:Countdown.endTime}).longTime) {
            Countdown.end = true;
        }

		Countdown.timeInterval = null;
	    if(Countdown.before) {
	    	Countdown.timeArr = this.timeFirst(longTimeStart,longTimeSystem);
	    }else {
	    	Countdown.timeArr = this.timeFirst(longTimeEnd,longTimeSystem);
	    }
        return Countdown;
    },
    componentDidMount: function() {
        AppStoresForCountdown.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        AppStoresForCountdown.removeChangeListener(this._onChange);
    },
    timeFirst:function (startTime,oDate) {
    	//初始数据date渲染
	    var timeArr = [];
	    var ts = startTime - oDate;//计算剩余的毫秒数  
	    var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数  
	    var hh = parseInt((ts-dd*86400000) /1000 / 60 / 60, 10);//计算剩余的小时数  
	    var mm = parseInt((ts-dd*86400000-hh*3600000) / 1000 / 60 , 10);//计算剩余的分钟数  
	    var ss = parseInt((ts-dd*86400000-hh*3600000-mm*60000)/1000, 10);//计算剩余的秒数  
	    //var dataTime = Number(dd*24)+Number(hh);    
	    dd = dd;  
	    hh = lib.checkTime({time:hh});  
	    mm = lib.checkTime({time:mm});  
	    ss = lib.checkTime({time:ss}); 

	    timeArr.push(dd,hh,mm,ss);
	    return timeArr;
	},
	touchMove:function(e) {
		e.preventDefault();
	},
    _onChange: function() {
        this.setState(AppStoresForCountdown.data); 
    },
	render: function() {
		var self = this;
		var data = this.state.timeArr || [];
		var end = this.state.end;
		var dayOn = this.state.dayOn;//是否开着
		var systemTime = this.state.systemTime;
		var startTime  = this.state.startTime;
		var endTime = this.state.endTime;
		var dateDifferenceBefore = lib.dateDifference({time1:startTime,time2:systemTime});
		var beforeStartTime = dateDifferenceBefore>10?false:true;
		var beforeLessthanOne =  dateDifferenceBefore<1?true:false;
		var dateDifferenceLessTime = lib.dateDifference({time1:endTime,time2:systemTime});
		var lessTime = dateDifferenceLessTime>10?false:true;
		var endLessthanOne = dateDifferenceLessTime<1?true:false;
		var before = this.state.before;
		var parseTime = startTime && lib.timer({time:startTime});
		var dayStartTime = self.state.dayStartTime && self.state.dayStartTime.match('24:00:00')?{_hhmm:"24:00"}:(lib.timer({time:self.state.dayStartTime}) || {});
		var dayEndTime = self.state.dayEndTime && lib.timer({time:self.state.dayEndTime}) || {};

		if(this.state.before && beforeStartTime) {
			if(!beforeLessthanOne) {
				var dd = <div className="black-cir">{data && data[0]}</div>;
				var tian = <div className="timer-text">天</div>;
			}else {
				var dd = <div></div>;
				var tian = <div></div>;
			}
			var html = <div className="countdown-wrap-left">
							<p className="countdown-top-p">{parseTime && (parseTime.mmdd+" "+parseTime._hhmm)}准时开抢</p><p className="countdown-bottom-p">距离本场开始还有</p>
						</div>;
			var countdownDmfm = <div className="countdown-wrap-right">
									{dd}
									{tian}
									<div className="black-cir">{data && data[1]}</div>
									<div className="timer-text">时</div>
									<div className="black-cir">{data && data[2]}</div>
									<div className="timer-text">分</div>
									<div className="black-cir">{data && data[3]}</div>
									<div className="timer-text">秒</div>
								</div>;
		} else if(this.state.before && !beforeStartTime) {
			var html = <div className="countdown-wrap-left">
							<p className="countdown-top-p">{parseTime && (parseTime.mmdd+" "+parseTime._hhmm)}准时开抢</p>
						</div>;
			var countdownDmfm = <div className="countdown-wrap-right"></div>;
			clearInterval(this.state.timeInterval)
		} else if(!this.state.before){
			if(!endLessthanOne) {
				var dd = <div className="black-cir">{data && data[0]}</div>;
				var tian = <div className="timer-text">天</div>;
			}else {
				var dd = <div></div>;
				var tian = <div></div>;
			}
			var html = <div className="countdown-wrap-left">
							<p className="countdown-bottom-p bt-font-size">距离本场结束还有</p>
						</div>;
			var countdownDmfm = <div className="countdown-wrap-right">
									{dd}
									{tian}
									<div className="black-cir">{data && data[1]}</div>
									<div className="timer-text">时</div>
									<div className="black-cir">{data && data[2]}</div>
									<div className="timer-text">分</div>
									<div className="black-cir">{data && data[3]}</div>
									<div className="timer-text">秒</div>
								</div>;
		}

		if(end || this.state.statusCut==-2 || this.state.statusCut==3 || this.state.statusCut==6) {
			return (
				<div className="countdown" onTouchMove = {function(e){self.touchMove(e)}}>
					<div className="endFloat">
						<div className="endFloatCircle">
							<div className="img-wrap">
								<img src="http://imgsize.52shangou.com/img/n/05/09/1462772935041_8770.png" />
							</div>
							<p className="img-wrap-text">活动已结束…T T</p>
						</div>
					</div>
				</div>
			)
		}else if(!dayOn && !this.state.before) {
			return (
				<div className="countdown">
					<div className="closed">
						<p className="closed-title">店铺打烊中</p>
						<p className="closed-content">{"营业时间" +"-"+(dayStartTime._hhmm || "")+"-"+(dayEndTime._hhmm||"")}</p>
					</div>
				</div>
			)
		}else if(!this.state.before && !lessTime) {
			clearInterval(this.state.timeInterval)
			return (
				<div className="countdown-wrap">
				</div>
			)
		}else {
			return (
				<div className="countdown">
					<div className="countdown-wrap">
						{html}
						{countdownDmfm}
					</div>
				</div>
			)			
		} 
	}

});

module.exports = Countdown;