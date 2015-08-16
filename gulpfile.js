var gulp = require('gulp'),
    ghPages = require('gulp-gh-pages'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    newer = require('gulp-newer');


// ROOT TASKS // ---------------------------------------------------------
// Main style task  
gulp.task('css', function() {
  return gulp.src('dev/less/application.less')
    .pipe(less())
    .on('error', handleError)
    .pipe(autoprefixer({cascade: false})) // auto prefix
    .pipe(minifycss()) // minify everything
    .pipe(gulp.dest('public/css'));
});

// Main Javascript task
gulp.task('js', function() {  
  return gulp.src('dev/js/**/*.js')
    .pipe(newer('public/js'))
    .pipe(uglify())
    .on('error', handleError)
    .pipe(gulp.dest('public/js'));
});

// Publish github page
gulp.task('deploy', function() {
  return gulp.src('public/**/*')
    .pipe(ghPages());
});


// FUNCTIONS // ---------------------------------------------------------
// Initial start function
gulp.task('start', function() {
  gulp.start('js', 'css');
});

// Watch function
gulp.task('watch', ['start'], function() {
  gulp.watch('dev/sass/**/*.scss', ['css']);
  gulp.watch('dev/js/**/*.js', ['js']);
 
  livereload.listen();
  gulp.watch(['public/*.html', 'public/js/**/*.js', 'public/css/*.css']).on('change', livereload.changed);
});

// Default function
gulp.task('default', ['watch']);

// Error reporting function
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}