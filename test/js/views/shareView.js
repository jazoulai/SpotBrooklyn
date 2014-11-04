/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.ShareView = Backbone.View.extend({

    initialize: function(story){
        this.story = story;
    },

    template: Handlebars.compile($('#share_template').html()),
    render: function (){
        $(this.el).html(this.template());
        return this;
    },
    events: {
        "touchstart #share_twitter .social_button_img" : "share_twitter",
        "touchstart #share_facebook .social_button_img" : "share_facebook",
        "touchstart #share_email .social_button_img" : "share_email"
    },
    close_follow: function () {
        $('#follow').hide();
    },
    share_twitter: function(e){
        window.open('https://twitter.com/intent/tweet?text=check%20out:%20&url=http://spotbrooklyn.com&via=spotBrooklyn', '_self');
        this.close_follow();
        ga('send', 'event', 'share', 'touchstart', 'twitter');
    },
    share_facebook: function(){
        window.open('http://www.facebook.com/sharer.php?u=http://spotbrooklyn.com', '_self');
        this.close_follow();
        ga('send', 'event', 'share', 'touchstart', 'facebook');
    },
    share_email: function(){
        var headline = this.story.get('headline');
        window.location.href = 'mailto:' + '?subject=check out this spot&body=' + headline + ': ' + window.location.href;
        this.close_follow();
        ga('send', 'event', 'share', 'touchstart', 'email');
    }
});