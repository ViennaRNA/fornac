// generated on 2016-01-26 using generator-gulp-webapp 1.1.1
require('es6-promise').polyfill();

//import browserify from 'gulp-browserify';
//import webpack from 'gulp-webpack';
var webpack = require('webpack-stream');
import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.css')
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

var lint = (files, options) => {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', gulp.parallel('styles', 'scripts', () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.debug())
    //.pipe($.if('*.js', $.uglify().on('error', gulpUtil.log)))
    //.pipe($.if('*.css', $.cssnano().on('error', gulpUtil.log)))
    //.pipe($.if('*.html', $.htmlmin({collapseWhitespace: true}).on('error', gulpUtil.log)))
    .pipe(gulp.dest('dist'));
}));

gulp.task('buildJs', gulp.parallel('styles', 'scripts', () => {
    return gulp.src(['.tmp/scripts/*.js'])
    //.pipe($.uglify())
    .pipe(gulp.dest('dist/scripts').on('error', gulpUtil.log))
}));

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', (done) => {
    del.bind(null, ['.tmp', 'dist'])
    done()
});

gulp.task('serve', gulp.series('styles', 'scripts', 'fonts', function watch() {
  browserSync({
    notify: false,
    port: 9000,
    open: false,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/styles/*.css',
    '.tmp/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.css', gulp.parallel('styles'));
  gulp.watch('app/scripts/**/*.js', gulp.parallel('scripts'));
  gulp.watch('app/fonts/**/*', gulp.parallel('fonts'));
  gulp.watch('bower.json', gulp.parallel('wiredep', 'fonts'));

  gulp.watch('app/scripts/**/*.js', gulp.parallel('test'));
  gulp.watch('test/**/*.js', gulp.parallel('test'));
}));

// inject bower components
gulp.task('wiredep', () => {
  return gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', gulp.series('html', 'buildJs', 'images', 'fonts', 'extras', function dist() {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
}));

gulp.task('default', gulp.series('clean', 'build'));

gulp.task('test', gulp.series('scripts', () => {
    gulp.src('test/**/*.js')
    .pipe($.jasmine());
}));

gulp.task('test-serve', gulp.series('test', () => {
    gulp.watch(['app/scripts/**/*.js', 'test/**/*.js'], gulp.parallel('test'));
}));
