/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.ContributionFormView = Backbone.View.extend({
    id: 'contribution-form',
    template: Handlebars.compile($('#contribution-form-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});