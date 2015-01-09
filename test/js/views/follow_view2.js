/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.FollowView2 = Backbone.View.extend({
    className: 'follow',
    template: Handlebars.compile($('#follow-template').html()),
    initialize: function(){
        var self = this;
        sbk.Notifications.on('fadeToggleSocialMediaView', function(){
            self.fadeToggleSocialMediaView();
        }, this);
    },
    render: function () {
        $(this.el).html(this.template());
        _.defer(function(view){
            view.preventCarriageReturn();
        }, this);
        return this;
    },
    events: {
        'click .twitter' : 'twitterFollow',
        'click .instagram' : 'instagramFollow',
        'click .facebook' : 'facebookFollow',
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
    preventCarriageReturn: function(){
        $('textarea').keypress(function(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
    },
    fadeToggleSocialMediaView: function(){
        $(this.el).fadeToggle();
    }
});