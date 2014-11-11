(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app, easeInOutCubic, easeInOutQuart, easeOutCubic, easeOutQuad, imgList, pushNav;

imgList = require('./modules/img-list');

pushNav = require('./modules/push-nav');

app = angular.module('mainApp', ['duScroll', 'imgList', 'pushNav']);

easeOutQuad = function(t) {
  return t * (2 - t);
};

easeOutCubic = function(t) {
  return (--t) * t * t + 1;
};

easeInOutCubic = function(t) {
  if (t < .5) {
    return 4 * t * t * t;
  } else {
    return (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
};

easeInOutQuart = function(t) {
  if (t < .5) {
    return 8 * t * t * t * t;
  } else {
    return 1 - 8 * (--t) * t * t * t;
  }
};

app.value('duScrollDuration', 1000);

app.value('duScrollEasing', easeOutQuad);

module.exports = app;


},{"./modules/img-list":3,"./modules/push-nav":5}],2:[function(require,module,exports){
module.exports = [
  '$timeout', function($timeout) {
    var directive;
    return directive = {
      restrict: 'A',
      link: function($scope, el, attrs) {
        var fadeInImage, imgLoad, loadComplete;
        fadeInImage = function(img, delay) {
          return $timeout(function() {
            return img.className += ' is-visible';
          }, delay);
        };
        loadComplete = function() {
          var i, images, img, _i, _len, _results;
          images = el.find('img');
          _results = [];
          for (i = _i = 0, _len = images.length; _i < _len; i = ++_i) {
            img = images[i];
            _results.push(fadeInImage(img, i * 20));
          }
          return _results;
        };
        imgLoad = imagesLoaded(el);
        return imgLoad.on('always', loadComplete);
      }
    };
  }
];


},{}],3:[function(require,module,exports){
var imgListDirective;

imgListDirective = require('./directives/img-list');

angular.module('imgList.directives', []).directive('imgList', imgListDirective);

angular.module('imgList', ['imgList.directives']);


},{"./directives/img-list":2}],4:[function(require,module,exports){
module.exports = [
  'state', function(state) {
    var directive;
    return directive = {
      restrict: 'A',
      link: function($scope, el, attrs) {
        var clickHandler, method, methods, toggle;
        clickHandler = void 0;
        method = attrs.pushNav;
        toggle = function() {
          return el.toggleClass('is-pushed', state.isPushed());
        };
        $scope.$on('pushnav:changed', function() {
          return toggle();
        });
        $scope.$on('destroy', function() {
          if (clickHandler) {
            return clickHandler();
          }
        });
        if (method) {
          methods = {
            open: function() {
              return state.set(true);
            },
            close: function() {
              return state.set(false);
            },
            toggle: function() {
              return state.toggle();
            }
          };
          clickHandler = el.bind('click', function() {
            if (methods[method]) {
              return methods[method]();
            } else {
              return methods.toggle();
            }
          });
        }
        return toggle();
      }
    };
  }
];


},{}],5:[function(require,module,exports){
var pushNavDirective, pushStateServce;

pushNavDirective = require('./directives/push-nav');

pushStateServce = require('./services/push-state');

angular.module('pushNav.directives', ['pushNav.services']).directive('pushNav', pushNavDirective);

angular.module('pushNav.services', []).service('state', pushStateServce);

angular.module('pushNav', ['pushNav.directives', 'pushNav.services']);


},{"./directives/push-nav":4,"./services/push-state":6}],6:[function(require,module,exports){
module.exports = [
  '$rootScope', function($rootScope) {
    var API, isPushed;
    isPushed = false;
    API = {
      set: function(bool) {
        isPushed = bool ? true : false;
        return $rootScope.$broadcast('pushnav:changed', isPushed);
      },
      toggle: function() {
        isPushed = isPushed ? false : true;
        return $rootScope.$broadcast('pushnav:changed', isPushed);
      },
      isPushed: function() {
        return isPushed;
      }
    };
    $rootScope.$on('routeChangeStart', function() {
      return API.set(false);
    });
    return API;
  }
];


},{}]},{},[1])