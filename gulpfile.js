var gulp = require("gulp"),
    browserSync = require('browser-sync').create();

// Сервер
gulp.task('server', function () {  
  browserSync.init({
    port: 9000,
    tunnel: true,
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


// Задача по-умолчанию
gulp.task('default', ['server', 'watch']);