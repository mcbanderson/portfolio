var gulp = require('gulp');
var cleanDest = require('gulp-clean-dest');

function clean() {
    return gulp.src('./dist/images/*')
               .pipe(cleanDest('./dist/images'));
}

function build() {
    gulp.src('./src/images/*')
        .pipe(gulp.dest('./dist/images'));
    gulp.src('./src/js/*')
        .pipe(gulp.dest('./dist/js'));
    gulp.src('./node_modules/animejs/anime.min.js')
        .pipe(gulp.dest('./dist/js'));
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
    gulp.src('./src/style.css')
        .pipe(gulp.dest('./dist'));
    gulp.src('./node_modules/isotope-layout/dist/isotope.pkgd.min.js')
        .pipe(gulp.dest('./dist/js'));
    return gulp.src('./node_modules/smooth-scroll/dist/js/smooth-scroll.min.js')
               .pipe(gulp.dest('./dist/js'));
}

exports.default = gulp.series(clean, build)