/*! Backbone.Utils - v0.1.0
------------------------------
Build @ 2012-05-21
Documentation and Full License Available at:
http://asciidisco.github.com/Backbone.Utils/index.html
git://github.com/asciidisco/Backbone.Utils.git
Copyright (c) 2012 function () {

// If the string looks like an identifier, then we can return it as is.
// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can simply slap some quotes around it.
// Otherwise we must also replace the offending characters with safe
// sequences.

            if (ix.test(this)) {
                return this;
            }
            if (nx.test(this)) {
                return '"' + this.replace(nxg, function (a) {
                    var c = escapes[a];
                    if (c) {
                        return c;
                    }
                    return '\\u' + ('0000' + a.charCodeAt().toString(16)).slice(-4);
                }) + '"';
            }
            return '"' + this + '"';
        } <>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the

Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.*/

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