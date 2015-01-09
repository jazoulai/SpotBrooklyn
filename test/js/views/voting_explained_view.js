/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.VotingExplainedView = Backbone.View.extend({
    id: 'voting-explained',
    template: Handlebars.compile($('#voting-explained-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    events : {
        'click .fa-caret-down' : 'down'
    },
    down: function () {
        $('html, body').animate({
            scrollTop: $('#story-list').offset().top
        }, 500);

        ga('send', 'event', 'tap to scroll down', 'click', 'about us', 1);
    }
});