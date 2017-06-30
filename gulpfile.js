var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var del = require('del');
var utilities = require('gulp-util');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var lib = require('bower-files')({
  "overrides": {
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});
var buildProduction = utilities.env.production;

// Concat task
gulp.task('concatInterface', function(){
  return gulp.src(['./js/*-interface.js'])
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'));
});

// Browseify task
gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({entries: ['./tmp/allConcat.js']} )
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js'));
});

 // Minification task
 gulp.task('minifyScripts', ['jsBrowserify'], function() {
   return gulp.src('./build/js/app.js')
   .pipe(uglify())
   .pipe(gulp.dest('./build/js'));
 });

 // Clean task
gulp.task('clean', function() {
  return del(['./build', './tmp']);
});

// Build task
gulp.task('build', function() {
  if(buildProduction) {
    gulp.start('minifyScripts');
  } else {
    gulp.start('jsBrowserify');
  }
  gulp.start('bower');
});

// Jshint task
gulp.task('jshint', function() {
  return gulp.src('./js/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Bower section
// BowerJSS task
gulp.task('bowerJSS', function() {
  return gulp.src(lib.ext('js').files)
  .pipe(concat('vendor.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./build/js'));
});

// BowerCSS task
gulp.task('bowerCSS', function() {
  return gulp.src(lib.ext('css').files)
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('./build/css'));
});

// Combination of Bower tasks
gulp.task('bower', ['bowerJSS', 'bowerCSS']);

// Server begins here
// Server task
gulp.task('server', function() {
  browserSync.init({ // browserSync initialized and launches the local server
     server: {
       baseDir: "./", // The directory where the local server will be launched from
       index: "index.html" // The entry point where we want to start our app
     }
  });
  gulp.watch(['js/*.js'], ['jsBuild']); // We are watching the js files and if they change, jsBuild is run
  gulp.watch(['bower.json'], ['bowerBuild']); // Bower files are watched for changes
  gulp.watch(['*.html'], ['htmlBuild']); // Watches html pages for changes
  gulp.watch(['./scss*.scss'], ['cssBuild']); // A watcher for changes in scss files
});

// jsBuild task with an array of dependency tasks that need to be run whenever any of the js files change.
gulp.task('jsBuild', ['jsBrowserify', 'jshint'], function() {
   browserSync.reload(); // Reloads the browser
});

// bowerBuild task to watch the bower files for changes
gulp.task('bowerBuild', ['bower'], function() {
  browserSync.reload();
});

// htmlBuild task
gulp.task('htmlBuild', function() {
  browserSync.reload();
});
