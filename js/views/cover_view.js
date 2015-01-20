    /*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.CoverView = Backbone.View.extend({
    id: 'cover',
    template: Handlebars.compile($('#cover_template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});