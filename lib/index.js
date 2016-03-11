'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('swiper/dist/js/swiper.min');

require('swiper/dist/css/swiper.min.css');

var _styleCss = require('./style.css');

var _styleCss2 = _interopRequireDefault(_styleCss);

var SwipePager = (function (_Component) {
  _inherits(SwipePager, _Component);

  function SwipePager() {
    _classCallCheck(this, SwipePager);

    _get(Object.getPrototypeOf(SwipePager.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(SwipePager, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._swiper.destroy();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this._swiper) this._swiper.destroy();
      // TODO: better lifecycle
      if (this.props.children.length) {
        this._swiper = new Swiper('.swiper-container', _extends({
          pagination: '.swiper-pagination',
          scrollbar: '.swiper-scrollbar'
        }, this.props));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

      var children = _ref.children;
      var onLayout = _ref.onLayout;
      var rows = _ref.rows;
      var cols = _ref.cols;

      var props = _objectWithoutProperties(_ref, ['children', 'onLayout', 'rows', 'cols']);

      if (onLayout) props.ref = onLayout;

      return _react2['default'].createElement(
        'div',
        props,
        children.length ? _react2['default'].createElement(
          'div',
          { className: 'swiper-container' },
          _react2['default'].createElement(
            'div',
            { className: 'swiper-wrapper' },
            group(children, cols * rows, cols).map(function (slides) {
              return _react2['default'].createElement(
                'div',
                { className: 'swiper-slide ' + _styleCss2['default'].slide },
                slides.map(function (row) {
                  return _react2['default'].createElement(
                    'div',
                    { className: _styleCss2['default'].row },
                    row
                  );
                })
              );
            })
          ),
          _react2['default'].createElement('div', { className: 'swiper-pagination' }),
          _react2['default'].createElement('div', { className: 'swiper-scrollbar' })
        ) : children
      );
    }
  }]);

  return SwipePager;
})(_react.Component);

exports.SwipePager = SwipePager;

var AutoPager = (function (_Component2) {
  _inherits(AutoPager, _Component2);

  function AutoPager(props) {
    var _this = this;

    _classCallCheck(this, AutoPager);

    _get(Object.getPrototypeOf(AutoPager.prototype), 'constructor', this).apply(this, arguments);
    var w, h;
    this.state = {};
    this.__onLayout = function (e) {
      if (!e) return;

      _this.setState({
        cols: Math.floor(e.clientWidth / w),
        rows: Math.floor(e.clientHeight / h)
      });
    };

    this.__onItemLayout = function (e) {
      if (!e) return;
      w = e.offsetWidth;
      h = e.offsetHeight;
    };
  }

  _createClass(AutoPager, [{
    key: 'render',
    value: function render() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

      var _props = props = _extends({}, this.state, props);

      var cols = _props.cols;
      var children = _props.children;

      if (cols) return _react2['default'].createElement(SwipePager, props);
      props.onLayout = this.__onLayout;

      return _react2['default'].createElement(
        SwipePager,
        props,
        _react2['default'].createElement(
          'div',
          { ref: this.__onItemLayout,
            className: _styleCss2['default'].item },
          children[0]
        )
      );
    }
  }]);

  return AutoPager;
})(_react.Component);

exports['default'] = AutoPager;

function group(array, n) {
  var i = 0;var result = [];
  var length = array.length;

  for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    rest[_key - 2] = arguments[_key];
  }

  while (i < length) {
    var g = array.slice(i, i += n);
    if (rest.length) g = group.apply(undefined, [g].concat(rest));
    result.push(g);
  }
  return result;
}