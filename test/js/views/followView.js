/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.FollowView = Backbone.View.extend({
    events: {
        "touchstart #follow_twitter .social_button_img" : "follow_twitter",
        "touchstart #follow_instagram .social_button_img" : "follow_instagram",
        "touchstart #follow_email .social_button_img" : "follow_email"
    },
    template: Handlebars.compile($('#follow_template').html()),
    render: function (){
        $(this.el).html(this.template());
        return this;
    },
    close_follow: function () {
        $('#follow').hide();
    },
    follow_twitter: function(){
        var self = this;
        window.open('https://twitter.com/intent/follow?screen_name=spotbrooklyn', '_self');
        this.close_follow();
    },
    follow_instagram: function(){
        var self = this;
        window.open('http://instagram.com/spotbrooklyn?ref=badge', '_self');
        this.close_follow();
    },
    follow_email: function(){
        var self = this;
        //window.location.href = 'mailto:joey@spotbrooklyn.com';
        sbk.app.navigate('!about', {trigger: true});
        this.close_follow();
    }

});