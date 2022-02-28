const gulp = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const ts = require("gulp-typescript")
const tsProject = ts.createProject("tsconfig.json")

gulp.task("compile-module", () => {
  return ts
    .createProject("tsconfig.json")
    .src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest("dist"));
});

gulp.task("compile-styles", () => {
  return gulp
    .src("src/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist"));
});

gulp.task("copy-static-files", () => {
  return gulp
    .src([
      // folders
      "src/assets/**/*",
      "src/lang/**/*",
      "src/templates/**/*",
      // files
      "LICENSE.txt",
      "src/system.json",
      "src/template.json",
    ], {
      base: "./src"
    })
    .pipe(gulp.dest("dist"));
});

gulp.task("default", gulp.parallel([
  "compile-module",
  "compile-styles",
  "copy-static-files",
]));

