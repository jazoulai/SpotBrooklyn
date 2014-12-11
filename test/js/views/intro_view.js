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
        'click .arrow-down' : 'arrowDown',
        'click .fa-camera-retro' : 'coverPhoto'
    },
    arrowDown: function() {
        $('html, body').animate({
            scrollTop: $('#voting-explained').offset().top
        }, 500);
    },
    coverPhoto: function (){
        window.location.href = 'mailto:?subject=cover photos this out&body=upload photos of you and your friends and neighbors!';
    }
});