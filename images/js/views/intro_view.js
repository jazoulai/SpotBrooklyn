    /*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.CoverView = Backbone.View.extend({
    id: 'cover',
    template: Handlebars.compile($('#cover_template').html()),
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
        ga('send', 'event', 'tap to scroll down', 'click', 'cover', 1);
    },
    photoCredit: function (){
        alert('modifed photo by Shawn Hoke');
        ga('send', 'event', 'photo credit', 'click', 'cover', 1);
    },
    horizontalLogo: function(){
        var self = this;

        if (window.innerHeight < window.innerWidth) {
            $(this.el).find('img').attr('src', 'images/covers/cover_headline_landscape.svg');
            $(this.el).addClass('landscape');
        } else {
            $(this.el).find('img').attr('src', 'images/covers/cover_headline_portrait.svg');
            $(this.el).removeClass('landscape');
        }

        $(window).resize(function(){
            if (window.innerHeight < window.innerWidth) {
                $(self.el).find('img').attr('src', 'images/covers/cover_headline_landscape.svg');
                $(self.el).addClass('landscape');
            } else {
                $(self.el).find('img').attr('src', 'images/covers/cover_headline_portrait.svg');

                $(self.el).removeClass('landscape');
            }
        });
    }
});