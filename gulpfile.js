var gulp = require('gulp');
var del = require('del');
var merge = require('merge-stream');
var plugins = require('gulp-load-plugins')();
var Server = require('karma').Server;
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;

gulp.task('clean', function (cb) {
    return del(['tmp', 'dist'], cb);
});

gulp.task('build-css', ['clean'], function () {
    return gulp.src('./styles/form-viewer.scss')
        .pipe(plugins.plumber({ errorHandler: onError }))
        .pipe(plugins.sass())
        .pipe(plugins.minifyCss())
        .pipe(plugins.rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-tmp', ['build-css'], function () {
    var viewerStream = buildTemp('src/viewer/', 'mwFormViewer');
    return merge(viewerStream);

});

gulp.task('default', ['build-tmp'], function () {
    var viewerStream = buildModuleStream('form-viewer', 'mwFormViewer');
    return merge(viewerStream);

});

gulp.task('watch', function() {
    return gulp.watch(['./src/**/*.html', './styles/*.*css', 'src/**/*.js'], ['default']);
});

function buildTemp(src, moduleName) {

    var tmpDir = 'tmp/'+moduleName;

    var copy = gulp.src(src + '**/*').pipe(gulp.dest(tmpDir));

    return merge(copy);
}

function buildTemplates(src, moduleName, dest, filePrefix){
    return gulp.src(src + '**/*.html')
        .pipe(plugins.minifyHtml())
        .pipe(plugins.angularTemplatecache({
            module: moduleName,
            filename: filePrefix+'-tpls.min.js'
        }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dest));
}

function buildModuleStream(destPrefix, moduleName) {

    var tmpDir = 'tmp/'+moduleName;

    var ionicTemplates = buildTemplates(tmpDir+'/templates/ionic/', moduleName, 'dist', destPrefix+'-ionic');

    var module =  gulp.src(tmpDir + '/**/*.js')
        .pipe(plugins.plumber({ errorHandler: onError }))
        .pipe(plugins.angularFilesort())
        .pipe(plugins.ngAnnotate())
        // .pipe(plugins.concat(destPrefix+'.js'))
        // .pipe(gulp.dest('dist'));
    var development = (argv.dev === undefined) ? false : true;
    if(!development){
        module.pipe(plugins.uglify())
            .pipe(plugins.stripDebug())
            .pipe(plugins.concat(destPrefix+'.min.js'))
            .pipe(gulp.dest('dist'));
    }
    return merge(module, ionicTemplates);

}

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function() {
        done();
    }).start();
});

/**
 * Serve
 */

// error function for plumber
var onError = function (err) {
  console.log(err);
  this.emit('end');
};


var browserSyncInit = function(baseDir){
    browserSync.init({
        server: {
            baseDir: baseDir,
            index: "demo.html",
            routes: {
                "/bower_components": "bower_components",
                "/vendor": "vendor",
                "/dist": "dist",
            }
        },
        port: 8080,
        open: 'local',
        browser: "google chrome"
    });
};

var gulpWatch = function(){
    gulp.watch(['./src/**/*.html', './styles/*.*css', 'src/**/*.js'], ['default-watch']);
};

gulp.task('default-watch', ['default'], ()=>{ browserSync.reload() });

gulp.task('serve', ['default'], ()=>{
    browserSyncInit("demo-material");
    gulpWatch();
});

gulp.task('serve-bootstrap', ['default'], ()=>{
    browserSyncInit("demo");
gulpWatch();
});
