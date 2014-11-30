/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false, ga: false */

sbk.AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadList",
        "!": "loadList"
    },

    initialize: function (storyCollection) {
        this.storyCollection = storyCollection;
    },

    loadList: function () {
        this.contentDiv = $('#content');
        this.introView = new sbk.IntroView();
        this.votingExplainedView = new sbk.VotingExplainedView();
        this.storyListView = new sbk.StoryListView({collection: this.storyCollection});
        this.signupExplainedView = new sbk.SignupExplainedView();
        this.signupFormView = new sbk.SignupFormView();

        this.contentDiv.html('');
        this.contentDiv.prepend(this.introView.render().el);
        this.contentDiv.append(this.votingExplainedView.render().el);
        this.contentDiv.append(this.storyListView.render().el);
        this.contentDiv.append(this.signupExplainedView.render().el);
        this.contentDiv.append(this.signupFormView.render().el);
        $('.bigtext').bigtext();


    }
});