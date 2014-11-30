/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.SignupExplainedView = Backbone.View.extend({
    id: 'signup-explained',
    template: Handlebars.compile($('#signup-explained-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});