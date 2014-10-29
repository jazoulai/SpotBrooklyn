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
        "click #follow_button" : "toggle_follow"
    },
    toggle_follow: function(){
        $('#follow').slideToggle({height: "10%"}, 500);
    }
});