(function (root, define, require, exports, module, factory, undef) {
    'use strict';
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory(require('underscore'), require('backbone'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone'], function (_, Backbone) {
            // Check if we use the AMD branch of Backbone
            _ = _ === undef ? root._ : _;
            Backbone = Backbone === undef ? root.Backbone : Backbone;
            return (root.returnExportsGlobal = factory(_, Backbone, root));
        });
    } else {
        // Browser globals
        root.returnExportsGlobal = factory(root._, root.Backbone);
    }

// Usage:
//
// Note: This plugin is UMD compatible, you can use it in node, amd and vanilla js envs
//
// Vanilla JS:
// <script src="underscore.js"></script>
// <script src="backbone.js"></script>
// <script src="backbone.utils.js"></script>
//
// Node:
// var _ = require('underscore');
// var Backbone = require('backbone');
// var Utils = require('backbone.utils');
// 
//
// AMD:
// define(['underscore', 'backbone', 'backbone.utils'], function (_, Backbone, Utils) {
//    // do stuff with utils
// });

}(this, this.define, this.require, this.exports, this.module, function (_, Backbone, root, undef) {
    'use strict';

    // Build internal utils map
    var Utils = {
        Model: 0,
        Collection: 0,
        View: 0,
        Router: 0
    },
    UtilMap = {
        All: ['!softExtend'],
        Model: ['has', 'is', 'get']
    },
    UtilsInt = {};

    // Backbone.*.softExtend
    // Used on Router, Model, View, Collection
    UtilsInt.softExtend = function (softProps, protoProps, classProps) {
        var extendedObject = this.extend(protoProps, classProps);
        _.each(softProps, _.bind(function (prob) {
            extendedObject.prototype[prob] = _.extend(_.clone(this.prototype[prob]), extendedObject.prototype[prob]);
        }, this));

        return extendedObject;
    };

    // Build up utils map
    _.each(Utils, function (util, name) {
        Utils[name] = function () {};
    });

    // Assign the internal util functions
    _.each(Utils, function (util, name) {
        _.each(UtilsInt, function (func, funcName) {

            if ((UtilMap[name] && _.include(UtilMap[name], funcName)) || _.include(UtilMap.All, funcName) || _.include(UtilMap.All, '!' + funcName)) {
                if (_.include(UtilMap.All, '!' + funcName)) {
                    Backbone[name][funcName] = func;
                } else {
                    Utils[name].prototype[funcName] = func;     
                } 
            }

        });
        Backbone[name] = Backbone[name].extend(Utils[name]);
    });

    return Utils;
}));    