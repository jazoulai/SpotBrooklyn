/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.ContributionFormView = Backbone.View.extend({
    id: 'submit',
    template: Handlebars.compile($('#contribution-form-template').html()),
    render: function () {
        $(this.el).html(this.template());
        _.defer(function(view){
            view.activeButtonStyle();
        }, this );
        return this;
    },
    events: {
        'click #submit-topic' : 'submitIdea',
        'focus #submission-field' : 'scrollToTextarea',
        'keyup' : 'activeButtonStyle'
    },
    textareaHasValue: function() {
        this.textarea = $('#submission-field');
        this.creditTextarea = $('#credit-field');
        this.creditTextareaValue = this.creditTextarea.val();
        this.textareaValue = this.textarea.val();
        var textareaValueLength = this.textareaValue.trim().length;
        return (textareaValueLength > 1);
    },
    activeButtonStyle : function () {
        var button = $(this.el).find('button');
        if(this.textareaHasValue()){
            button.removeClass('disabled');
            button.addClass('enabled');
            button.removeAttr('disabled', 'disabled');
        } else {
            button.removeClass('enabled');
            button.addClass('disabled');
        }
    },
    submitIdea: function (event) {
        event.preventDefault();
            $('#submit').append('<p>Thanks for your submission, ' + this.creditTextareaValue + '!</p>');
            ga('send', 'event', 'ideas', 'click', this.textareaValue, 1);
            this.textarea.val('');
            this.creditTextarea.val('');
            console.log('submitted');
    },
    scrollToTextarea: function () {
        //TODO this includes padding and requires a css layout fix
        var viewHeight = $(this.el).height();
        //calculated to match #header css height of 10vh
        var headerHeight = viewHeight/10;
        $('html, body').animate({
            scrollTop: $('textarea').offset().top-headerHeight
        }, 500);
    }
});