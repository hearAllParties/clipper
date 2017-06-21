'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactImageCrop = require('react-image-crop');

var _reactImageCrop2 = _interopRequireDefault(_reactImageCrop);

require('react-image-crop/dist/ReactCrop.css');

require('../index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clipper = function (_React$Component) {
    _inherits(Clipper, _React$Component);

    function Clipper(props) {
        _classCallCheck(this, Clipper);

        var _this = _possibleConstructorReturn(this, (Clipper.__proto__ || Object.getPrototypeOf(Clipper)).call(this, props));

        _this.state = _extends({}, props);
        return _this;
    }

    _createClass(Clipper, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                originUri = _state.originUri,
                crop = _state.crop,
                keepSelection = _state.keepSelection,
                disabled = _state.disabled,
                crossorigin = _state.crossorigin;

            return _react2.default.createElement(
                'div',
                { className: 'clipper-wrap' },
                _react2.default.createElement(
                    'div',
                    { className: 'clipper-main', ref: 'imgWrap' },
                    this._renderUploadBtn(),
                    _react2.default.createElement(_reactImageCrop2.default, { src: originUri,
                        onImageLoaded: function onImageLoaded(crop, image, pixelCrop) {
                            return _this2.onImageLoaded(crop, image, pixelCrop);
                        },
                        onComplete: function onComplete(crop, pixelCrop) {
                            return _this2.onCropComplete(crop, pixelCrop);
                        },
                        onAspectRatioChange: function onAspectRatioChange(crop, pixelCrop) {
                            return _this2.onAspectRatioChange(crop, pixelCrop);
                        },
                        onChange: function onChange(crop, pixelCrop) {
                            return _this2.onChange(crop, pixelCrop);
                        },
                        onDragStart: function onDragStart(e) {
                            return _this2.onDragStart(e);
                        },
                        onDragEnd: function onDragEnd(e) {
                            return _this2.onDragEnd(e);
                        },
                        crop: crop,
                        keepSelection: keepSelection,
                        disabled: disabled,
                        crossorigin: crossorigin
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'clipper-sub' },
                    _react2.default.createElement(
                        'div',
                        { className: 'preview' },
                        '\u9884\u89C8'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'imgItem' },
                        _react2.default.createElement('canvas', { id: 'clipped', ref: 'clipped' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'describe' },
                        '300px x 300px'
                    )
                ),
                this._renderReUploadBtn()
            );
        }
    }, {
        key: 'onConfirm',
        value: function onConfirm() {
            var _state2 = this.state,
                clippedUri = _state2.clippedUri,
                onConfirm = _state2.onConfirm;

            onConfirm(clippedUri);
        }
    }, {
        key: 'onChange',
        value: function onChange(crop, pixelCrop) {
            var _this3 = this;

            var _state3 = this.state,
                originUri = _state3.originUri,
                onChange = _state3.onChange;

            var canvas = this.refs.clipped;
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.src = originUri;
            img.onload = function () {
                canvas.width = 300;
                canvas.height = 300;
                ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, 300, 300);
                var clippedUri = canvas.toDataURL();
                _this3.setState({
                    clippedUri: clippedUri,
                    crop: {
                        x: crop.x,
                        y: crop.y,
                        width: crop.width,
                        height: crop.height
                    }
                });
                onChange(crop, pixelCrop, clippedUri);
            };
        }
    }, {
        key: 'onDragStart',
        value: function onDragStart() {
            var onDragStart = this.state.onDragStart;

            onDragStart();
        }
    }, {
        key: 'onDragEnd',
        value: function onDragEnd() {
            var onDragEnd = this.state.onDragEnd;

            onDragEnd();
        }
    }, {
        key: 'onImageLoaded',
        value: function onImageLoaded(crop, image, pixelCrop) {
            var onImageLoaded = this.state.onImageLoaded;

            onImageLoaded(crop, image, pixelCrop);
        }
    }, {
        key: 'onCropComplete',
        value: function onCropComplete(crop, pixelCrop) {
            var onCropComplete = this.state.onCropComplete;

            onCropComplete(crop, pixelCrop);
        }
    }, {
        key: 'onAspectRatioChange',
        value: function onAspectRatioChange(crop, pixelCrop) {
            var onAspectRatioChange = this.state.onAspectRatioChange;

            onAspectRatioChange(crop, pixelCrop);
        }
    }, {
        key: '_renderUploadBtn',
        value: function _renderUploadBtn() {
            var _this4 = this;

            var originUri = this.state.originUri;

            if (!originUri) {
                return _react2.default.createElement(
                    'a',
                    { href: 'javascript:;', className: 'upload-btn' },
                    _react2.default.createElement('input', { type: 'file', onChange: function onChange(e) {
                            return _this4.upload(e);
                        } }),
                    '\u9009\u62E9\u56FE\u7247'
                );
            }
        }
    }, {
        key: '_renderReUploadBtn',
        value: function _renderReUploadBtn() {
            var _this5 = this;

            var originUri = this.state.originUri;

            if (originUri) {
                return _react2.default.createElement(
                    'div',
                    { className: 'clear' },
                    _react2.default.createElement(
                        'a',
                        { href: 'javascript:;', className: 'upload-btn' },
                        _react2.default.createElement('input', { type: 'file', onChange: function onChange(e) {
                                return _this5.upload(e);
                            } }),
                        '\u91CD\u65B0\u4E0A\u4F20'
                    )
                );
            }
        }
    }, {
        key: 'upload',
        value: function upload(e) {
            var _this6 = this;

            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var data = e.target.result;
                _this6.paintImg(data);
            };
            reader.readAsDataURL(file);
        }

        //原图缩放

    }, {
        key: 'paintImg',
        value: function paintImg(uri) {
            var _this7 = this;

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var wrapWidth = this.refs.imgWrap.offsetWidth;
            var wrapHeight = this.refs.imgWrap.offsetHeight;
            var ctxImgWidth = void 0,
                ctxImgHeight = void 0;
            var img = new Image();
            img.src = uri;
            img.onload = function () {
                //等比例缩放图片(如果图片宽高都比容器小，则绘制的图片宽高 = 原图片的宽高。)
                //如果图片的宽度或者高度比容器大，则宽度或者高度 = 容器的宽度或者高度，另一高度或者宽度则等比例缩放
                if (img.width < wrapWidth && img.height < wrapHeight) {
                    ctxImgWidth = img.width;
                    ctxImgHeight = img.height;
                } else {
                    var pWidth = img.width / (img.height / wrapHeight);
                    var pHeight = img.height / (img.width / wrapWidth);
                    ctxImgWidth = img.width > img.height ? wrapWidth : pWidth;
                    ctxImgHeight = img.height > img.width ? wrapHeight : pHeight;
                }
                canvas.width = ctxImgWidth;
                canvas.height = ctxImgHeight;
                ctx.drawImage(img, 0, 0, ctxImgWidth, ctxImgHeight);
                var originUri = canvas.toDataURL();
                _this7.setState({ originUri: originUri });
            };
        }
    }]);

    return Clipper;
}(_react2.default.Component);

Clipper.propTypes = {
    originUri: _react.PropTypes.string,
    crop: _react.PropTypes.shape({
        x: _react.PropTypes.number,
        y: _react.PropTypes.number,
        width: _react.PropTypes.number,
        height: _react.PropTypes.number
    }),
    minWidth: _react.PropTypes.number,
    minHeight: _react.PropTypes.number,
    maxWidth: _react.PropTypes.number,
    maxHeight: _react.PropTypes.number,
    keepSelection: _react.PropTypes.bool,
    onConfirm: _react.PropTypes.func,
    onChange: _react.PropTypes.func,
    onComplete: _react.PropTypes.func,
    onImageLoaded: _react.PropTypes.func,
    onAspectRatioChange: _react.PropTypes.func,
    onDragStart: _react.PropTypes.func,
    onDragEnd: _react.PropTypes.func,
    disabled: _react.PropTypes.bool,
    crossorigin: _react.PropTypes.string
};
Clipper.defaultProps = {
    originUri: '',
    crop: undefined,
    crossorigin: undefined,
    disabled: false,
    maxWidth: 100,
    maxHeight: 100,
    minWidth: 0,
    minHeight: 0,
    keepSelection: false,
    onConfirm: function onConfirm() {},
    onChange: function onChange() {},
    onComplete: function onComplete() {},
    onImageLoaded: function onImageLoaded() {},
    onAspectRatioChange: function onAspectRatioChange() {},
    onCropComplete: function onCropComplete() {},
    onDragStart: function onDragStart() {},
    onDragEnd: function onDragEnd() {}
};
exports.default = Clipper;