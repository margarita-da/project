const gulp = require('gulp');

const pug = require('gulp-pug');

const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-cssmin');

const autoprefixer = require("gulp-autoprefixer");

const del = require('del');

const browserSync = require("browser-sync").create();

const gulpWebpack = require("gulp-webpack");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");

const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');

const stylus = require('gulp-stylus');


const paths = {
    root: './build',
    templates: {
        pages: 'src/templates/pages/*.pug',
        src: 'src/templates/**/*.*'
    },
    styles: {
        src: 'src/styles/**/*.styl',
        dest: 'build/assets/styles'
    },
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts'
    },
    fonts: {
        src: 'src/fonts/**/*.*',
        dest: 'build/assets/fonts'
    },
    sprite: {
        src: 'src/icons/*.svg',
        dest: 'build/assets/sprite'
    }
    
}
// следим за изменением файлов
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.sprite.src, sprite);    
    gulp.watch(paths.scripts.src, scripts);
}

//следим и при изменении делаем релоад в браузере 

function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}
//очистка папки root
function clean() {
    return del(paths.root);
}
// images
function images() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest));
}
// icons
const config = {
    mode: {
        symbol: {
            sprite: "../sprite.svg",
            example: {
                dest: '../tmp/spriteSvgDemo.html' // демо html
            }
        }
    }
};
 function sprite () {
    return gulp.src(paths.sprite.src)
        // минифицируем svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // удалить все атрибуты fill, style and stroke в фигурах
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        // cheerio плагин заменит, если появилась, скобка '&gt;', на нормальную.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite(config))
        .pipe(gulp.dest(paths.sprite.dest));
}
// fonts
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest));
}
// pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

//stylus
function styles() {
    return gulp.src('./src/styles/app.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(autoprefixer("last 15 versions"))      
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest))
}
// webpack
function scripts() {
    return gulp.src("./src/scripts/app.js")
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}



exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.fonts = fonts;
exports.sprite = sprite;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, fonts, sprite, scripts), //styles, templates, images, fonts, sprite, scripts
    gulp.parallel(watch, server)
));