/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false, ga: false */

sbk.AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadList",
        "!": "loadList"
    },

    initialize: function (feelingsCollection, storiesCollection) {
        this.feelingsCollection = feelingsCollection;
        this.storiesCollection = storiesCollection;
    },

    loadList: function () {
        this.contentDiv = $('#content');
        this.introView = new sbk.IntroView();
        this.feelingsView = new sbk.FeelingsView({collection: this.feelingsCollection});

        this.contentDiv.html('');
        this.contentDiv.prepend(this.introView.render().el);
        this.contentDiv.append(this.feelingsView.render().el);
    }
});