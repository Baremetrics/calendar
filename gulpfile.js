var gulp = require('gulp'),
    ghPages = require('gulp-gh-pages'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    newer = require('gulp-newer');


// ROOT TASKS // ---------------------------------------------------------
// Main style task  
gulp.task('css', function() {
  return gulp.src('dev/sass/**/**.scss')
    .pipe(sass())
    .on('error', handleError)
    .pipe(autoprefixer({cascade: false,  browsers: ['last 10 versions']})) // auto prefix
    .pipe(minifycss()) // minify everything
    .pipe(gulp.dest('public/css'));
});

// Main Javascript task
gulp.task('js', function() {  
  return gulp.src('dev/js/**/*.js')
    .pipe(newer('public/js'))
    // .pipe(uglify())
    .on('error', handleError)
    .pipe(gulp.dest('public/js'));
});

// Publish github page
gulp.task('deploy', function() {
  return gulp.src('public/**/*')
    .pipe(ghPages());
});


// FUNCTIONS // ---------------------------------------------------------
// Watch function
gulp.task('watch', function() {
  gulp.start('js', 'css');

  gulp.watch('dev/sass/**/*.scss', ['css']);
  gulp.watch('dev/js/**/*.js', ['js']);
  gulp.watch('dev/img/**/*.{jpg,jpeg,png,gif,svg,ico}', ['img']);
 
  livereload.listen();
  gulp.watch(['public/*.html', 'public/js/**/*.js', 'public/img/**/*.{jpg,jpeg,png,gif,svg,ico}', 'public/css/*.css']).on('change', livereload.changed);
});

// Default function
gulp.task('default', ['watch']);

// Error reporting function
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}