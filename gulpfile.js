var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

gulp.task('styles', function() {
  gulp.src('static/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(minifycss())
    .pipe(gulp.dest('./static/css'));
});

gulp.task('default',function() {
    gulp.watch('static/sass/**/*.scss',['styles']);
});
