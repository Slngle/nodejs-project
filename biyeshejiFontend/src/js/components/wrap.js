    var AppStores = require('../stores/AppStores');
    var AppActions = require('../actions/AppActions'); 
    var Loading = require('../common/components/loading');
    var Error = require('../common/components/error');
    var Img = require('./img');
    var AllComponents = require('./AllComponents');
    var Wrap = React.createClass({
		getInitialState:function() {
            return AppStores.initData
        },
        componentDidMount: function() {
            AppStores.addChangeListener(this._onChange);
            AppActions.mtop();
        },
        componentWillUnmount: function() {
            AppStores.removeChangeListener(this._onChange);
        },
        _onChange: function() {
            this.setState(AppStores.data);
        },
		render:function() {
            if(!this.state.requestOver || !this.state.haveData) {
                return (
                    <div className="long">
                        <Loading loading={this.state.loading} />
                        <Error error={this.state.error} />
                    </div>
                )
            }
            else {
                return (
                        <AllComponents register = {this.state.register} loginPart = {this.state.loginPart} publish = {this.state.publish} detail = {this.state.detail} floor = {this.state.floor} floorType = {this.state.floorType} mainList = {this.state.mainList} selfcenter = {this.state.selfcenter} />
                )
            }

		}
	});

    module.exports = Wrap; 