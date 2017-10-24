var gulp = require('gulp')

// Include plug-ins
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
let cleanCSS = require('gulp-clean-css');

// Concatenate All CSS files into one file named "styles"
gulp.task('styles', function () {
  return gulp.src('./SRC/SASS/*.scss')
    .pipe(concat('styles.scss'))
    .pipe(gulp.dest('./Dist/scss/'))
});

// Concatenate All JS files into one file named "scripts"
gulp.task('scripts', function () {
  return gulp.src('./SRC/JavaScript/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./Dist/JavaScript/'))
});

// Initializing watch function
gulp.task('watch', function () {
  gulp.watch('./SRC/SASS/*.scss', ['styles'])
});

// Watching all JS, CSS and HTML files
gulp.task('watch', function () {
  gulp.watch('.SRC/SASS/styles.scss', ['styles'])
  gulp.watch('./SRC/JavaScript/*.js', ['scripts'])
  gulp.watch('./index.html')
});

// Initializing Browser Sync to auto reload after save
gulp.task('reload', function () {
  browserSync.reload()
});

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
});

// Setting browser sync, watch and lint to default
gulp.task('default', ['watch', 'browser-sync',]);

// Initializing Uglify Plug In
gulp.task('uglify', function () {
  return gulp.src('./SRC/JavaScript/*.js')
    .pipe(uglify('scripts.js'))
    .pipe(rename({extname: 'min.js'}))
    .pipe(gulp.dest('./Dist/JavaScript/'));
});

// Initializing Clean CSS
gulp.task('minify-css', function () {
  return gulp.src('styles/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('Dist/css'));
});

// Initializing ESLint
gulp.task('lint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Initializing SASSs
gulp.task('sass', function () {
  gulp.src('./SRC/SASS/styles.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./Dist/css'))
    .pipe(cssnano('styles.css'))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./Dist/css'));
});
