/**
 * Primitive gulp stylus-only realiztion. TODO copy from fluorine repo and create build alghorytm
 */

const gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require("gulp-rename"),
	del = require('del'),
	concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),
	cssmin = require('gulp-cssmin');

const paths = {
	src: __dirname + '/public',
	build: __dirname + '/public'
};

gulp.task('stylus', ['clean'], function() {
	return gulp.src(paths.src + '/**/*.styl')
		.pipe(stylus({compress: false}))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(concatCss('styles.css'))
		.pipe(cssmin())
		.pipe(gulp.dest(paths.build))
});

gulp.task('clean', function() {
	return del([paths.src + '/styles.css']);
});

gulp.task('watch', ['stylus'], function() {
	gulp.watch([paths.src + '/**/*.styl', paths.src + '/*.styl'], ['stylus']);
});
