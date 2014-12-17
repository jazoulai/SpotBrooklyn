/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.FollowView = Backbone.View.extend({
    id: 'follow',
    template: Handlebars.compile($('#follow-template').html()),
    render: function () {
        $(this.el).html(this.template());
        this.toggleFollow();
        return this;
    },
    events: {
        'click #twitter-follow' : 'twitterFollow',
        'click #instagram-follow' : 'instagramFollow'
    },
    twitterFollow: function () {
        window.open('https://twitter.com/intent/follow?screen_name=spotbrooklyn', '_self');
    },
    instagramFollow: function () {
        window.open('http://instagram.com/spotbrooklyn?ref=badge', '_self');
    },
    toggleFollow: function(){
        var self = this;
        $(this.el).hide();
        $(window).scroll(function(){
            if($(window).scrollTop() >= 45) {
                $(self.el).slideDown();
            } else if ($(window).scrollTop() < 45) {
                $(self.el).slideUp();
            }
        });
    }
});