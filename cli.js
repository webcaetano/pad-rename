#!/usr/bin/env node
'use strict';
var meow = require('meow');
var _ = require('lodash');
var self = require('./');

var cli = meow([
	'Usage',
		'$ rpad <glob>',
	'',
	'Options',
		'--start inital pad start. Default: 1',
		'--length the padding length. Default: 3',
		'--val string used as padding. Default: "0"',
		'--prefix string used as prefix. Default: ""',
		'--sufix string used as sufix. Default: ""',
	'',
	'Examples',
		'rpad "**/*.png"',
		'rpad "**/*.png" --start 0 --length 5 --val "0" --prefix "img_" --sufix "_end"',
], {
	string: ['_']
});


var defaults = {
}

var options = _.extend({},defaults,{
	start: cli.flags.start,
	length: cli.flags.length,
	sufix: cli.flags.sufix,
	prefix: cli.flags.prefix,
	val: cli.flags.val,
})

options = _.omitBy(options,_.isUndefined);


var glob = _.first(cli.input);

// console.log(glob,options)
self(glob,options);
