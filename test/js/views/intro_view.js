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
    },
    photoCredit: function (){
        alert('photo credit TK');
    },
    horizontalLogo: function(){
        var self = this;

        if (window.innerHeight < window.innerWidth) {
            $(this.el).find('img').attr('src', 'images/cover_text_long.svg');
        } else {
            $(this.el).find('img').attr('src', 'images/cover_text.svg');
        }

        $(window).resize(function(){
            if (window.innerHeight < window.innerWidth) {
                $(self.el).find('img').attr('src', 'images/cover_text_long.svg');
            } else {
                $(self.el).find('img').attr('src', 'images/cover_text.svg');
            }
        });
    }
});