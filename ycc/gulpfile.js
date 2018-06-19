var gulp = require('gulp');

var server = require('gulp-webserver');

var fs = require('fs');

var path = require('path');

var url = require('url')

var sass = require('gulp-sass')

var minCss = require('gulp-clean-css')
gulp.task('server', function() {
    gulp.src('src')
        .pipe('server', {
            pote: 8080,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/facicon.ico') {
                    return false;
                }

                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        })
})

gulp.task('css', function() {
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('bulid/css'))
})