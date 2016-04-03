// Gulp Packages
var gulp = require('gulp'), 
    notify = require("gulp-notify") ,
    bower = require('gulp-bower'),
    webserver = require('gulp-webserver'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass');


// Config Object - Paths
var config = {
  sassPath:  './components/stylesheets',
  bowerDir:  './bower_components',
  nodeDir:   './node_modules',
  destPath:  './components/dist',
  jsPath:    './components/apps'
}

// Run Bower
gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

// Move Font Awesome Fonts to Dist Folder
gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/font-awesome/fonts/**.*') 
        .pipe(gulp.dest(config.destPath +'/fonts')); 
});

// Setting up Sass: Linking Boostrap, Fontawesome paths so Sass can access
gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/**.*')
        .pipe(sourcemaps.init())
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 config.sassPath + '/**.*',
                 config.bowerDir + '/bootstrap-sass/assets/stylesheets',
                 config.bowerDir + '/font-awesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write())
         .pipe(gulp.dest(config.destPath +'/css')); 
});



// default task and log a message
gulp.task('default', function(){
  return gutil.log('Gulp is running')
});


// Autoprefixer browser versions
var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


// Watch Sass and Build
gulp.task('watch', function () {
  gulp.watch(config.sassPath + '/**/*.scss', ['css']);
  gulp.watch(config.jsPath + '/**/*.js', ['css']);
});

// // CSS Build
// gulp.task('buildCSS', function () {
//   return gulp
//     .src('components/scss/**/*.scss')
//     .pipe(sourcemaps.init())
//     .pipe(sass()
//     .on('error', sass.logError))
//     .pipe(sourcemaps.write())
//     .pipe(autoprefixer(autoprefixerOptions))
//     .pipe(gulp.dest('./components/dist'));
// });

// Webserver and Live reload
gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

// Default build
gulp.task('default', ['bower', 'icons', 'watch', 'webserver'], function() {
    return gutil.log('Watch is running')
});
