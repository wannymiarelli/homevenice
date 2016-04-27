var gulp        = require('gulp');
var sass        = require('gulp-sass');
var htmlmin     = require('gulp-htmlmin');
var watch       = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('default', ['html', 'sass', 'serve']);

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch('./src/**/**/*.html', ['html']);

    gulp.watch("./dist/**/*.css").on('change', browserSync.reload);
    gulp.watch("./dist/**/*.html").on('change', browserSync.reload);
});

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
