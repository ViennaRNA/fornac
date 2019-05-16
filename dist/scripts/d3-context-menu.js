"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contextMenu = contextMenu;

require("../styles/d3-context-menu.css");

var _d = require("d3");

var _d2 = _interopRequireDefault(_d);

var _slugid = require("slugid");

var _slugid2 = _interopRequireDefault(_slugid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function contextMenu(menu, opts) {
  var previouslyMouseUp = false;

  var clickAway = function clickAway() {};

  var uid = _slugid2.default.nice();

  var rootElement = null;
  var orientation = 'right'; // display the menu to the right of the mouse click
  // or parent elemement

  var initialPos = null;
  var parentStart = null;
  var openCallback, closeCallback;

  if (typeof opts === 'function') {
    openCallback = opts;
  } else {
    opts = opts || {};
    openCallback = opts.onOpen;
    closeCallback = opts.onClose;
  }

  if ('rootElement' in opts) rootElement = opts['rootElement'];

  if ('pos' in opts) {
    // do we want to place this menu somewhere specific?
    initialPos = opts.pos;
  }

  if ('orientation' in opts) {
    orientation = opts.orientation;
  }

  if ('parentStart' in opts) {
    parentStart = opts.parentStart;
  } // create the div element that will hold the context menu


  _d2.default.selectAll('.d3-context-menu-' + uid).data([1]).enter().append('div').classed('d3-context-menu', true).classed('d3-context-menu-' + uid, true); // close menu


  _d2.default.select('body').on('click.d3-context-menu-' + uid, function () {
    if (previouslyMouseUp) {
      previouslyMouseUp = false;
      return;
    }

    console.log('body click close');

    _d2.default.select('.d3-context-menu-' + uid).style('display', 'none');

    orientation = 'right';

    if (closeCallback) {
      closeCallback();
    }
  }); // this gets executed when a contextmenu event occurs


  return function (data, index) {
    var pMouseUp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var clickAwayFunc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
    var elm = this;
    var contextMenuPos = null;
    var mousePos = null;
    var currentThis = this;
    if (rootElement == null) mousePos = _d2.default.mouse(this);else mousePos = _d2.default.mouse(rootElement); // for recursive menus, we need the mouse
    // position relative to another element

    clickAway = clickAwayFunc;
    var openChildMenuUid = null;
    previouslyMouseUp = pMouseUp;

    _d2.default.selectAll('.d3-context-menu-' + uid).html('');

    var list = _d2.default.selectAll('.d3-context-menu-' + uid).on('contextmenu', function (d) {
      console.log('context-menu close');

      _d2.default.select('.d3-context-menu-' + uid).style('display', 'none');

      orientation = 'right';

      _d2.default.event.preventDefault();

      _d2.default.event.stopPropagation();
    }).append('ul');

    list.selectAll('li').data(typeof menu === 'function' ? menu(data) : menu).enter().append('li').attr('class', function (d) {
      console.log('d:', d);
      var ret = '';

      if (d.divider) {
        ret += ' is-divider';
      }

      if (d.disabled) {
        ret += ' is-disabled';
      }

      if (!d.action) {
        ret += ' is-header';
      }

      if ('children' in d) {
        ret += ' d3-context-menu-recursive';
      }

      return ret;
    }).html(function (d) {
      if (d.divider) {
        return '<hr>';
      }

      if (!d.title) {
        console.error('No title attribute set. Check the spelling of your options.');
      }

      return typeof d.title === 'string' ? d.title : d.title(data);
    }).on('click', function (d, i) {
      if (d.disabled) return; // do nothing if disabled

      if (!d.action) return; // headers have no "action"

      d.action(elm, data, index, mousePos);
      console.log('click close'); // close all context menus

      _d2.default.selectAll('.d3-context-menu').style('display', 'none');

      orientation = 'right';

      if (closeCallback) {
        closeCallback();
      }
    }).on('mouseenter', function (d, i) {
      _d2.default.select(this).classed('d3-context-menu-selected', true);

      if (openChildMenuUid != null) {
        // there's a child menu open
        // unselect all items
        _d2.default.select('.d3-context-menu-' + uid).selectAll('li').classed('d3-context-menu-selected', false);

        if (typeof d.children == 'undefined') {
          console.log("no children close"); // no children, so hide any open child menus

          _d2.default.select('.d3-context-menu-' + openChildMenuUid).style('display', 'none');

          openChildMenuUid = null;
          return;
        }

        if (d.childUid == openChildMenuUid) {
          // the correct child menu is already open
          return;
        } else {
          // need to open a different child menu
          console.log('open different child menu close'); // close the already open one

          _d2.default.select('.d3-context-menu-' + openChildMenuUid).style('display', 'none');

          openChildMenuUid = null;
        }
      } // there should be no menu open right now


      if (typeof d.children != 'undefined') {
        var _boundingRect = this.getBoundingClientRect();

        var childrenContextMenu = null;

        if (orientation == 'left') {
          childrenContextMenu = contextMenu(d.children, {
            'rootElement': currentThis,
            'pos': [_boundingRect.left + window.pageXOffset, _boundingRect.top - 2 + window.pageYOffset],
            'orientation': 'left'
          });
        } else {
          childrenContextMenu = contextMenu(d.children, {
            'pos': [_boundingRect.left + _boundingRect.width + window.pageXOffset, _boundingRect.top - 2 + window.pageYOffset],
            'rootElement': currentThis,
            'parentStart': [_boundingRect.left + window.pageXOffset, _boundingRect.top - 2 + window.pageYOffset]
          });
        }

        d.childUid = childrenContextMenu.apply(this, [data, i, true, function () {}]);
        openChildMenuUid = d.childUid;
      }

      _d2.default.select(this).classed('d3-context-menu-selected', true);
    }).on('mouseleave', function (d, i) {
      if (openChildMenuUid == null) {
        _d2.default.select(this).classed('d3-context-menu-selected', false);
      }
    });
    list.selectAll('.d3-context-menu-recursive').append('img').attr('src', 'images/play.svg').attr('width', '14px').attr('height', '14px').style('position', 'absolute').style('right', '5px'); // the openCallback allows an action to fire before the menu is displayed
    // an example usage would be closing a tooltip

    if (openCallback) {
      if (openCallback(data, index) === false) {
        return uid;
      }
    }

    var contextMenuSelection = _d2.default.select('.d3-context-menu-' + uid).style('display', 'block');

    if (initialPos == null) {
      _d2.default.select('.d3-context-menu-' + uid).style('left', _d2.default.event.pageX - 2 + 'px').style('top', _d2.default.event.pageY - 2 + 'px');
    } else {
      _d2.default.select('.d3-context-menu-' + uid).style('left', initialPos[0] + 'px').style('top', initialPos[1] + 'px');
    } // check if the menu disappears off the side of the window


    var boundingRect = contextMenuSelection.node().getBoundingClientRect();

    if (boundingRect.left + boundingRect.width > window.innerWidth || orientation == 'left') {
      orientation = 'left'; // menu goes of the end of the window, position it the other way

      if (initialPos == null) {
        // place the menu where the user clicked
        _d2.default.select('.d3-context-menu-' + uid).style('left', _d2.default.event.pageX - 2 - boundingRect.width + 'px').style('top', _d2.default.event.pageY - 2 + 'px');
      } else {
        if (parentStart != null) {
          _d2.default.select('.d3-context-menu-' + uid).style('left', parentStart[0] - boundingRect.width + 'px').style('top', parentStart[1] + 'px');
        } else {
          _d2.default.select('.d3-context-menu-' + uid).style('left', initialPos[0] - boundingRect.width + 'px').style('top', initialPos[1] + 'px');
        }
      }
    } // display context menu


    if (previouslyMouseUp) return uid;

    _d2.default.event.preventDefault();

    _d2.default.event.stopPropagation(); //d3.event.stopImmediatePropagation();
    //


    return uid;
  };
}

;
//# sourceMappingURL=d3-context-menu.js.map
