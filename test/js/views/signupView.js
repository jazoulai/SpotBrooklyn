/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.SignupView = Backbone.View.extend({
    id: 'signup_container',
    template: Handlebars.compile($('#signup_template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    }
});