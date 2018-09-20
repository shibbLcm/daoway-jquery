//1. 引入模块
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const htmlreplace = require('gulp-html-replace');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({browsers: ['last 2 versions']});
const open = require('open');
const pkg = require('./package'); //引入package.json文件
const jshintConfig = pkg.jshintConfig; //拿到package.json中的属性

//2. 配置/定义任务
/*
回调函数中指定return的话 方法就是异步的
如果没有指定return 方法就是同步
*/
gulp.task('jshint', function () { //语法检查的任务
//任务的具体内容
  return gulp.src('src/js/*.js') //将指定文件加载到内存中（数据流）
    .pipe($.jshint(jshintConfig)) //语法检查
    .pipe($.jshint.reporter('default')) //语法检查的报错规则
    .pipe($.connect.reload())
})

gulp.task('js', ['jshint'], function () { //['jshint']必须先执行，再执行本身的回调函数
  return gulp.src('src/js/*.js')
    .pipe($.babel())
    //.pipe($.concat('built.js', {newLine: ';'})) //合并后的文件名
    .pipe(gulp.dest('build/js')) //将数据流输出到指定路径
    .pipe($.uglify()) //将数据流文件压缩
    .pipe($.rename({suffix: '.min'})) //将数据流文件改名
    .pipe(gulp.dest('dist/js'))
    .pipe($.connect.reload())
})


gulp.task('less', function () {
  return gulp.src('src/less/*.less')
    .pipe($.less({plugins: [autoprefix]}))
    .pipe($.rename({extname: '.css'}))
    .pipe(gulp.dest('build/css'))
    .pipe($.connect.reload())
})

gulp.task('css', ['less'], function () {
  return gulp.src('build/css/*.css')
    .pipe($.rename({suffix: '.min'}))
    // .pipe($.base64())
    .pipe($.cssmin()) //兼容ie8
    .pipe(gulp.dest('dist/css'))
    .pipe($.connect.reload())
})

gulp.task('imgmin', function () {
  return gulp.src('src/img/*.*')
    .pipe($.imagemin({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    }))
    .pipe(gulp.dest('build/img'))
    .pipe(gulp.dest('dist/img'))
    .pipe($.connect.reload())
})

gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(htmlreplace({
      css: {
        src: 'css',
        tpl: ' <link rel="stylesheet" href="%s/%f.css">'
      },
      js: {
        src: 'js',
        tpl: ' <script src ="%s/%f.js"></script> '
      }
    }, {keepBlockTags: true,}))
    .pipe(gulp.dest('build'))
    .pipe(htmlreplace({
      css: {
        src: 'css',
        tpl: ' <link rel="stylesheet" href="%s/%f.min.css">'
      },
      js: {
        src: 'js',
        tpl: ' <script src ="%s/%f.min.js"></script> '
      }
    }))
    .pipe($.htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'))
    // .pipe(livereload())
    .pipe($.connect.reload())
});

gulp.task('template',function () {
  return gulp.src('src/template/*.html')
    .pipe(gulp.dest('build/'))
    .pipe(gulp.dest('dist/'))
    .pipe($.connect.reload())
})

//热更新/热加载
gulp.task('hotReload', ['default'], function () {
  $.connect.server({
    root: 'dist', //根目录路径
    port: 3050, //开启服务器的端口号
    livereload: true //热更新
  });
//打开指定网页
  open('http:localhost:3050');
//监听的任务
  gulp.watch('src/js/*.js', ['js']); //监听指定文件，一旦发生改变，就会启动后面的任务
  gulp.watch('src/less/*.less', ['css']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/img/*.*',['imgmin']);
  gulp.watch('src/template/*.html',['template']);
});

//3. 应用任务
gulp.task('default', ['js', 'imgmin', 'template','css', 'html']);
//注册默认任务
/*gulp.task('default', ['js', 'css', 'html']);*/
gulp.task('myHotReload', ['default', 'hotReload']);
