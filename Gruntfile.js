'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('asIconPicker.jquery.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['dist', 'css']
    },
    copy: {
      fontAwesome: {
        files: [{
            expand: true,
            cwd: 'bower_components/fontAwesome/fonts/',
            src:  '**',
            dest: 'demo/fonts/'
          },
          {
            flatten: true,
            src: 'bower_components/fontAwesome/css/font-awesome.css', 
            dest: 'demo/css/font-awesome.css'
          }
        ]
      },
      jquery_asTooltip: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'bower_components/jquery-asTooltip/dist',
          src: 'jquery-asTooltip.min.js',
          dest: 'demo/js'
        },
        {
          flatten: true,
          src: 'bower_components/jquery-asTooltip/css/jquery-asTooltip.css',
          dest: 'demo/css/jquery-asTooltip.css'
        }]
      },
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },
    jsbeautifier : {
      files : ["src/**/*.js"],
      options : {
        "indent_size": 4,
        "indent_char": " ",
        "indent_level": 0,
        "indent_with_tabs": false,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "jslint_happy": false,
        "brace_style": "collapse",
        "keep_array_indentation": false,
        "keep_function_indentation": false,
        "space_before_conditional": true,
        "eval_code": false,
        "indent_case": false,
        "unescape_strings": false
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
    },
    less: {
      dist: {
        files: {
          'css/asIconPicker.css': 'less/asIconPicker.less'
        }
      }
    },
    recess: {
      dist: {
        options: {
          compile: true
        },
        files: {
          'css/asIconPicker.css': ['less/asIconPicker.less']
        }
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-recess');

  // Default task.
  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'less']);

  grunt.registerTask('js', ['jsbeautifier', 'concat', 'uglify']);
};
