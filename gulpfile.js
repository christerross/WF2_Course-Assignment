// This one I have tried to cook up myself
/*
const { src, dest } = require('gulp');

function copy() {
    return src('src/*.html')
    .pipe(dest('app'))
};


// Found this online, but can't get it to work

var gulp = require('gulp');

gulp.task('default', [], function() {
  console.log("Moving all files in styles folder");
  gulp.src("src/**.*")
      .pipe(gulp.dest('app'));
}); 
*/

const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();


function css() {
    return src('sass/**/*.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('app'))
        .pipe(browserSync.stream())
}

exports.css = css;


exports.images = () => (
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/images'))
);

function watch(){
    browserSync.init({
        server: {
            baseDir: 'app',
        }
    });
    gulp.watch('./sass/**/*.scss', css);
    gulp.watch('app/*.html').on('change', browserSync.reload)
}

exports.watch = watch;
