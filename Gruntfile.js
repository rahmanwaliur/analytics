module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      jasmine: {
        src: "script/**/*.js",
        options: {
          specs: "spec/unit/**/*.js",
          vendor: ['vendor/angular.js', 'vendor/jquery-1.10.2.min.js', 'vendor/**/*.js']
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-jasmine')

  grunt.registerTask('test', ['jasmine'])
  grunt.registerTask('default', ['test'])
};