/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.ShareView = Backbone.View.extend({
    id: 'share',
    template: Handlebars.compile($('#share-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    events: {
        'click #twitter-share' : 'twitterShare',
        'click #facebook-share' : 'facebookShare',
        'click #email-share' : 'emailShare'
    },
    twitterShare: function () {
        window.open('https://twitter.com/intent/tweet?text=check%20out:%20&url=http://spotbrooklyn.com&via=spotBrooklyn', '_self');
    },
    facebookShare: function () {
        window.open('http://www.facebook.com/sharer.php?u=http://spotbrooklyn.com', '_self')
    },
    emailShare: function () {
        window.location.href = 'mailto:?subject=check this out&body=hi!';

    }
});