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
    }

    ,
    loadList: function () {
        this.bodyElement = $('body');
    // News View
        this.newsView = new sbk.NewsView({collection: this.storyCollection});
        this.bodyElement.append(this.newsView.render().el);
    // Partnership View
        this.partnershipsView = new sbk.PartnershipsView();
        this.bodyElement.append(this.partnershipsView.render().el);
    // About View
        this.aboutView = new sbk.AboutView();
        this.bodyElement.append(this.aboutView.render().el);
    }
});