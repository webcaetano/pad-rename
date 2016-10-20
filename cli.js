#!/usr/bin/env node
'use strict';
var meow = require('meow');
var _ = require('lodash');
var self = require('./');

var cli = meow([
	'Usage',
		'$ foo <input>',
	'',
	'Options',
		'--rainbow, -r  Include a rainbow',
	'',
	'Examples',
		'$ foo unicorns --rainbow'
], {
	string: ['_']
});


var defaults = {
}

var options = _.extend({},defaults,{
	rename: cli.flags.rename,
	parents: cli.flags.parents,
})


var size = cli.input.pop();
var dest = cli.input.pop();

self(cli.input,dest,size,options);
