/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.FollowView = Backbone.View.extend({
    className: 'follow',
    template: Handlebars.compile($('#follow-template').html()),
    initialize: function(){
        var self = this;
        sbk.Notifications.on('toggleSocialMediaMenu', function(){
            self.toggleSocialMediaMenu();
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
        'click .fa-times' : 'toggleSocialMediaMenu',
        'click .fa-paper-plane' : 'partnershipsForm'
    },

    preventCarriageReturn: function(){
        $('textarea').keypress(function(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
    }
});