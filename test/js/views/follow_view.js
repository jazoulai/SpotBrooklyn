/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.FollowView = Backbone.View.extend({
    id: 'follow',
    template: Handlebars.compile($('#follow-template').html()),
    render: function () {
        $(this.el).html(this.template());
        _.defer(function(view){
            view.openOnScroll();

        }, this);
        return this;
    },
    events: {
        'click #twitter-follow' : 'twitterFollow',
        'click #instagram-follow' : 'instagramFollow',
        'click .fa-times' : 'closeFollow'
    },
    twitterFollow: function () {
        window.open('https://twitter.com/intent/follow?screen_name=spotbrooklyn', '_self');
    },
    instagramFollow: function () {
        window.open('http://instagram.com/spotbrooklyn?ref=badge', '_self');
    },
    openFollow: function(){
        var self = this;
        $('#header').animate({height : '5vh'});
        $('#header > img').animate({height : '5vh'});
        $('#header > h3').css({'font-size' : '3vh'});
        $('#header > span').css({'font-size' : '3vh'});

        $(":animated").promise().done(function() {
            $('.fade').hide();
            $(self.el).slideDown(300, function(){
                $('.fade').fadeIn(200);
            });
        });
    },
    closeFollow: function(){
        var self = this;
        $('.fade').fadeOut(200, function(){
            $(self.el).slideUp(300, function(){
                $('.fade').hide();
            }).promise().done(function(){
                $('#header').animate({height : '10vh'}, function(){
                    $('#header > img').animate({height : '10vh'});
                    $('#header > span').css({'font-size' : '8vh'});
                    $('#header > h3').css({'font-size' : '8vh'});
                });
            });
        });
    },
    openOnScroll: function(){
        var self = this;
        $(document).scroll(function() {
            var documentPosition = $(document).scrollTop();
            if (documentPosition > 45) {
                self.openFollow();
                $(document).off('scroll');
            }
        });






        /*$(window).on(function(){
           if($(window).scrollTop() >= 45) {
               console.log('openFOllow');
               self.openFollow();
            } else if ($(window).scrollTop() < 45) {
               $(self.el).slideUp();
            }
        });*/

    }
});