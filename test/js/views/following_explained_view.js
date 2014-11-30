/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.FollowingExplainedView = Backbone.View.extend({
    id: 'following-explained',
    template: Handlebars.compile($('#following-explained-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});