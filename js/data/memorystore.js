window.store = {

    stories: [],

    populate: function () {

        this.stories[1] = {
            id: 1,
            headline: "Fake Headline #1",
            date: "5/12/2014",
            copy: "Axonas velum in cirpi!",
            picture: "saint_cosme.jpg"
        };
        this.stories[2] = {
            id: 2,
            headline: "Fake Headline #2",
            date: "5/11/2014",
            copy: "Contencios ridetis, tanquam secundus gabalium.",
            picture: "saint_cosme.jpg"
        };
        this.stories[3] = {
            id: 3,
            headline: "Fake Headline #3",
            date: "5/10/2014",
            copy: "Burguss nocere!",
            picture: "saint_cosme.jpg"
        };
    },

    findAll: function () {
        return _.values(this.stories);
    }

};

store.populate();

Backbone.sync = function (method, model, options) {
        var response = store.findAll();
        options.success(response);
};