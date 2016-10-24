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
		_.times(5,function(i){
			fs.writeFileSync(path.join(tmpFolder,'/'+val+'/Lulu'+_.capitalize(val)+'1_N_'+_.padStart(i+1000,5,'0')+'.png'),'Yup, that tasted purple');
		});
	})

	self(path.join(tmpFolder,'/**'),function(err,data){
		t.is(err,null);
		t.pass();
	})

});



