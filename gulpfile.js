const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglity = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const stylus = require('stylus');
let browserSync = require('browser-sync').create()

// html
const paths = {
    scripts: {
        src: './',
        dest: "./build/",
    }
}
async function includeHTML(){
    return gulp.src([
        '*.html',
        '!navigator.html',
        '!about-us.html',
        '!team.html',
        '!time.html',
        '!reviews.html',
        '!connection.html',
        '!footer.html',
    ])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(paths.scripts.dest))
}
exports.default = includeHTML;
// css
gulp.task("stylus", () => {
    return gulp.src("src/**/*.css")
    .pipe(cssnano())
    .pipe(concat("styles.min.css"))
    .pipe(gulp.dest("build/stylus"))
})
// js
gulp.task("scripts1", () => {
    return gulp.src("src/**/**/*.js")
    .pipe(uglity())
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest("build/scripts"))
})
// image
gulp.task("images", () => {
    return gulp.src("src/**/*.jpg")
    .pipe(imagemin())
    .pipe(gulp.dest("build/images"))
})
// images1
gulp.task("images1", () => {
    return gulp.src("src/**/*.png")
    .pipe(imagemin())
    .pipe(gulp.dest("build/images"))
})
// watch
gulp.task("watch", () => {
    gulp.watch("src/**/*.css", gulp.series("stylus"));
    gulp.watch("src/**/**/*.js", gulp.series("scripts1"));
    gulp.watch("src/**/*.jpg", gulp.series("images"))
    gulp.watch("src/**/*.png", gulp.series("images1"))
})

// сервер
gulp.task('browserSync', function() {
    browserSync.init({
       server: {
          baseDir: 'build',
       },
    })
 })

 gulp.task("default", gulp.series("stylus", "scripts1", "images", "images1", ["browserSync"], ))