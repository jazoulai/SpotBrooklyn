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
    textareaHasValue: function() {
        this.textarea = $('#submission-field');
        this.creditTextarea = $('#credit-field');
        this.creditTextareaValue = this.creditTextarea.val();
        this.textareaValue = this.textarea.val();
        var textareaValueLength = this.textareaValue.trim().length;
        return (textareaValueLength > 1);
    },
    //in progress
    activeButtonStyle : function () {
      if(this.textareaHasValue()) {
          $('#submit > button').toggleClass('active-button');
      }
    },
    submitIdea: function (event) {
        event.preventDefault();
        if(this.textareaHasValue()) {
            $('#submit').append('<p>Thanks for your submission, ' + this.creditTextareaValue + '!</p>');
            ga('send', 'event', 'ideas', 'click', this.textareaValue, 1);
            this.textarea.val('');
            this.creditTextarea.val('');
        } else {
            alert('Please enter your email address.');
        }
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