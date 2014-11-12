'use strict';
module.exports = function() {
  var url = require('url');
  var murl = require('murl');

  var delegoat = {
    uses: [],
    posts: [],
    gets: [],
    puts: [],
    deletes: [],
    _bindHandler: function(method, route, fn) {
      this[method + 's'].push({
        route: route,
        fn: fn
      });
    },
    post: function(route, fn) {
      this._bindHandler('post', route, fn);
    },
    get: function(route, fn) {
      this._bindHandler('get', route, fn);
    },
    put: function(route, fn) {
      this._bindHandler('put', route, fn);
    },
    delete: function(route, fn) {
      this._bindHandler('delete', route, fn);
    },
    use: function(fn) {
      this.uses.push(fn);
    },
    handleIt: function(data) {
      var method = data.method.toLowerCase();
      var methods = method + 's';
      var parsedUri = url.parse(data.uri, true);
      var request = {
        // TODO: headers: {},
        // TODO: hashes: {},
        parameters: {},
        query: {},
        body: {}
      };
      var index = 0;
      var routePattern;
      var routeHandler;
      var murlPattern;
      var urlParameters;

      for (index; index < this[methods].length; index++) {
        routeHandler = this[methods][index];
        routePattern = routeHandler.route;

        murlPattern = murl(routePattern);
        urlParameters = murlPattern(parsedUri.pathname);

        if (!!urlParameters) {

          request.parameters = urlParameters;

          if (!!parsedUri.query) {
            request.query = parsedUri.query;
          }

          if (!!data.body) {
            request.body = data.body;
          }

          // apply middleware
          var fn = 0;
          for (fn; fn < this.uses.length; fn++) {
            request = this.uses[fn](request);
          }

          return routeHandler.fn(request);
        }
      }

      return (function() {
        throw new Error('NO HANDLER FOUND FOR: ' + method + ' ' + data.uri);
      })();
    }
  };

  return delegoat;
}();
