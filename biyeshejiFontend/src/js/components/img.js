    //img
    //rname为包裹的classname
    //src 图片大小
    //url a链接
    //slider 为slider的图片
    //slider == 'true'说明为slider上的img
    //img 为默认的lazy图片
    //size 为img.js中 data-size的大小
    //initSize 初始占位图的大小
    var lib = require('../lib/index');
    var Img = React.createClass({
        render:function() {
            var className = this.props.rname ? ' '+this.props.rname : '';
            var dataSize = this.props.size || '';
            var width = dataSize && dataSize.split('x') && dataSize.split('x')[0];
            var height = dataSize && dataSize.split('x') && dataSize.split('x')[1];
            var image = this.props.img || '../build/img/moren.png';
            var slider = this.props.slider;
            //var danwei = this.props.src && this.props.src.match(/\w{3}$/) && this.props.src.match(/\w{3}$/)[0];
            if(this.props.static) {
                var src = this.props.src;
            }else {
                var src = lib.returnHost() + this.props.src;
            }
            
            if(dataSize){//不带水印
                src += '@'+ width +'_'+ (height ? height + '_' : 'null_' ) + 90;
            }

            if(this.props.link) {
                return (
                    <a href={this.props.link} className={"img"+className}>
                        <img src={src} data-src={src}  data-cdn="no" className="lazyload-img"/>
                    </a>
                );                
            }
            else {
                return (
                    <div className={"img"+className}>
                        <img src={src} data-src={src} data-cdn="no" data-size={dataSize} className="lazyload-img"/>
                    </div>
                );                 
            }

        }
    });

    module.exports = Img; 