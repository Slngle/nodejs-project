    //异常流
    var Error = React.createClass({
        render:function() {
            var data = this.props.error;
            return (
                <div className="error-wrap" style={data.display}>
                    <div className="error-context">
                        <div className="error-img">
                            <img src="//imgsize.52shangou.com/img/n/11/30/1448855302897_6565.png"/>
                        </div>
                        <div className="error-text">
                            <p className="p-top">{data.text.p1}</p>
                            <p className="p-bottom">{data.text.p2}</p>
                        </div>
                    </div>
                </div>
            )
        }
    });

    module.exports = Error;