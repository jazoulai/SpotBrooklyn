    /*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.IntroView = Backbone.View.extend({
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
        'click .fa-caret-down' : 'tapTriangleToScrollDown',
        'click .fa-copyright' : 'photoCredit'
    },
    tapTriangleToScrollDown: function() {
        $('html, body').animate({
            scrollTop: $('#voting-explained').offset().top
        }, 500);
        ga('send', 'event', 'tap to scroll down', 'click', 'intro', 1);
    },
    photoCredit: function (){
        alert('modifed photo by Shawn Hoke');
        ga('send', 'event', 'photo credit', 'click', 'intro', 1);
    },
    horizontalLogo: function(){
        var self = this;

        if (window.innerHeight < window.innerWidth) {
            $(this.el).find('img').attr('src', 'images/cover_text_long.svg');
            $(this.el).addClass('landscape');
        } else {
            $(this.el).find('img').attr('src', 'images/cover_text.svg');
            $(this.el).removeClass('landscape');
        }

        $(window).resize(function(){
            if (window.innerHeight < window.innerWidth) {
                $(self.el).find('img').attr('src', 'images/cover_text_long.svg');
                $(self.el).addClass('landscape');
            } else {
                $(self.el).find('img').attr('src', 'images/cover_text.svg');
                $(self.el).removeClass('landscape');
            }
        });
    }
});