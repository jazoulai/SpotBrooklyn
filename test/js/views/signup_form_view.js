/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.SignupFormView = Backbone.View.extend({
    id: 'signup-form',
    template: Handlebars.compile($('#signup-form-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});