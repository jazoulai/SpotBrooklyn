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

        "touchstart .social_button" : "close_follow",
        "touchstart #share_twitter .social_button_img" : "share_twitter",
        "touchstart #share_facebook .social_button_img" : "share_facebook",
        "touchstart #share_email .social_button_img" : "share_email"
    },
    close_follow: function () {
        $('#follow').hide();
    },
    share_twitter: function(){
        var self = this;
        window.open('https://twitter.com/intent/tweet?text=this%20is%20a%20test&url=http://spotbrooklyn.com&via=spotBrooklyn');
        self.close_follow();
    },
    share_facebook: function(){
        var self = this;
        window.open('http://www.facebook.com/sharer.php?u=http://spotbrooklyn.com');
        self.close_follow();
    },
    share_email: function(){
        var self = this;
        var headline = this.story.get('headline');
        window.location.href = 'mailto:' + '?subject=check out this spot&body=' + headline + ': ' + window.location.href;
        self.close_follow();
    }
});