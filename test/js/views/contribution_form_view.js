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
        'click #submit-topic' : 'submitIdea',
        'focus #submission-field' : 'scrollToTextarea'
    },
    submitIdea: function (event) {
        event.preventDefault();
        var idea = $('textarea').val();
        ga('send', 'event', 'ideas', 'click', idea, 1);
    },
    scrollToTextarea: function () {

        //TODO this includes padding and requires a css layout fix
        var viewHeight = $(this.el).height();


        var headerHeight = viewHeight/10; //calculated to match #header css height of 10vh
        $('html, body').animate({
            scrollTop: $('textarea').offset().top-headerHeight
        }, 500);
    }
});