//  Air Pair Tasks
//      (1) Review and clarify current code
//      (2) General discussion about handling data:
//              (a) ajax
//              (b) localStorage
//              (c) database options
//              (d) connecting backbone model data with map data
//      (3) Discuss options for creating interaction between Backbone views and map.
//      (4) Refactor code to use json file for model data
//      (5) Discuss next steps
//
//
//QUESTION: is it necessary to use window.attribute syntax?
//NOTES:
window.Stories = Backbone.Model.extend();

window.StoryCollection = Backbone.Collection.extend({
    model:Stories,
    url: 'api/wines'
});

window.StoryListView = Backbone.View.extend({
    id: 'list_container',
//DOCUMENTATION: when you pass a function as a callback, its value for this is lost.
//QUESTION: (1) use 'bind' or 'on'?
//          (2) what does the 'this' argument do?
//NOTES:
    initialize:function () {
        this.model.bind("reset", this.render, this);
    },
//QUESTION: (1) can I remove the eventName argument?
//          (2) clarify 'model.models'?
//          (3) does the 'story' argument create a new 'sub-model' from the data?
//          (4) purpose of final 'this' argument in _.each function'?
//          (5) why return 'this'?
//NOTES:
    render:function (eventName) {
        _.each(this.model.models, function (story) {
            $(this.el).append(new StoryListItemView({model:story}).render().el);
        }, this);
        return this;
    }
});

window.StoryListItemView = Backbone.View.extend({
    className: 'list_item',
    template:_.template($('#list_item_template').html()),
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

window.StoryView = Backbone.View.extend({
    id: 'story_container',
    template:_.template($('#story_template').html()),
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

var AppRouter = Backbone.Router.extend({
    routes:{
        "":"list",
        "story/:id":"storyContent"
    },
    list:function () {
//QUESTION: is it necessary to use 'this' if there's only one instance of StoryCollection and StoryView?
//NOTES:
        this.storyListCollection = new StoryCollection();
        this.storyListView = new StoryListView({model:this.storyListCollection});
        this.storyListCollection.fetch();
        $('#content_container').html(this.storyListView.render().el);
    },
    storyContent:function (id) {
        this.story = this.storyListCollection.get(id);
//QUESTION: How does the new StoryView get the whole model with only an ID?
//NOTES:
        this.storyView = new StoryView({model:this.story});
        $('#content_container').html(this.storyView.render().el);
    }
});

var app = new AppRouter();
Backbone.history.start();

$(document).ready(function(){

    function ajaxResponse (){
        return $.get('js/data/geo_data.json');
    }

    ajaxResponse().done(function(geoData){
    var map = L.mapbox.map('map', 'spotbrooklyn.i3jb181a').setView([40.685259, -73.977664], 14);
        L.geoJson(geoData).addTo(map);
    });
});