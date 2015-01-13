/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.HeaderView = Backbone.View.extend({
    id: 'header',
    template: Handlebars.compile($('#header-template').html()),
    render: function () {
        $(this.el).html(this.template());
        var self = this;
        sbk.Notifications.on('showFollowButton', function(){
            self.showFollowButton();
        }, this);
        sbk.Notifications.on('hideFollowButton', function(){
            self.hideFollowButton();
        }, this);
        return this;
    },
    events : {
        'click img' : 'backToTop',
        'click div' : 'toggleMenu'
    },
    backToTop: function () {
        $('html, body').animate({
            scrollTop: $('html').offset().top
        }, 500);
    },
    toggleMenu: function () {
        if($('span').hasClass('fa-share-alt')){
            $(this.el).find('span').removeClass('fa-share-alt').addClass('fa-times');
            $(this.el).find('p').text('Close');
        } else {
            $(this.el).find('span').removeClass('fa-times').addClass('fa-share-alt');
            $(this.el).find('p').text('Follow');
        }
        sbk.Notifications.trigger('toggleSocialMediaMenu');
        sbk.Notifications.trigger('fadeToggleSocialMediaView');
    },
    showFollowButton: function(){
        console.log('showFollowButton');
        $(this.el).find('div').show();
    },
    hideFollowButton: function(){
        console.log('hideFollowButton');
        $(this.el).find('div').hide();
    }

});