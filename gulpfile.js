var gulp = require('gulp');
var cleanDest = require('gulp-clean-dest');

gulp.task('default', ['clean-dist', 'copy']);

gulp.task('copy', ['clean-dist'], function () {
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
    gulp.src('./node_modules/smooth-scroll/dist/js/smooth-scroll.min.js')
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('clean-dist', function () {
    return gulp.src('./dist/images/*')
               .pipe(cleanDest('./dist/images'));
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*', ['default']);
});
