var path = require('path');
var fs = require('fs');
var glob = require('glob');
var async = require('async');
var _ = require('lodash');
var naturalSort = require('node-natural-sort');

// insert defaults here
var defaults = {
	start:1,
	length:3,
	sufix:'',
	prefix:'',
	val:'0'
}

var self = function(src, options, done){
	if(typeof options==='function') {
		var tmpVar = options;
		options = done ? done : {};
		done = tmpVar;
	}
	options = _.extend({},defaults,options);

	async.auto({
		files:function(callback){
			glob(src,{nodir:true},callback);
		},
		folders:['files',function(results,callback){
			var folders = _.reduce(results.files,function(folders,file){
				var folderName = path.dirname(file)
				if(!folders[path.dirname(file)]){
					folders[path.dirname(file)] = [];
				}

				folders[path.dirname(file)].push(file);

				return folders;
			},{});

			callback(null,folders);
		}],
		rename:['folders',function(results,callback){
			var folders = results.folders;
			var run = [];

			_.each(folders,function(folder,i){
				_.each(folder.sort(naturalSort()),function(file,k){
					var data = path.parse(file);
					var newName = path.format({
						dir:data.dir,
						name:options.prefix+_.padStart(options.start+k,options.length,options.val)+options.sufix,
						ext:data.ext,
					});

					run.push(function(callback){
						fs.rename(file,newName,callback);
					})
				})
			})

			async.parallel(run,callback);
		}]
	},function(err,results){
		if(done) done(err,results);
	})
}

module.exports = self;
