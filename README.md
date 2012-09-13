Backbone.Utils
==============

A few nice snippets around backbone that are not big enough to deserve their own plugin

[![Build Status](https://secure.travis-ci.org/asciidisco/Backbone.Utils.png?branch=master)](http://travis-ci.org/asciidisco/Backbone.Utils)

## Installation

The plugin itself implements the Universal Module Definition (UMD).
You can use it with a CommonJS like loader, or with an AMD loader or via
vanilla javascript.

The plugin has two dependencies, underscore.js and backbone.js

### Dowload
You can directly download the
[Development Version](https://raw.github.com/asciidisco/Backbone.Utils/master/backbone.utils.js)
or the
[Production Version](https://raw.github.com/asciidisco/Backbone.Utils/master/backbone.utils.min.js)
from the root folder

### VOLO
```shell
$ volo add Backbone.Utils
```

### BOWER
```shell
$ bower install backbone.utils
```

### JAM
```shell
$ jam install Backbone.Utils
```

### NPM
```shell
$ npm install Backbone.Utils
```

## Integration

### AMD
```javascript
// AMD
require(['underscore', 'backbone', 'path/to/backbone.utils'], function (_, Backbone, Utils) {
  /* Do stuff with Backbone here */
});
```

### CommonJS
```javascript
// CommonJS
var _ = require('underscore');
var Backbone = require('backbone');
var Utils = require('backbone.utils');
```

### Vanilla JS
```html
<!-- Vanilla javascript -->
<script src="path/to/underscore.js"></script>
<script src="path/to/backbone.js"></script>
<script src="path/to/backbone.utils.js"></script>
<script>
	console.log(Backbone.Utils); // Backbone and the Utils property are globals
</script>
```

## Methods

**Soft Extend**
Enables you to extend ressources like object literals,
so you can do now smth. like this:

```javascript
var Parent = Backbone.Model.extend({
	params: {
		foo: 'bar',
		bar: 'foo'
	}
});

var Child = Parent.softExtend(['params'], {
	params: {
		bar: 'I´ve got softly extended',
		baz: 'I´am new!'
	}
});

// State of params in 'Child'
var child = new Child();
console.log(child.params);

// {
//	foo: 'bar',
//	bar: 'I´ve got softly extended',
//	baz: 'I´am new!'
// }
```