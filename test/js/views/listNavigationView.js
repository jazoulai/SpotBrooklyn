/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.ListNavigationView = Backbone.View.extend({

    id: 'list_nav_container',
    template: Handlebars.compile($('#list_navigation_template').html()),
    render: function (){
        $(this.el).html(this.template());
        return this;
    },
    events: {
        "touchstart #follow_button" : "toggle_follow",
        "touchstart #about_button" : "nav_about"
    },
    toggle_follow: function(){
        $('#follow').slideToggle({height: "10%"}, 500);
        ga('send', 'event', 'follow', 'touchstart', 'toggle buttons', 1);
    },
    nav_about: function(){
        sbk.app.navigate("!about", {trigger: true});
        ga('send', 'event', 'navigation', 'touchstart', 'about');
    }
});