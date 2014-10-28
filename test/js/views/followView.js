/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.FollowView = Backbone.View.extend({


    events: {
        "touchstart #follow_button" : "toggle_follow",
        "touchstart .social_button" : "close_follow",
        "touchstart #follow_twitter .social_button_img" : "follow_twitter",
        "touchstart #follow_instagram .social_button_img" : "follow_instagram",
        "touchstart #follow_email .social_button_img" : "follow_email"
    },
    template: Handlebars.compile($('#follow_template').html()),
    render: function (){
        $(this.el).html(this.template());
        return this;
    },
    toggle_follow: function(){
            $('#follow').slideToggle({height: "10%"}, 500);
    },
    close_follow: function () {
        $('#follow').animate({height: "0%"}, 500);
        //$('#follow').addClass('hide');
    },
    follow_twitter: function(){
        var self = this;
        window.open('https://twitter.com/intent/follow?screen_name=spotbrooklyn');
        self.close_follow();
    },
    follow_instagram: function(){
        var self = this;
        window.open('http://instagram.com/spotbrooklyn?ref=badge');
        self.close_follow();
    },
    follow_email: function(){
        var self = this;
        window.location.href = 'mailto:joey@spotbrooklyn.com';
        self.close_follow();
    }

});