    /*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.VoteButtonsView = Backbone.View.extend({
    className: 'vote',
    template: Handlebars.compile($('#vote-buttons-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});