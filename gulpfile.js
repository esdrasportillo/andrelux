var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify'); 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
 
gulp.task('browserify', function() {
    var bundler = browserify({
        entries: ['./js/todoAppFirebaseImplicit.js'], // Only need initial file, browserify finds the deps
        transform: [reactify], // We want to convert JSX to normal javascript
        debug: false, // Gives us sourcemapping
        cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () { // When any files update
        var updateStart = Date.now();
        console.log('Updating!   now:', Date.now());
        watcher.bundle() // Create new bundle that uses the cache for high performance
        .pipe(source('main.js'))
        .pipe(uglify())
    // This is where you add uglifying etc.
        .pipe(gulp.dest('./build/'));
        console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle() // Create the initial bundle when starting the task
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'));
});

// I added this so that you see how to run two watch tasks
gulp.task('css', function () {
    gulp.watch('*.css', function () {
        return gulp.src('*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('build/'));
    });
});

// Just running the two tasks
gulp.task('default', ['browserify', 'css']);