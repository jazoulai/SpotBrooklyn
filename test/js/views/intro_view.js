    /*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.IntroView = Backbone.View.extend({
    id: 'intro',
    template: Handlebars.compile($('#intro_template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    events: {
        'click button' : 'joinUs'
    },
    joinUs: function() {
        $('html, body').animate({
            scrollTop: $('#voting-explained').offset().top
        }, 500);
    }
});