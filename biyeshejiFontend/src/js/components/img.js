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
            
            if(this.props.static) {
                var src = this.props.src;
            }else {
                var src = lib.returnHost() + this.props.src;
            }

            if(dataSize && src.indexOf('|watermark') !== -1){//带水印
                src += '|'+ width +'w_'+ (height ? height + 'h_' : '' ) + 90 +'q_100sh.jpg';
            }
            else if(dataSize){//不带水印
                src += '@'+ width +'w_'+ (height ? height + 'h_' : '' ) + 90 +'q_100sh.jpg';
            }
            console.log(src);
            if(slider == 'true') {
                if(this.props.link) {
                    return (
                        <a href={this.props.link} className={"img"+className}>
                            <img src={src} data-img={src}  data-cdn="no" className="lazyimg"/>
                        </a>
                    );                
                }
                else {
                    return (
                        <div className={"img"+className}>
                            <img src={src} data-img={src}  data-cdn="no" className="lazyimg"/>
                        </div>
                    );                 
                }                
            }
            else {
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

        }
    });

    module.exports = Img; 