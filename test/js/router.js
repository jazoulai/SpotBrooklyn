/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false, ga: false */

sbk.AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadList",
        "!": "loadList"
    },

    initialize: function (feelingsCollection) {
        this.feelingsCollection = feelingsCollection;
    },

    loadList: function () {
        this.contentDiv = $('#content');
        this.introView = new sbk.IntroView();
        this.feelingsView = new sbk.FeelingsView({collection: this.feelingsCollection});
        this.votingExplainedView = new sbk.VotingExplainedView();

        this.contentDiv.html('');
        this.contentDiv.prepend(this.introView.render().el);
        this.contentDiv.append(this.votingExplainedView.render().el);
        this.contentDiv.append(this.feelingsView.render().el);

        $('#bigtext').bigtext();

    }
});