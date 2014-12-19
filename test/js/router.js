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
        this.bodyElement = $('body');
        this.resultsSignupView = new sbk.ResultsSignupView();
        this.headerView = new sbk.HeaderView();
        this.followView = new sbk.FollowView();
        this.introView = new sbk.IntroView();
        this.votingExplainedView = new sbk.VotingExplainedView();
        this.storyListView = new sbk.StoryListView({collection: this.storyCollection});
        this.contributionFormView = new sbk.ContributionFormView();

        this.bodyElement.html('');
        this.bodyElement.append(this.resultsSignupView.render().el);
        $('#results-signup').hide();
        this.bodyElement.append(this.headerView.render().el);
        this.bodyElement.append(this.followView.render().el);
        $('#follow').hide();
        this.bodyElement.append(this.introView.render().el);
        this.bodyElement.append(this.votingExplainedView.render().el);
        this.bodyElement.append(this.storyListView.render().el);
        this.bodyElement.append(this.contributionFormView.render().el);
    }
});