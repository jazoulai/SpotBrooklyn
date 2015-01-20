/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false, ga: false */

sbk.AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadList",
        "!": "loadList"
    },
    initialize: function (storyCollection) {
        this.storyCollection = storyCollection;
        sbk.Notifications = {};
        _.extend(sbk.Notifications, Backbone.Events);
    },
    loadList: function () {
        this.bodyElement = $('body');
        this.headerView = new sbk.HeaderView();
        this.followView = new sbk.FollowView();
        this.followView2 = new sbk.FollowView2();
        this.coverView = new sbk.CoverView();
        this.votingExplainedView = new sbk.VotingExplainedView();
        this.storyListView = new sbk.StoryListView({collection: this.storyCollection});
        this.contributionFormView = new sbk.ContributionFormView();

        this.bodyElement.html('');
        this.bodyElement.append(this.headerView.render().el);
        this.bodyElement.append(this.coverView.render().el);

        $('.bigtext').bigtext();

        this.bodyElement.append(this.votingExplainedView.render().el);
        this.bodyElement.append(this.storyListView.render().el);
        this.bodyElement.append(this.contributionFormView.render().el);
        this.bodyElement.append(this.followView.render().el);
        this.bodyElement.append(this.followView2.render().el);

        $('.follow').hide();
        $('.follow:last-of-type').show();
        $('.fa-thumbs-up:first-of-type').hide();
    }
});