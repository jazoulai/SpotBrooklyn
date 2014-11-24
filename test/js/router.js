/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false, ga: false */

sbk.AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadList",
        "!": "loadList",
        "!:feelingsId": "loadFeelings"
    },

    initialize: function (feelingsCollection, storiesCollection) {
        this.feelingsCollection = feelingsCollection;
        this.storiesCollection = storiesCollection;
    },

    loadList: function () {
        this.contentDiv = $('#content');
        this.introView = new sbk.IntroView();
        this.FeelingsView = new sbk.FeelingsView({collection: this.feelingsCollection});

        this.contentDiv.html('');
        this.contentDiv.prepend(this.introView.render().el);
        this.contentDiv.append(this.FeelingsView.render().el);
    },

   loadFeelings: function (feelingId) {

        this.storiesView = new sbk.StoriesView({collection: this.storiesCollection, feelingId: feelingId});
        this.contentDiv.html('');
        this.contentDiv.append(this.storiesView.render().el);
    }
});