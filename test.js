var _ = require('lodash');
var del = require('del');
var glob = require('glob');
var path = require('path');
var fs = require('fs');
var test = require('ava');
var tempfile = require('tempfile');

var self = require('./');

test('should output renamed pad files', async function(t){
	var tmpFolder = tempfile();
	fs.mkdirSync(tmpFolder);

	_.each([
		'atk',
		'run',
		'die',
	],function(val){
		fs.mkdirSync(path.join(tmpFolder,'/'+val));
		_.times(3,function(i){
			fs.writeFileSync(path.join(tmpFolder,'/'+val+'/Lulu'+_.capitalize(val)+'1_N_'+_.padStart(i+1000,5,'0')+'.png'),'Yup, that tasted purple');
		});
	})

	self(path.join(tmpFolder,'/**'),function(err,data){
		// console.log(glob.sync(path.join(tmpFolder,'/**')));
		t.is(err,null);
		t.pass();
	})

});

test('should output renamed pad files with prefix and sufix', async function(t){
	var tmpFolder = tempfile();
	fs.mkdirSync(tmpFolder);

	_.each([
		'atk',
		'run',
		'die',
	],function(val){
		fs.mkdirSync(path.join(tmpFolder,'/'+val));
		_.times(3,function(i){
			fs.writeFileSync(path.join(tmpFolder,'/'+val+'/Lulu'+_.capitalize(val)+'1_N_'+_.padStart(i+1000,5,'0')+'.png'),'Yup, that tasted purple');
		});
	})

	self(path.join(tmpFolder,'/**'),function(err,data){
		// console.log(glob.sync(path.join(tmpFolder,'/**')));
		t.is(err,null);
		t.pass();
	},{
		prefix:'lulu_',
		sufix:'_purple',
	})
});

test('should output renamed pad files with options as second parameter', async function(t){
	var tmpFolder = tempfile();
	fs.mkdirSync(tmpFolder);

	_.each([
		'atk',
		'run',
		'die',
	],function(val){
		fs.mkdirSync(path.join(tmpFolder,'/'+val));
		_.times(3,function(i){
			fs.writeFileSync(path.join(tmpFolder,'/'+val+'/Lulu'+_.capitalize(val)+'1_N_'+_.padStart(i+1000,5,'0')+'.png'),'Yup, that tasted purple');
		});
	})

	self(path.join(tmpFolder,'/**'),{
		prefix:'lulu_',
		sufix:'_purple',
		start:0,
		length:5,
		val:'o',
	},function(err,data){
		console.log(glob.sync(path.join(tmpFolder,'/**')));
		t.is(err,null);
		t.pass();
	})
});
