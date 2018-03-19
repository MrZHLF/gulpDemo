var gulp = require('gulp');
var lessc = require('gulp-less');
var cleancss = require('gulp-clean-css');
var uglyfly = require('gulp-uglyfly');
var connect = require('gulp-connect');
var htmlmin = require('gulp-htmlmin');

//获取文件流
gulp.task('less',function(){
	
	return gulp.src('./src/less/*.less')
	.pipe(lessc())
	.pipe(cleancss())
	.pipe(gulp.dest('./src/css/'))
	.pipe(connect.reload());
});

//压缩js文件

gulp.task('script',function(){
	return gulp.src('./src/scripts/*.js')
	.pipe(uglyfly())  //压缩js文件
	.pipe(gulp.dest('./src/js/'))
	.pipe(connect.reload());
});

//压缩html文件
gulp.task('html',function(){
	return gulp.src('./src/htmls/*.html')
	.pipe(htmlmin({collapseWhitespace: true}))  //压缩html文件
	.pipe(gulp.dest('./src/'))
	.pipe(connect.reload()); //刷新界面
});

//服务器开启

gulp.task('serve',['html','less','script'],function(){
	connect.server({
		root:'./src',
		livereload: true
	});
	
//	自动加载
		gulp.watch('./src/htmls/*.html',['html']);
		gulp.watch('./src/less/*.less',['less']);
		gulp.watch('./src/scripts/*.js',['script']);

});
gulp.task('default',['serve']);
