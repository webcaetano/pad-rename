var _ = require('lodash');
var del = require('del');
var globby = require('globby');
var path = require('path');
var fs = require('fs');
var test = require('ava');
var tempfile = require('tempfile');

// var self = require('./');

test('should output 3 files', async function(t){
	var tmpFolder = tempfile();
	fs.mkdirSync(tmpFolder);
	fs.mkdirSync(path.join(tmpFolder,'/src'));
	// fs.mkdirSync(path.join(tmpFolder,'/output'));

	_.times(30,function(i){
		fs.writeFileSync(path.join(tmpFolder,'/src/'+_.padStart(i,2,'0')+'.png'),'lulu')
	});

	// await self(path.join(tmpFolder,'/src/*.png'),path.join(tmpFolder,'/output'),3);
	t.is(globby.sync(path.join(tmpFolder,'/src/*')).length,30);
	t.pass();
	// del.sync('./test/output/*');
});



