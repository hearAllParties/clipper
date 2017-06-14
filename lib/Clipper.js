'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

        _this.state = {
            clipBoxX: 0,
            clipBoxY: 0,
            clipBoxWidth: 100,
            clipBoxHeight: 100,
            _startPos: {},
            _mousePos: {},
            dragging: false
        };
        return _this;
    }

    _createClass(Clipper, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                originUri = _state.originUri,
                clipBoxWidth = _state.clipBoxWidth,
                clipBoxHeight = _state.clipBoxHeight;

            return _react2.default.createElement(
                'div',
                { className: 'clipper-wrap' },
                _react2.default.createElement(
                    'div',
                    { className: 'clipper-main', ref: 'imgWrap' },
                    _react2.default.createElement(
                        'div',
                        { className: 'canvas-group' },
                        _react2.default.createElement('canvas', { id: 'origin', ref: 'origin', src: originUri }),
                        _react2.default.createElement('canvas', { id: 'cover', ref: 'cover',
                            onMouseMove: function onMouseMove(e) {
                                return _this2.onMouseMove(e);
                            },
                            onMouseDown: function onMouseDown(e) {
                                return _this2.onMouseDown(e);
                            },
                            onMouseUp: function onMouseUp(e) {
                                return _this2.onMouseUp(e);
                            } })
                    ),
                    this._renderUploadBtn()
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
                        _react2.default.createElement('span', { id: 'clipped', ref: 'clipped' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'describe' },
                        clipBoxWidth,
                        'px x ',
                        clipBoxHeight,
                        'px'
                    )
                ),
                this._renderRange(),
                this._renderReUploadBtn()
            );
        }
    }, {
        key: '_renderRange',
        value: function _renderRange() {
            var _this3 = this;

            var originUri = this.state.originUri;

            if (originUri) {
                return _react2.default.createElement(
                    'div',
                    { className: 'clear' },
                    _react2.default.createElement('input', { type: 'range', min: '100', max: '300', step: '10', onChange: function onChange(e) {
                            return _this3.onRange(e);
                        } })
                );
            }
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
        key: 'onRange',
        value: function onRange(e) {
            console.log(e.target.value);
            this.setState({
                clipBoxWidth: e.target.value / 1,
                clipBoxHeight: e.target.value / 1
            });
            this.clipImg();
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
    }, {
        key: 'paintImg',
        value: function paintImg(uri) {
            var _this7 = this;

            var originCanvas = this.refs.origin;
            var ctx = originCanvas.getContext('2d');
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

                //设置居中
                var originImgX = (wrapWidth - ctxImgWidth) / 2 + 'px';
                var originImgY = (wrapHeight - ctxImgHeight) / 2 + 'px';
                originCanvas.width = ctxImgWidth;
                originCanvas.height = ctxImgHeight;
                originCanvas.style.left = originImgX;
                originCanvas.style.top = originImgY;
                ctx.drawImage(img, 0, 0, ctxImgWidth, ctxImgHeight);
                var originUri = originCanvas.toDataURL();
                _this7.setState({
                    originUri: originUri,
                    originImgX: originImgX,
                    originImgY: originImgY,
                    originWidth: ctxImgWidth,
                    originHeight: ctxImgHeight
                });
                _this7.clipImg();
            };
        }
    }, {
        key: 'clipImg',
        value: function clipImg() {
            var _state2 = this.state,
                originUri = _state2.originUri,
                originWidth = _state2.originWidth,
                originHeight = _state2.originHeight,
                originImgX = _state2.originImgX,
                originImgY = _state2.originImgY,
                clipBoxX = _state2.clipBoxX,
                clipBoxY = _state2.clipBoxY,
                clipBoxWidth = _state2.clipBoxWidth,
                clipBoxHeight = _state2.clipBoxHeight;

            console.log(originWidth, originHeight, originImgX, originImgY, clipBoxX, clipBoxY, clipBoxWidth, clipBoxHeight);
            var coverCanvas = this.refs.cover;
            coverCanvas.width = originWidth;
            coverCanvas.height = originHeight;
            coverCanvas.style.display = 'block';
            coverCanvas.style.left = originImgX;
            coverCanvas.style.top = originImgY;

            //绘制遮罩层
            var ctx = coverCanvas.getContext('2d');
            ctx.fillStyle = 'rgba(0, 0 , 0, 0.4)';
            ctx.fillRect(0, 0, originWidth, originHeight);
            ctx.clearRect(clipBoxX, clipBoxY, clipBoxWidth, clipBoxHeight

            // //绘制缩放裁剪框的按钮
            // ctx.rect(clipBoxWidth,clipBoxWidth,10,10);
            // ctx.fillStyle = '#000'
            // ctx.fill();
            // ctx.stroke();

            //预览
            );var achieve = this.refs.clipped;
            achieve.style.background = 'url(' + originUri + ')' + -clipBoxX + 'px ' + -clipBoxY + 'px no-repeat';
            achieve.style.width = clipBoxWidth + 'px';
            achieve.style.height = clipBoxHeight + 'px';
        }
    }, {
        key: 'onMouseMove',
        value: function onMouseMove(e) {
            var wrapOffsetLeft = this.refs.imgWrap.offsetLeft;
            var wrapOffsetTop = this.refs.imgWrap.offsetTop;
            var coverCanvas = this.refs.cover;

            var _state3 = this.state,
                dragging = _state3.dragging,
                clipBoxX = _state3.clipBoxX,
                clipBoxY = _state3.clipBoxY,
                clipBoxWidth = _state3.clipBoxWidth,
                clipBoxHeight = _state3.clipBoxHeight,
                _startPos = _state3._startPos,
                _mousePos = _state3._mousePos,
                originWidth = _state3.originWidth,
                originHeight = _state3.originHeight;

            e = e || window.event;
            if (e.pageX == null && e.clientX != null) {
                var doc = document.documentElement,
                    body = document.body;
                e.pageX = e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                e.pageY = e.clientY + (doc && doc.scrollTop || body && body.scrollTop);
            }
            //获取鼠标到背景图片的距离
            _mousePos = {
                left: e.pageX - (wrapOffsetLeft + e.target.offsetLeft),
                top: e.pageY - (wrapOffsetTop + e.target.offsetTop)
            };
            console.log(_mousePos);
            this.setState({
                _mousePos: _mousePos
            }

            //判断鼠标是否在裁剪区域里面
            );if (_mousePos.left > clipBoxX && _mousePos.left < clipBoxX + clipBoxWidth && _mousePos.top > clipBoxY && _mousePos.top < clipBoxY + clipBoxHeight) {
                coverCanvas.style.cursor = 'move';
                if (dragging) {
                    //移动时裁剪区域的坐标 = 上次记录的定位 + (当前鼠标的位置 - 按下鼠标的位置)，裁剪区域不能超出遮罩层的区域;
                    if (this.ex + (_mousePos.left - _startPos.left) < 0) {
                        clipBoxX = 0;
                    } else if (this.ex + (_mousePos.left - _startPos.left) + clipBoxWidth > originWidth) {
                        clipBoxX = originWidth - clipBoxWidth;
                    } else {
                        clipBoxX = this.ex + (_mousePos.left - _startPos.left);
                    }
                    if (this.ey + (_mousePos.top - _startPos.top) < 0) {
                        clipBoxY = 0;
                    } else if (this.ey + (_mousePos.top - _startPos.top) + clipBoxHeight > originHeight) {
                        clipBoxY = originHeight - clipBoxHeight;
                    } else {
                        clipBoxY = this.ey + (_mousePos.top - _startPos.top);
                    }
                    this.setState({
                        clipBoxX: clipBoxX,
                        clipBoxY: clipBoxY
                    });
                    this.clipImg();
                }
            } else {
                coverCanvas.style.cursor = 'auto';
            }
        }
    }, {
        key: 'onMouseDown',
        value: function onMouseDown(e) {
            console.log('down');
            var _state4 = this.state,
                clipBoxX = _state4.clipBoxX,
                clipBoxY = _state4.clipBoxY;

            var wrapOffsetLeft = this.refs.imgWrap.offsetLeft;
            var wrapOffsetTop = this.refs.imgWrap.offsetTop;

            //记录上一次截图的坐标
            this.ex = clipBoxX;
            this.ey = clipBoxY;

            //记录鼠标按下时候的坐标
            var _startPos = {
                left: e.pageX - (wrapOffsetLeft + e.target.offsetLeft),
                top: e.pageY - (wrapOffsetTop + e.target.offsetTop)
            };

            this.setState({
                _startPos: _startPos,
                dragging: true
            });
        }
    }, {
        key: 'onMouseUp',
        value: function onMouseUp(e) {
            this.setState({
                dragging: false
            });
        }
    }]);

    return Clipper;
}(_react2.default.Component);

exports.default = Clipper;