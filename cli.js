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
	'',
	'Examples',
		'rpad "**/*.png"',
		'rpad "**/*.png" --start 0 --length 5 --val "0"',
], {
	string: ['_']
});


var defaults = {
}

var options = _.extend({},defaults,{
	start: cli.flags.start,
	length: cli.flags.length,
	val: cli.flags.val,
})

options = _.omitBy(options,_.isUndefined);


var glob = _.first(cli.input);

// console.log(glob,options)
self(glob,options);
