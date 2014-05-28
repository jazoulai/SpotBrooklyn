window.Wine = Backbone.Model.extend();

window.WineCollection = Backbone.Collection.extend({
    model:Wine,
    url: 'api/wines'
});

window.WineListView = Backbone.View.extend({
    id: 'list_container',
    initialize:function () {
        this.model.bind("reset", this.render, this);
    },
    render:function (eventName) {
        _.each(this.model.models, function (wine) {
            $(this.el).append(new WineListItemView({model:wine}).render().el);
        }, this);
        return this;
    }
});

window.WineListItemView = Backbone.View.extend({
    className: 'list_item',
    template:_.template($('#list_item_template').html()),
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

window.WineView = Backbone.View.extend({
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
        "wines/:id":"wineDetails"
    },
    list:function () {
        this.wineList = new WineCollection();
        this.wineListView = new WineListView({model:this.wineList});
        this.wineList.fetch();
        $('#content_container').html(this.wineListView.render().el);
    },
    wineDetails:function (id) {
        this.wine = this.wineList.get(id);
        this.wineView = new WineView({model:this.wine});
        $('#content_container').html(this.wineView.render().el);
    }
});

var app = new AppRouter();
Backbone.history.start();

$(document).ready(function(){

    function ajaxResponse (){
        return $.get('js/data/geo_data.json');
    }

    ajaxResponse().done(function(geoData){
        console.log(geoData);

    var map = L.mapbox.map('map', 'spotbrooklyn.i3jb181a').setView([40.685259, -73.977664], 14);
        L.geoJson(geoData).addTo(map);
    });
});