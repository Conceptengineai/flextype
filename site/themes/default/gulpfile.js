const gulp = require("gulp")
const gzip = require("gulp-gzip")
const nano = require("gulp-cssnano")
const postcss = require("gulp-postcss")
const postcsscssnext = require("postcss-cssnext")
const postcssimport = require("postcss-import")
const rename = require("gulp-rename")
const size = require("gulp-size")
const stylelint = require("gulp-stylelint")

const files = ["assets/src/framework/5lvmb3r.css"]
const postcssVanilla = [postcssimport(), postcsscssnext({ browsers: [""] })]
const postcssAutoprefix = [
	postcssimport(),
	postcsscssnext({ browsers: ["last 2 versions"] })
]

// Build autoprefixed version
const buildAutoprefixed = () =>
	gulp
		.src(files)
		.pipe(postcss(postcssAutoprefix))
		.pipe(nano())
		.pipe(rename("5lvmb3r.prefixed.min.css"))
		.pipe(gulp.dest("assets/dist/css"))
		.pipe(size({ showFiles: true }))
		.pipe(gzip())
		.pipe(rename("5lvmb3r.prefixed.min.css.gz"))
		.pipe(gulp.dest("assets/dist/css"))
		.pipe(size({ showFiles: true, gzip: true }))

// Build without autoprefixing
const buildVanilla = () =>
	gulp
		.src(files)
		.pipe(postcss(postcssVanilla))
		.pipe(nano())
		.pipe(rename("5lvmb3r.min.css"))
		.pipe(gulp.dest("assets/dist/css"))
		.pipe(size({ showFiles: true }))
		.pipe(gzip())
		.pipe(rename("5lvmb3r.min.css.gz"))
		.pipe(gulp.dest("assets/dist/css"))
		.pipe(size({ showFiles: true, gzip: true }))


// Build only fractures.css
const defaultTask = () =>
	gulp
		.src(files)
		.pipe(postcss(postcssVanilla))
		.pipe(gulp.dest("assets/dist/css"))
		.pipe(size({ showFiles: true }))


const lint = () => gulp
	.src("assets/dist/css/5lvmb3r.css")
	.pipe(
		stylelint({ reporters: [{ formatter: "string", console: true }] })
	)

// Build
gulp.task("build", gulp.series(defaultTask, buildVanilla, buildAutoprefixed));

// Test
gulp.task("test", gulp.series(defaultTask, lint));
