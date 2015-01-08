/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.FollowView = Backbone.View.extend({
    id: 'follow',
    template: Handlebars.compile($('#follow-template').html()),
    initialize: function(){
        var self = this;
        sbk.Notifications.on('toggleFollow', function(){
            self.toggleFollow();
        }, this);
    },
    render: function () {
        $(this.el).html(this.template());
        _.defer(function(view){
            view.toggleOnScroll();
            view.preventCarriageReturn();
        }, this);
        return this;
    },
    events: {
        'click #twitter' : 'twitterFollow',
        'click #instagram' : 'instagramFollow',
        'click #facebook' : 'facebookFollow',
        'click .fa-times' : 'toggleFollow',
        'click .fa-paper-plane' : 'submitForm'
    },
    twitterFollow: function () {
        window.open('https://twitter.com/intent/follow?screen_name=spotbrooklyn', '_self');
    },
    instagramFollow: function () {
        window.open('http://instagram.com/spotbrooklyn?ref=badge', '_self');
    },
    facebookFollow: function(){
        window.open('https://www.facebook.com/spotBK', '_self');
    },
    submitForm: function(){
        $('form').submit();
    },
    growHeader: function(){
        $('#header > *').fadeOut(function(){
            $('#header').animate({height : '10vh'}, function(){
                $('#header > span').css({'font-size' : '8vh'});
                $('#header > h3').css({'font-size' : '5vh'});
                $('#header > img').animate({height : '8vh'}, function(){
                    $('#header > *').fadeIn();
                });
            });
        });
    },
    shrinkHeader: function(){
        $('#header').animate({height : '5vh'});
        $('#header > img').animate({height : '4vh'});
        $('#header > h3').css({'font-size' : '3vh'});
        $('#header > span').css({'font-size' : '3vh'});
    },
    toggleFollow: function(){
        var self = this;
        $('.fade').hide();
        $(self.el).slideToggle(200, function(){
            $('.fade').show();
        });
    },
    toggleOnScroll: function(){
        var self = this;
        $(document).scroll(function() {
            var documentHeight = $(document).height();
            var documentPosition = $(document).scrollTop();
            var lastPageHeight = $('#submit').height();
            var buffer = 1.3;
            if (documentPosition + (lastPageHeight * buffer) > documentHeight) {
                self.toggleFollow();
                $(document).off('scroll');
            }
        });
    },
    preventCarriageReturn: function(){
        $('textarea').keypress(function(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
    }
});