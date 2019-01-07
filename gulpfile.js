var gulp = require('gulp'),
    ghPages = require('gulp-gh-pages'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    newer = require('gulp-newer');


// ROOT TASKS // ---------------------------------------------------------
// Main style task  
function css(cb) {
  gulp.src('dev/sass/**/**.scss')
    .pipe(sass())
    .on('error', handleError)
    .pipe(autoprefixer({cascade: false,  browsers: ['last 10 versions']})) // auto prefix
    .pipe(cleancss()) // minify everything
    .pipe(gulp.dest('public/css'));

  cb();
}

// Main Javascript task
function js(cb) {
  gulp.src('dev/js/**/*.js')
    .pipe(newer('public/js'))
    // .pipe(uglify())
    .on('error', handleError)
    .pipe(gulp.dest('public/js'));

  cb();
}

// Publish github page
function deploy(cb) {
  gulp.src('./public/**/*')
    .pipe(ghPages());

  cb();
}


// FUNCTIONS // ---------------------------------------------------------
// Watch function
function watch(cb) {
  gulp.watch('dev/js/**/*.js', js);
  gulp.watch('dev/sass/**/*.scss', css);
  // gulp.watch('dev/img/**/*.{jpg,jpeg,png,gif,svg,ico}', img);
 
  livereload.listen();
  gulp.watch(['public/*.html', 'public/js/**/*.js', 'public/img/**/*.{jpg,jpeg,png,gif,svg,ico}', 'public/css/*.css']).on('change', livereload.changed);

  cb();
}

// Error reporting function
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Default function
exports.default = gulp.series(js, css, watch)

exports.css = css
exports.js = js
exports.deploy = deploy