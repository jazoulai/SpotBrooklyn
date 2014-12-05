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
        'click #dotell' : 'dotell'
    },
    dotell: function () {
        $('html, body').animate({
            scrollTop: $('#submit').offset().top
        }, 500);
    }
});