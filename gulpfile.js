var gulp = require("gulp"),
    iconify = require("gulp-iconify"),
    browserSync = require('browser-sync').create();

// Сервер
gulp.task('server', function () {  
  browserSync.init({
    port: 9000,
    server: {
      baseDir: 'app'
    }
  });
});

// Слежка
gulp.task('watch', function () {
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css'
  ]).on('change', browserSync.reload);
});

gulp.task('iconify', function() {
    iconify({
        src: 'app/img/icons/*.svg',
        styleTemplate: 'app/img/icons/template.iconsvg',
        cssOutput:  'app/css',
        scssOutput: 'app/scss',
        defaultWidth: '100px',
        defaultHeight: '100px',
        svgoOptions: {
            enabled: true,
            options: {
                plugins: [
                    { removeUnknownsAndDefaults: false },
                    { mergePaths: false }
                ]
            }
        }
    });
});

// Задача по-умолчанию
gulp.task('default', ['server', 'watch']);