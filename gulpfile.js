var gulp = require('gulp');
var plumber = require('gulp-plumber');
var scss = require('gulp-sass');
var minify     = require('gulp-minify-css');
var rename     = require('gulp-rename');
var browserSync = require('browser-sync').create();

var config = {
  dirBower: './assets/libs/',
  dirScss: './assets/scss/',
  dirCss: './assets/css/'
};

gulp.task('scss', function () {
  gulp.src(config.dirScss + '**/*.scss')
    .pipe(plumber())
    .pipe(scss({
      includePaths: [
        config.dirBower + 'bootstrap-sass/assets/stylesheets',
      ]
    }))
    .pipe(scss.sync().on('error', scss.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(minify({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.dirCss))
    // .pipe(browserSync.stream());
});

gulp.task('serve', ['scss'], function() {
  browserSync.init({
    proxy: "http://localhost:2368"
  });

  gulp.watch(config.dirScss + '**/*.scss', ['scss']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
