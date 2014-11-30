/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.ShareView = Backbone.View.extend({
    id: 'share',
    template: Handlebars.compile($('#share-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});