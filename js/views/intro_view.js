    /*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.CoverView = Backbone.View.extend({
    id: 'intro',
    template: Handlebars.compile($('#intro_template').html()),
    render: function () {
        $(this.el).html(this.template());
        _.defer(function(view){
            view.horizontalLogo();
        }, this);
        return this;
    },
    events: {
        'click .fa-caret-down' : 'tapTriangleToScrollDown'
    },
    tapTriangleToScrollDown: function() {
        $('html, body').animate({
            scrollTop: $('#voting-explained').offset().top
        }, 500);
        ga('send', 'event', 'tap to scroll down', 'click', 'intro', 1);
    }
});