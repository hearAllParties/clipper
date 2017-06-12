import React from 'react'
import ReactDOM from 'react-dom'
import Clipper from '../src/Clipper'

class APP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clipBoxX: 0,
            clipBoxY: 0,
            clipBoxWidth: 100,
            clipBoxHeight: 100
        }
    }

    componentDidMount() {
        // this.drag()
    }

    render() {
        const {originUri} = this.state
        return (
            <div style={{textAlign: 'center'}}>
                {/*<div ref="wrap" className="clipper-warp">*/}
                    {/*<canvas id="origin" ref="origin" src={originUri}/>*/}
                    {/*<div>*/}
                        {/*<canvas id="cover" ref="cover"/>*/}
                        {/*<canvas id="clipped" ref="clipped"/>*/}
                    {/*</div>*/}
                {/*</div>*/}
                {/*<div>*/}
                    {/*<span id="show_edit" ref="show_edit"></span>*/}
                    {/*<span id="show_img" ref="show_img"><img src=""/></span>*/}
                {/*</div>*/}
                {/*<label className="clipper-upload">*/}
                    {/*<input type="file" onChange={(e) => this.onChange(e)}/>*/}
                    {/*<i className="upload-trigger">+</i>*/}
                {/*</label>*/}
                {/*<button onClick={() => this.clip()}>确定</button>*/}


                <Clipper />
            </div>
        );
    }

    // clip() {
    //     const {originUri, originWidth, originHeight, clipBoxX, clipBoxY, clipBoxWidth, clipBoxHeight} = this.state
    //     const originCanvas = this.refs.origin
    //     const clippedCanvas = this.refs.clipped
    //     const ctx = clippedCanvas.getContext('2d')
    //     const img = new Image()
    //     img.src = originCanvas.toDataURL()
    //     console.log(originWidth, originHeight, clipBoxX, clipBoxY, clipBoxWidth, clipBoxHeight)
    //     clippedCanvas.width = clipBoxWidth
    //     clippedCanvas.height = clipBoxHeight
    //     ctx.drawImage(img, clipBoxX, clipBoxY, clipBoxWidth, clipBoxHeight, 0, 0, clipBoxWidth, clipBoxHeight)
    //     const clippedUri = clippedCanvas.toDataURL()
    //
    //     this.refs.show_img.getElementsByTagName('img')[0].setAttribute('src', clippedUri)
    // }
    //
    // onChange(e) {
    //     const file = e.target.files[0]
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         const data = e.target.result
    //         this.paintImg(data)
    //     }
    //     reader.readAsDataURL(file);
    // }
    //
    // paintImg(uri) {
    //     const originCanvas = this.refs.origin
    //     const ctx = originCanvas.getContext('2d')
    //     const wrapWidth = this.refs.wrap.offsetWidth
    //     const wrapHeight = this.refs.wrap.offsetHeight
    //     let ctxImgWidth, ctxImgHeight
    //     const img = new Image()
    //     img.src = uri
    //     img.onload = () => {
    //         //等比例缩放图片(如果图片宽高都比容器小，则绘制的图片宽高 = 原图片的宽高。)
    //         //如果图片的宽度或者高度比容器大，则宽度或者高度 = 容器的宽度或者高度，另一高度或者宽度则等比例缩放
    //         if (img.width < wrapWidth && img.height < wrapHeight) {
    //             ctxImgWidth = img.width
    //             ctxImgHeight = img.height
    //         } else {
    //             const pWidth = img.width / (img.height / wrapHeight)
    //             const pHeight = img.height / (img.width / wrapWidth)
    //             ctxImgWidth = img.width > img.height ? wrapWidth : pWidth
    //             ctxImgHeight = img.height > img.width ? wrapHeight : pHeight
    //         }
    //
    //         //设置居中
    //         const originImgX = (wrapWidth - ctxImgWidth) / 2 + 'px'
    //         const originImgY = (wrapHeight - ctxImgHeight) / 2 + 'px'
    //         originCanvas.width = ctxImgWidth
    //         originCanvas.height = ctxImgHeight
    //         originCanvas.style.left = originImgX
    //         originCanvas.style.top = originImgY
    //         ctx.drawImage(img, 0, 0, ctxImgWidth, ctxImgHeight)
    //         const originUri = originCanvas.toDataURL()
    //         this.setState({
    //             originUri: originUri,
    //             originImgX: originImgX,
    //             originImgY: originImgY,
    //             originWidth: ctxImgWidth,
    //             originHeight: ctxImgHeight
    //         })
    //         this.clipImg()
    //     }
    // }
    //
    // clipImg() {
    //     const {originUri, originWidth, originHeight, originImgX, originImgY, clipBoxX, clipBoxY, clipBoxWidth, clipBoxHeight} = this.state
    //     const coverCanvas = this.refs.cover
    //     coverCanvas.width = originWidth
    //     coverCanvas.height = originHeight
    //     coverCanvas.style.display = 'block'
    //     coverCanvas.style.left = originImgX
    //     coverCanvas.style.top = originImgY
    //
    //     //绘制遮罩层
    //     const ctx = coverCanvas.getContext('2d')
    //     ctx.fillStyle = 'rgba(0, 0 , 0, 0.4)'
    //     ctx.fillRect(0, 0, originWidth, originHeight)
    //     ctx.clearRect(clipBoxX, clipBoxY, clipBoxWidth, clipBoxHeight)
    //
    //     //预览
    //     const achieve = this.refs.show_edit
    //     achieve.style.background = 'url(' + originUri + ')' + -clipBoxX + 'px ' + -clipBoxY + 'px no-repeat';
    //     achieve.style.width = clipBoxWidth + 'px'
    //     achieve.style.height = clipBoxHeight + 'px'
    // }
    //
    // //拖动设置
    // drag() {
    //     let draging = false;
    //     let _startPos = null;
    //     const wrapOffsetLeft = this.refs.wrap.offsetLeft
    //     const wrapOffsetTop = this.refs.wrap.offsetTop
    //     let {clipBoxX, clipBoxY, clipBoxWidth, clipBoxHeight} = this.state
    //     const coverCanvas = this.refs.cover
    //     coverCanvas.onmousemove = (e) => {
    //         e = e || window.event;
    //         if (e.pageX == null && e.clientX != null) {
    //             var doc = document.documentElement, body = document.body;
    //             e.pageX = e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
    //             e.pageY = e.clientY + (doc && doc.scrollTop || body && body.scrollTop);
    //         }
    //         //获取鼠标到背景图片的距离
    //         const _mousePos = {
    //             left: e.pageX - ( wrapOffsetLeft + e.target.offsetLeft ),
    //             top: e.pageY - ( wrapOffsetTop + e.target.offsetTop )
    //         }
    //
    //         //判断鼠标是否在裁剪区域里面
    //         if (_mousePos.left > clipBoxX && _mousePos.left < clipBoxX + clipBoxWidth && _mousePos.top > clipBoxY && _mousePos.top < clipBoxY + clipBoxHeight) {
    //
    //             coverCanvas.style.cursor = 'move';
    //
    //             coverCanvas.onmousedown = (e1) => {
    //                 const {clipBoxX, clipBoxY} = this.state
    //                 draging = true;
    //                 //记录上一次截图的坐标
    //                 this.ex = clipBoxX;
    //                 this.ey = clipBoxY;
    //
    //                 //记录鼠标按下时候的坐标
    //                 _startPos = {
    //                     left: e.pageX - ( wrapOffsetLeft + e1.target.offsetLeft ),
    //                     top: e.pageY - ( wrapOffsetTop + e1.target.offsetTop )
    //                 }
    //             }
    //
    //             if (draging) {
    //                 const {originWidth, originHeight} = this.state
    //                 //移动时裁剪区域的坐标 = 上次记录的定位 + (当前鼠标的位置 - 按下鼠标的位置)，裁剪区域不能超出遮罩层的区域;
    //                 if (this.ex + ( _mousePos.left - _startPos.left ) < 0) {
    //                     clipBoxX = 0;
    //                 } else if (this.ex + ( _mousePos.left - _startPos.left ) + clipBoxWidth > originWidth) {
    //                     clipBoxX = originWidth - clipBoxWidth;
    //                 } else {
    //                     clipBoxX = this.ex + ( _mousePos.left - _startPos.left );
    //                 }
    //
    //                 if (this.ey + ( _mousePos.top - _startPos.top ) < 0) {
    //                     clipBoxY = 0;
    //                 } else if (this.ey + ( _mousePos.top - _startPos.top ) + clipBoxHeight > originHeight) {
    //                     clipBoxY = originHeight - clipBoxHeight;
    //                 } else {
    //                     clipBoxY = this.ey + ( _mousePos.top - _startPos.top );
    //                 }
    //
    //                 this.setState({
    //                     clipBoxX: clipBoxX,
    //                     clipBoxY: clipBoxY
    //                 })
    //
    //                 this.clipImg();
    //             }
    //
    //             document.body.onmouseup = function () {
    //                 draging = false;
    //                 document.onmousemove = null;
    //                 document.onmouseup = null;
    //             }
    //         } else {
    //             coverCanvas.style.cursor = 'auto';
    //         }
    //     }
    // }

}
ReactDOM.render(<APP/>, document.getElementById('AppContainer'));
