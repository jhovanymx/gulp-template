const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

gulp.task("styles", function () {
    gulp.src("./src/scss/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass()).on("error", notify.onError(function(error){
            return "Error at compile sass.\n" + error;
        }))
        .pipe(autoprefixer({browsers: ["last 2 versions"], cascade: false}))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("./dist/css"))
        .pipe(notify({title: "SASS", message: "SASS compiled successfully"}))
        .pipe(browserSync.stream());
});

gulp.task("scripts", function() {
    return gulp.src("./src/js/*.js")
    .pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("browser-sync", function() {
    browserSync.init({
        injectChanges: true,
        files: ["*.html", "./dist/**/*.{html,css,js}"],
        server: "./"
    });
});

gulp.task("watch", function() {
    gulp.watch("./src/scss/*.scss", ["styles"]);
    gulp.watch("./src/js/*.js", ["scripts"]);
});

gulp.task("default", ["styles", "scripts", "browser-sync", "watch"]);
