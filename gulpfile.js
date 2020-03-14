'use strict';

const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minify = require('gulp-csso');

const pug = require('gulp-pug');
const prettier = require('gulp-pretty-html');

const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');

const server = require('browser-sync').create();

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp.src([
    'src/fonts/**/*.{woff,woff2}',
    'src/img/**/*.{png,jpg,svg}'
  ], {
    base: 'src'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('style', function () {
  return gulp.src('src/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('images', function () {
  return gulp.src([
    'src/img/**/*.{png,jpg,svg}',
    '!src/img/sprite/*.svg'
  ])
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('sprite', function () {
  return gulp.src('src/img/sprite/*.svg')
    .pipe(imagemin([imagemin.svgo()]))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('scripts', function () {
  return browserify({
    entries: 'src/js/script.js'
    })
    .transform(babelify, {presets: ['@babel/env']})
    .bundle()
    .pipe(source('script.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
});

gulp.task('html', function () {
  return gulp.src('src/pug/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(prettier())
    .pipe(gulp.dest('build'));
});

gulp.task('serve', function () {
  server.init({
    server: 'build/'
  });

  gulp.watch('src/**/*.svg', gulp.series('sprite', 'images'));
  gulp.watch('src/**/*.scss', gulp.series('style'));
  gulp.watch('src/**/*.pug', gulp.series('html', 'refresh'));
  gulp.watch('src/**/*.js', gulp.series('scripts', 'refresh'));
});

gulp.task('build', gulp.series('clean', 'copy', 'style', 'images', 'scripts', 'sprite', 'html'));
gulp.task('start', gulp.series('build', 'serve'));
