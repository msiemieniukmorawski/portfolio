var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');




gulp.task('default', function(){
	console.log('witaj swiecie');
});

gulp.task('sass', function(){
	return gulp.src('./src/scss/main.scss')
		.pipe(sass({
				"errLogToConsole":true
			}).on('error', sass.logError)
		)
		.pipe(autoprefixer({
			 browsers: ['last 4 versions']
		}))
		.pipe(cssnano())
		.pipe(rename({
				extname:".min.css"
			})
		)
		.pipe(gulp.dest('./dist/css'));
});


gulp.task('copy:html', function(){
	return gulp.src('./src/*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy:js', function(){
	return gulp.src('./src/js/*.js')
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('watch',['browserSync'], function(){
	gulp.watch('./src/scss/*.scss', ['sass', browserSync.reload]);
	gulp.watch('./src/*.html', ['copy:html', browserSync.reload]);
	gulp.watch('./src/js/*.js', ['copy:js', browserSync.reload]);
});

gulp.task('clean', function(){
	del(['./dist/css', './dist/index.html', './js']);
});

gulp.task('browserSync', function(){
	browserSync({
		server:{ 
			baseDir:'./dist'
		}
	});
});

gulp.task('build', function(done){
	return runSequence (
		[
			'clean'
		],
		[
			'sass',
			'copy:html',
			'copy:js'
		],
		done
	);
});