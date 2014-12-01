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
        this.headerView = new sbk.HeaderView();
        this.introView = new sbk.IntroView();
        this.votingExplainedView = new sbk.VotingExplainedView();
        /*this.storyListView = new sbk.StoryListView({collection: this.storyCollection});
        this.contributionExplainedView = new sbk.ContributionExplainedView();
        this.contributionFormView = new sbk.ContributionFormView();
        this.followingExplainedView = new sbk.FollowingExplainedView();
        this.followView = new sbk.FollowView();
        this.sharingExplainedView = new sbk.SharingExplainedView();
        this.shareView = new sbk.ShareView();*/

        this.bodyElement.html('');
        this.bodyElement.append(this.headerView.render().el)
        this.bodyElement.append(this.introView.render().el);
        this.bodyElement.append(this.votingExplainedView.render().el);
        /*this.bodyElement.append(this.storyListView.render().el);
        this.bodyElement.append(this.contributionExplainedView.render().el);
        this.bodyElement.append(this.contributionFormView.render().el);
        this.bodyElement.append(this.followingExplainedView.render().el);
        this.bodyElement.append(this.followView.render().el);
        this.bodyElement.append(this.sharingExplainedView.render().el);
        this.bodyElement.append(this.shareView.render().el);*/
        //$('.bigtext').bigtext();


    }
});