module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            css: {
                src: [
                    'css/type.css', 'css/story_list.css', 'css/story_list_item.css', 'css/story_list_item_landscape.css', 'css/partnerships', 'css/media_queries.css'
                ],
                dest: 'css/combined.css'
            },
            js: {
                src: [
                    'js/libs/prefixfree.min.js', 'js/libs/conditionizr.min.js', 'js/libs/viewport-units-buggyfill.js', 'js/libs/underscore.js', 'js/libs/backbone.js', 'js/libs/handlebars-v1.3.0.js', 'js/libs/backbone.touch.js', 'js/libs/jquery.animate-colors-min.js', 'js/app.js', 'js/router.js', 'js/models/storyModel.js', 'js/collections/storiesCollection.js', 'js/views/story_list_view.js', 'js/views/story_list_item_view.js', 'js/views/partnerships.js', 'js/views/about_view.js', 'js/views/story_map_view.js'
                ],
                dest: 'js/combined.js'
            }
        },
        cssmin: {
            css: {
                src: 'css/combined.css',
                dest: 'css/combined.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'js/combined.min.js': ['js/combined.js']
                }
            }
        },
        watch: {
            files: ['css/**/*.css', 'js/**/*.js'],
            tasks: ['concat', 'cssmin', 'uglify']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['concat:css', 'cssmin:css', 'concat:js', 'uglify:js']);
};