module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), 
    jshint: {
      all: [
          "Gruntfile.js", 
          //"src/**/*.js"
      ], 
      options: {
        jshintrc: '.jshintrc'
      }
    },
    copy: {
      build: {
        src: 'src/jquery.imageformat.js',
        dest: 'build/jquery.imageformat.js'
      }
    }, 
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/jquery.imageformat.js',
        dest: 'build/jquery.imageformat.min.js'
      }
    }
  });

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('build', ['copy', 'uglify']);
  grunt.registerTask('default', ['build']);
  
};