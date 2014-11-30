/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.ContributionExplainedView = Backbone.View.extend({
    id: 'contribution-explained',
    template: Handlebars.compile($('#contribution-explained-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});