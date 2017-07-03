const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const clean = require('gulp-clean');

gulp.task('build',['clear'],function(){
    gulp.src('./src/**/*.js')
        .pipe(concat('ngLeaflet.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(concat('ngLeaflet.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clear',function(){
    return gulp.src('./dist')
        .pipe(clean());
});




