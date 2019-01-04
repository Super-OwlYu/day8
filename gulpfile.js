var gulp = require("gulp");
var sass = require("gulp-sass");
var htmlmin = require("gulp-htmlmin");
var imagemin = require("gulp-imagemin");
var webserver = require("gulp-webserver");
var uglify = require("gulp-uglify");
gulp.task("sass", function() {
    return gulp.src("src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css/"));
})
gulp.task("watch", function() {
    return gulp.watch("src/sass/*.scss", gulp.series("sass"));
})
gulp.task("webserver", function() {
        return gulp.src("src")
            .pipe(webserver({
                host: "localhost",
                port: 3000,
                open: true,
                livereload: true
            }))

    })
    //打包
gulp.task("bsass", function() {
    return gulp.src("src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css/"));
})
gulp.task("js", function() {
    return gulp.src("src/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
})
gulp.task("imagemin", function() {
    return gulp.src("src/images/*.jpg")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images/"));
})
gulp.task("htmlmin", function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("dist/"));
})
gulp.task("default", gulp.series("sass", "webserver", "watch"));
gulp.task("bulid", gulp.series("bsass", "js", "imagemin", "htmlmin"));