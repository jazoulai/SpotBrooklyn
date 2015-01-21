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

        this.votingExplainedView = new sbk.VotingExplainedView();
        this.bodyElement.append(this.votingExplainedView.render().el);

        this.storyListView = new sbk.StoryListView({collection: this.storyCollection});
        this.bodyElement.append(this.storyListView.render().el);

        this.contributionFormView = new sbk.ContributionFormView();
        this.bodyElement.append(this.contributionFormView.render().el);

        $('.fa-thumbs-up:first-of-type').hide();
    }
});