'use strict';
import React, { PropTypes } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import '../index.css'

class Clipper extends React.Component {
    static propTypes = {
        clipWidth: PropTypes.number,
        clipHeight: PropTypes.number,
        originUri: PropTypes.string,
        crop: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
            width: PropTypes.number,
            height: PropTypes.number,
        }),
        minWidth: PropTypes.number,
        minHeight: PropTypes.number,
        maxWidth: PropTypes.number,
        maxHeight: PropTypes.number,
        keepSelection: PropTypes.bool,
        onChange: PropTypes.func,
        onComplete: PropTypes.func,
        onImageLoaded: PropTypes.func,
        onAspectRatioChange: PropTypes.func,
        onDragStart: PropTypes.func,
        onDragEnd: PropTypes.func,
        disabled: PropTypes.bool,
        crossorigin: PropTypes.string,
    }

    static defaultProps = {
        originUri: '',
        clipWidth: 100,
        clipHeight: 100,
        crop: undefined,
        crossorigin: undefined,
        disabled: false,
        maxWidth: 100,
        maxHeight: 100,
        minWidth: 0,
        minHeight: 0,
        keepSelection: false,
        onChange: () => {},
        onComplete: () => {},
        onImageLoaded: () => {},
        onAspectRatioChange: () => {},
        onCropComplete: () => {},
        onDragStart: () => {},
        onDragEnd: () => {},
    }

    constructor (props) {
        super(props);
        this.state = {
            ...props
        }
    }

    render () {
        const {originUri, clipWidth, clipHeight, crop, keepSelection, disabled, crossorigin, maxWidth, maxHeight, minWidth, minHeight} = this.state
        return (
            <div className="clipper-wrap" >
                <div style={{width: 545 + clipWidth, height: 500}}>
                    <div className="clipper-main" ref="imgWrap">
                        {this._renderUploadBtn()}
                        <ReactCrop src={originUri}
                                   onImageLoaded={(crop, image, pixelCrop) => this.onImageLoaded(crop, image, pixelCrop)}
                                   onComplete={(crop, pixelCrop) => this.onCropComplete(crop, pixelCrop)}
                                   onAspectRatioChange={(crop, pixelCrop) => this.onAspectRatioChange(crop, pixelCrop)}
                                   onChange={(crop, pixelCrop) => this.onChange(crop, pixelCrop)}
                                   onDragStart={(e) => this.onDragStart(e)}
                                   onDragEnd={(e) => this.onDragEnd(e)}
                                   crop={crop}
                                   maxWidth={maxWidth}
                                   maxHeight={maxHeight}
                                   minWidth={minWidth}
                                   minHeight={minHeight}
                                   keepSelection={keepSelection}
                                   disabled={disabled}
                                   crossorigin={crossorigin}
                        />
                    </div>
                    <div className="clipper-sub" style={{width: 30 + clipWidth}}>
                        <div className="preview">预览</div>
                        <div className="imgItem" style={{width: clipWidth, height: clipHeight}}>
                            <canvas id="clipped" ref="clipped" style={{width: clipWidth, height: clipHeight}}></canvas>
                        </div>
                        <div className="describe">{clipWidth}px x {clipHeight}px</div>
                    </div>
                </div>
                {this._renderReUploadBtn()}
            </div>
        )
    }

    onChange (crop, pixelCrop) {
        const {originUri, clipWidth, clipHeight, onChange} = this.state
        const canvas = this.refs.clipped
        const ctx = canvas.getContext('2d')
        const img = new Image()
        img.src = originUri
        img.onload = () => {
            canvas.width = clipWidth
            canvas.height = clipHeight
            ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, clipWidth, clipHeight)
            const clippedUri = canvas.toDataURL()
            this.setState({
                clippedUri: clippedUri,
                crop: {
                    x: crop.x,
                    y: crop.y,
                    width: crop.width,
                    height: crop.height,
                    aspect: this.state.crop.aspect
                }
            })
            onChange(crop, pixelCrop, clippedUri)
        }
    }

    onDragStart () {
        const {onDragStart} = this.state
        onDragStart()
    }

    onDragEnd () {
        const {onDragEnd, clippedUri, originUri} = this.state
        onDragEnd(clippedUri, originUri)
    }

    onImageLoaded (crop, image, pixelCrop) {
        const {onImageLoaded} = this.state
        this.onChange(crop, pixelCrop)
        onImageLoaded(crop, image, pixelCrop)
    }

    onCropComplete (crop, pixelCrop) {
        const {onCropComplete} = this.state
        onCropComplete(crop, pixelCrop)
    }

    onAspectRatioChange (crop, pixelCrop) {
        const {onAspectRatioChange} = this.state
        onAspectRatioChange(crop, pixelCrop)
    }

    _renderUploadBtn () {
        const {originUri} = this.state
        if (!originUri) {
            return <a href="javascript:;" className="upload-btn">
                <input type="file" onChange={(e) => this.upload(e)}/>选择图片
            </a>
        }
    }

    _renderReUploadBtn () {
        const {originUri} = this.state
        if (originUri) {
            return <div className="clear">
                <a href="javascript:;" className="upload-btn">
                    <input type="file" onChange={(e) => this.upload(e)}/>重新上传
                </a>
            </div>
        }
    }

    upload (e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            const data = e.target.result
            this.paintImg(data)
        }
        reader.readAsDataURL(file);
    }

    //原图缩放
    paintImg (uri) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const wrapWidth = this.refs.imgWrap.offsetWidth
        const wrapHeight = this.refs.imgWrap.offsetHeight
        let ctxImgWidth, ctxImgHeight
        const img = new Image()
        img.src = uri
        img.onload = () => {
            //等比例缩放图片(如果图片宽高都比容器小，则绘制的图片宽高 = 原图片的宽高。)
            //如果图片的宽度或者高度比容器大，则宽度或者高度 = 容器的宽度或者高度，另一高度或者宽度则等比例缩放
            if (img.width < wrapWidth && img.height < wrapHeight) {
                ctxImgWidth = img.width
                ctxImgHeight = img.height
            } else {
                const pWidth = img.width / (img.height / wrapHeight)
                const pHeight = img.height / (img.width / wrapWidth)
                ctxImgWidth = img.width > img.height ? wrapWidth : pWidth
                ctxImgHeight = img.height > img.width ? wrapHeight : pHeight
            }
            canvas.width = ctxImgWidth
            canvas.height = ctxImgHeight
            ctx.drawImage(img, 0, 0, ctxImgWidth, ctxImgHeight)
            const originUri = canvas.toDataURL()
            this.setState({originUri: originUri})
        }
    }
}

export default Clipper;
