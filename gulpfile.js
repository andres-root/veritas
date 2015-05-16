'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
	gulp.src('content/sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('content/css'));
})

gulp.task('sass:watch', function() {
	gulp.watch('content/sass/**/*.sass', ['sass'])
});