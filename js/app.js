var sbk = sbk || {};

sbk.map = (function () {
    var map = L.mapbox.map('map', 'spotbrooklyn.i3jb181a');
    var neighborhoodPolygons = [];
    return {
        reset_map: function(){
            map.setView([40.685259, -73.977664], 10);
        },
        clear_map: function(){
            if(current_story_layer != null && map.hasLayer(current_story_layer)){
                map.removeLayer(current_story_spots).setView([40.685259, -73.977664], 10);
            }
        },
        render_neighborhood_polygons: function(polygonNeighborhoods, storyNeighborhoods, neighborhoods){
             var neighborhoodsIntersection = _.intersection(polygonNeighborhoods, storyNeighborhoods);
             neighborhoodsIntersection.forEach(function(neighborhood){
                 neighborhoodPolygons.push(neighborhoods.get(neighborhood).attributes);
             });
            L.geoJson(neighborhoodPolygons).addTo(map);
        }
    };
} ());



sbk.map.reset_map();




var current_story_spots = null;
var current_story_layer = null;
var polygon_layer = null;





/*map.on('zoomend', function () {
    if(current_story_spots != null) {
        if (map.getZoom() <= 12 && map.hasLayer(current_story_layer)) {
            map.removeLayer(current_story_layer);
        } else if (map.getZoom() > 12 && !map.hasLayer(current_story_layer)) {
            map.addLayer(current_story_layer);
        }
    }
});

map.on('zoomend', function () {
    if(current_story_spots != null) {
        if (map.getZoom() <= 12 && !map.hasLayer(polygon_layer)) {
            map.addLayer(polygon_layer);
        } else if (map.getZoom() > 12 && map.hasLayer(polygon_layer)) {
            map.removeLayer(polygon_layer);
        }
    }
});*/

Neighborhoods = Backbone.Model.extend();

NeighborhoodsCollection = Backbone.Collection.extend({
    model: Neighborhoods,
    url: 'js/data/neighborhoods2.json'
});


Stories = Backbone.Model.extend({
    defaults: {
        back_button_href: "",
        back_button_text: "< Home"
    }
});

StoryCollection = Backbone.Collection.extend({
    model:Stories,
    url: 'js/data/story_data.json'
});

Spots = Backbone.Model.extend({
});

SpotsCollection = Backbone.Collection.extend({
    model: Spots,
    url: 'js/data/pigeon_fanciers.json'
});

StoryListView = Backbone.View.extend({
    id: 'list_container',
    initialize:function () {
        this.model.on("reset", this.render, this);
    },
    render:function (eventName) {
        _.each(this.model.models, function (story) {
            $(this.el).append(new StoryListItemView({model:story}).render().el);
        }, this);
        return this;
    }
});

StoryListItemView = Backbone.View.extend({
    className: 'list_item',
    template: Handlebars.compile($('#list_item_template').html()),
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

StoryView = Backbone.View.extend({
    id: 'story_container',
    template: Handlebars.compile($('#story_template').html()),
    render:function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

SpotView = Backbone.View.extend({
    id: 'spot_container',
    template: Handlebars.compile($('#spot_template').html()),
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

NavigationView = Backbone.View.extend({
    id: 'navigation_container',
    template: Handlebars.compile($('#navigation_template').html()),
    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

var AppRouter = Backbone.Router.extend({
    routes:{
        "":"load_list",
        "story/:id":"load_story",
        "spot/:id":"load_spot"
    },
    initialize: function(neighborhoodsCollection, storyCollection, spotsCollection){
        this.neighborhoodsCollection = neighborhoodsCollection;
        this.storyCollection = storyCollection;
        this.spotsCollection = spotsCollection;

    },
    load_list:function (id) {
        this.storyListView = new StoryListView({model:this.storyCollection});
        $('#content_container').html(this.storyListView.render().el);
        sbk.map.reset_map();
        sbk.map.clear_map();
    },
    load_story:function (id) {
        this.story = this.storyCollection.get(id);
        this.storyView = new StoryView({model:this.story});
        $('#content_container').html(this.storyView.render().el);

        this.neighborhoods = this.neighborhoodsCollection;
        this.neighborhoodsCollectionIds = this.neighborhoodsCollection.pluck('id');
        this.storyNeighborhoods = this.story.attributes.neighborhoods;
        sbk.map.render_neighborhood_polygons(this.neighborhoodsCollectionIds, this.storyNeighborhoods, this.neighborhoods);












        function onEach_neighborhoodPolygon(feature, layer) {
            layer.on('click', function () {
                var neighborhoodCenter = feature.properties.center_point;
                var neighborhoodZoom = feature.properties.zoom_level;
                map.setView(neighborhoodCenter, neighborhoodZoom);
                renderSpots();
            });
        }
        function onEach_spotMarker(feature, layer) {//set spot href onclick
            layer.on('click', function () {
                location.href = '#/spot/' + feature.id;
            });
        }

        function renderSpots(){ //render spot markers onto the map.
            window.current_story_layer = L.geoJson(current_story_spots, {
                onEachFeature: onEach_spotMarker
            }).addTo(map);
        }


        populate_array_for_neighborhood_polygons();
        sbk.map.clear_map();

       if(!map.hasLayer(polygon_layer)) {

            window.polygon_layer = L.geoJson(neighborhoodPolygons, {
                onEachFeature: onEach_neighborhoodPolygon
            }).addTo(map);

        }

        //instantiate and render NavigationView with stories object as model
        this.navigationView = new NavigationView({model:story});
        $('#nav').html(this.navigationView.render().el);*/
    },
    load_spot: function (id){

        var spot = this.spotsCollection.get(id);
        this.spotView = new SpotView({model:spot});
        $('#content_container').html(this.spotView.render().el);

        if(map.hasLayer(polygon_layer)){
            map.removeLayer(polygon_layer);
        }
        if(!map.hasLayer(current_story_layer)){

            function onEach_spotMarker(feature, layer) {//set spot href onclick
                layer.on('click', function () {
                    location.href = '#/spot/' + feature.id;
                });
            }
            function renderSpots(){ //render spot markers onto the map.
                window.current_story_layer = L.geoJson(current_story_spots, {
                    onEachFeature: onEach_spotMarker
                }).addTo(map);
            }
            renderSpots();
        }
        map.setView(spot.attributes.center_point, 15);


        this.navigationView = new NavigationView({model:spot});
        $('#nav').html(this.navigationView.render().el);
    }
});

$(document).ready(function() {



    var neighborhoodsCollection = new NeighborhoodsCollection();
    neighborhoodsCollection.fetch({
        success: function(){
            var storyCollection = new StoryCollection();
            storyCollection.fetch({
                success: function () {
                    var spotsCollection = new SpotsCollection();
                    spotsCollection.fetch({
                        success: function(){
                            var app = new AppRouter(neighborhoodsCollection, storyCollection, spotsCollection);
                            Backbone.history.start();
                        }
                    });
                }
            });
        }
    });


});