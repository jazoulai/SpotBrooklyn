/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.SharingExplainedView = Backbone.View.extend({
    id: 'sharing-explained',
    template: Handlebars.compile($('#sharing-explained-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});