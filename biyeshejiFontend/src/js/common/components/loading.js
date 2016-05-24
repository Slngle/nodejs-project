    //loading加载
    var Loading = React.createClass({
        componentDidMount:function() {
            var loading = this.refs.loading.getDOMNode();
            var spinTextLoading = new ctrl.loading();
            loading.appendChild(spinTextLoading.root);
            spinTextLoading.bgcolor = '#eee';
            spinTextLoading.arrowDirection = '';
            spinTextLoading.text = '正在加载中...';
            spinTextLoading.mode = 'spin';
        },
        render:function() {
            return (
                <div id="loading" className="loading" ref="loading" style={this.props.loading}>

                </div>
            )
        }
    });

    module.exports = Loading; 