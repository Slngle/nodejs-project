//gulpfile.js
var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    minifyCss = require("gulp-minify-css"),
    jshint = require("gulp-jshint"),
    concat = require("gulp-concat"),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    px2rem = require('gulp-px3rem'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    htmlInjector = require("bs-html-injector"),
    exec = require('child_process').exec,
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    webpackCompiler = webpack(webpackConfig),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    base64 = require('gulp-base64');



gulp.task('clean', function() {
  del(['build/*.js'],{force: true});
});

gulp.task('imagemin',function () {
    return gulp.src('./src/img/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('build/img'));
});

gulp.task('scripts', ['webpack'], function() {
  gulp.src('./build/*.debug.js')
      .pipe(concat('index.debug.js'))
      .pipe(gulp.dest('./build'))
      .pipe(uglify())
      .pipe(rename(function(path){
        path.basename = path.basename.replace('.debug','')
      }))
      .pipe(gulp.dest('./build'))
});

gulp.task('style',['imagemin'],function() {
   return sass('./src/css/index.scss')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })

        .pipe(base64({
            baseDir: 'build',
            extensions: ['svg', 'png', /\.jpg#datauri$/i],
            exclude:    [/\.server\.(com|net)\/dynamic\/ /, '--live.jpg'],
            maxImageSize: 10*1024, // bytes 
            debug: true
        }))
      .pipe(concat('index.debug.css'))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('./build'))
      .pipe(minifyCss())
      .pipe(rename(function(path){
        path.basename = path.basename.replace('.debug','')
      }))
      .pipe(gulp.dest('./build'))
});

gulp.task('webpack', function(callback) {
  webpackCompiler.run(function(err, stats){
    if (err) throw new gutil.PluginError('[webpack]', err);
    gutil.log('[webpack]', stats.toString({ colors: true }));
    callback();
  });
});

// browser-sync
gulp.task('browser-sync', function() {
    browserSync.use(htmlInjector, {
        files: "demo/*.html"
    });
    browserSync({
        server: {
            baseDir: "./",
            index: "/demo/index.html"
        },
        https: false
    });
    gulp.watch(['build/**/*']).on('change', function(file) {
        reload(file.path);
    });
});

gulp.task('default', ['clean', 'scripts', 'style']);

gulp.task('watch', function() {
  gulp.watch(['./src/js/**/*.js','./src/js/**/**/*.js'], ['scripts','style']);
  gulp.watch(['./src/css/**/*.scss','./src/js/**/**/*.scss'], ['scripts','style']);
});

// start
gulp.task('start',['default','browser-sync','watch']);

module.exports = gulp;
