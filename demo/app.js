import React from 'react'
import ReactDOM from 'react-dom'
import Clipper from '../src/Clipper'

class APP extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const clipperProps = {
            crop: {
                x: 10,
                y: 10,
                width: 30,
                aspect: 16 / 9
            },
            // clipWidth: 375,
            // clipHeight: 210,
            onDragEnd: this.onDragEnd,
            onChange: this.onChange,
            onImageLoaded: this.onImageLoaded
        }
        return (
            <div>
                <Clipper {...clipperProps}/>
            </div>
        );
    }

    onChange(crop, pixelCrop, clippedUri) {
        // console.log('移动截图：', crop, pixelCrop, clippedUri)
    }

    onDragEnd(url) {
        // console.log('截图地址：' + url)
    }

    onImageLoaded(crop, image, pixelCrop) {
        console.log('图片load：', crop, image, pixelCrop)
    }
}
ReactDOM.render(<APP/>, document.getElementById('AppContainer'));
