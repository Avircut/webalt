const { src, dest, watch, parallel, series} = require('gulp');

const scss         = require('gulp-sass')(require('sass'));
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');
const pug          = require('gulp-pug');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });
}

function cleanDist() {
  return del('dist')
}

function images() {
  return src('app/images/**/*')
  .pipe(imagemin(
    [
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]
  ))
  .pipe(dest('dist/images'))
}

function htmls() {
  return src('app/pug/*.pug')
    .pipe(pug({pretty:true}))
    .pipe(dest('app/'))
    .pipe(browserSync.stream())
}
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/mixitup/dist/mixitup.js',
    'node_modules/@fancyapps/ui/dist/fancybox.umd.js',
    'app/js/main.js'
  ])
   .pipe(concat('main.min.js'))
   .pipe(dest('app/js'))
   .pipe(browserSync.stream())
}

function styles() {
   return src([
     'app/scss/style.scss'
   ])
    .pipe(scss())
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}


function build() {
  return src([
      'app/css/style.min.css',
      'app/fonts/**/*',
      'app/js/main.min.js',
      'app/*.html'
    ], {base: 'app'})
    .pipe(dest('dist'))
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
  watch(['app/pug/**/*.pug'], htmls);
  watch(['app/*.html']).on('change', browserSync.reload);
}


exports.styles      = styles;
exports.watching    = watching;
exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.images      = images;
exports.cleanDist   = cleanDist;
exports.htmls       = htmls;

exports.build       = series(cleanDist, build);
exports.default     = parallel(htmls, styles, scripts, browsersync, watching);