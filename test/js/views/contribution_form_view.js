/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.ContributionFormView = Backbone.View.extend({
    id: 'submit',
    template: Handlebars.compile($('#contribution-form-template').html()),
    render: function () {
        $(this.el).html(this.template());
        return this;
    },
    events: {
        'click p:last-of-type' : 'partnerships'
    },
    partnerships: function(){
        document.location.href = "mailto:joey@spotbrooklyn.com,jonathan@spotbrooklyn.com?subject=partnerships";
    }
});