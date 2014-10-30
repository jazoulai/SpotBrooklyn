/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.StoryNavigationView = Backbone.View.extend({

    id: 'story_nav_container',
    template: Handlebars.compile($('#story_navigation_template').html()),
    render: function (){
        $(this.el).html(this.template());
        return this;
    },
    events: {
        "touchstart #share_button" : "toggle_follow",
        "touchstart #home_button" : "nav_home"
    },
    toggle_follow: function(){
        $('#follow').slideToggle({height: "10%"}, 500);
    },
    nav_home: function(){
        sbk.app.navigate("!", {trigger: true});
    }

});