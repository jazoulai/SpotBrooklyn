    /*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.ResultsSignupView = Backbone.View.extend({
    id: 'results-signup',
    template: Handlebars.compile($('#results-signup-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});