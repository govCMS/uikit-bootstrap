'use strict';

// *************************
//
// Run 'gulp' to watch directory for changes for images, fonts icons, Sass, etc.
// Or for full site testing run 'gulp test'
//
// *************************


// Include gulp.
const gulp = require('gulp');

// Include plug-ins.
const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const beeper = require('beeper');
const compass = require('gulp-sass');
const concat = require('gulp-concat');
const cssNano = require('cssnano');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');


// ********************************************************************************************************************************************


// Error Handling to stop file watching from dying on an error (ie: Sass compiling).
var onError = function(err) {
  beeper(3);
  console.log(err);
};


// Compile the Sass.
gulp.task('styles', function() {
  // Sass file to dist.
  gulp.src('./sass/**/*').pipe(gulp.dest('./build/dist/sass'));

  // Register the PostCSS plugins.
  var postcssPlugins = [
    atImport,
    autoprefixer,
    cssNano,
  ];
  // The actual task.
  gulp.src('./sass/*.scss')
    // Error handling
    .pipe(plumber({
      errorHandler: onError
    }))
    // Compile the Sass code.
    .pipe(compass({
      sass: './sass'
    }))
    // If there's more than one css file outputted, merge them into one.
    // .pipe(concat('./styles.css'))
    // Optimise the CSS.
    .pipe(postcss(postcssPlugins))
    // Output to the css folder.
    .pipe(gulp.dest('./build/dist/css/'));
});


// ********************************************************************************************************************************************


// Default gulp task.
gulp.task('default', ['styles']);
