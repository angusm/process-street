var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var embedTemplates = require('gulp-angular-embed-templates');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

function handleError(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('jquery-file-upload-js', function() {
    // app.js is your main JS file with all your module inclusions
    return gulp.src('./src/js/jquery-fileupload.js')
        .pipe(embedTemplates())
        .on('error', handleError)
        .pipe(sourcemaps.init())
        .on('error', handleError)
        // .pipe(uglify())
        .on('error', handleError)
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename('jquery-fileupload.min.js'))
        .pipe(gulp.dest('./bin/js/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    // app.js is your main JS file with all your module inclusions
    return gulp.src('./src/js/main.js')
        .pipe(embedTemplates())
        .on('error', handleError)
        .pipe(sourcemaps.init())
        .on('error', handleError)
        // .pipe(uglify())
        // .on('error', handleError)
        .pipe(sourcemaps.write('./maps'))
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest('./bin/js/'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./bin'))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .on('error', handleError)
        .pipe(gulp.dest('./bin/css'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './bin/'
        }
    });
});

gulp.task('watch', [
    'css',
    'html',
    'js',
    'jquery-file-upload-js'
], function() {
    browserSync.init({
        server: {
            baseDir: './bin/'
        }
    });
    gulp.watch('./src/*.html', ['html'])
        .on('error', handleError);
    gulp.watch('./src/scss/**/*.scss', ['css'])
        .on('error', handleError);
    gulp.watch('./src/js/**/*.js', ['js'])
        .on('error', handleError);
});

gulp.task('default', ['watch']);