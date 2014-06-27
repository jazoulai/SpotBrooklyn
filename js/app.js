var sbk = sbk || {};

sbk.map = (function () {

    var map = L.mapbox.map('map', 'spotbrooklyn.i0onatsj', {
        attributionControl: false
    });

    var render_neighborhood_polygons_has_been_executed = false;
    var render_story_markers_has_been_executed = false;
    //wrapper that ensures neighborhood polygons are not duplicated
    // when story route is revisited.

    return {

        render_neighborhood_polygons: function (polygonNeighborhoods, storyNeighborhoods, neighborhoods) {


    /* INCOMPLETE: a test to offload the storage of neighborhood polygon to CartoDB
                   and to use CartoDb.js for its methods.

            cartodb.createLayer(map, {
                user_name: 'sbk',
                type: 'cartodb',
                sublayers: [
                    {
                        sql: "SELECT * FROM nyc_pediacities_neighborhoods_v3_polygon_2",
                        cartocss: '#table_name {polygon-fill: #F0F0F0; line-color: #000;}'
                    }
                ]
            })
                .addTo(map) // add the layer to our map which already contains 1 sublayer
                .done(function(layer) {
                    console.log(layer);
                });
    */


            if (!render_neighborhood_polygons_has_been_executed) {
                var neighborhoodPolygons = [];
                var neighborhoodsIntersection = _.intersection(polygonNeighborhoods, storyNeighborhoods);

                neighborhoodsIntersection.forEach(function (neighborhood) {
                    neighborhoodPolygons.push(neighborhoods.get(neighborhood).attributes);
                });

                function each_neighborhood_polygon(feature, layer) {
                    layer.on('click', function () {
                        var neighborhoodCenter = feature.properties.center_point;
                        var neighborhoodZoom = feature.properties.zoom_level;
                        map.setView(neighborhoodCenter, neighborhoodZoom);
                    });
                }

                var neighborhood_polygon_layer = L.geoJson(neighborhoodPolygons, {
                    onEachFeature: each_neighborhood_polygon
                });

                neighborhood_polygon_layer.addTo(map);

                render_neighborhood_polygons_has_been_executed = true;
            }

            map.on('zoomend', function () {
                if (map.getZoom() <= 12 && !map.hasLayer(neighborhood_polygon_layer)) {
                    map.addLayer(neighborhood_polygon_layer);
                } else if (map.getZoom() > 12 && map.hasLayer(neighborhood_polygon_layer)) {
                    map.removeLayer(neighborhood_polygon_layer);
                }
            });
        },
        render_story_markers: function (points) {
            if (!render_story_markers_has_been_executed) {
                function each_story_marker(feature, layer) {
                    layer.on('click', function () {
                        window.app.navigate('/spot/' + feature.id, {trigger: true});
                        map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 15);
                    });
                }

                var story_markers = L.geoJson(points, {
                    onEachFeature: each_story_marker
                });

                render_story_markers_has_been_executed = true;
            }

                map.on('zoomend', function () {
                    if (map.getZoom() >= 13 && !map.hasLayer(story_markers)) {
                        story_markers.addTo(map);
                    } else if (map.getZoom() >= 13 && !map.hasLayer(story_markers)) {
                        map.addLayer(story_markers)
                    } else if (map.getZoom() < 13 && map.hasLayer(story_markers)) {
                        map.removeLayer(story_markers);
                    }
                });

        },
        reset_map: function () {
            map.setView([40.685259, -73.977664], 10);
        }
    };
}());

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
    model: Stories,
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
    initialize: function () {
        this.model.on("reset", this.render, this);
    },
    render: function (eventName) {
        _.each(this.model.models, function (story) {
            $(this.el).append(new StoryListItemView({model: story}).render().el);
        }, this);
        return this;
    }
});

StoryListItemView = Backbone.View.extend({
    className: 'list_item',
    template: Handlebars.compile($('#list_item_template').html()),
    render: function (eventName) {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

StoryView = Backbone.View.extend({
    id: 'story_container',
    template: Handlebars.compile($('#story_template').html()),
    render: function (eventName) {
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
    routes: {
        "": "load_list",
        "story/:id": "load_story",
        "spot/:id": "load_spot"
    },
    initialize: function (neighborhoodsCollection, storyCollection, spotsCollection) {
        this.neighborhoodsCollection = neighborhoodsCollection;
        this.storyCollection = storyCollection;
        this.spotsCollection = spotsCollection;
    },
    load_list: function (id) {
        this.storyListView = new StoryListView({model: this.storyCollection});
        $('#content_container').html(this.storyListView.render().el);
        sbk.map.reset_map();
    },
    load_story: function (id) {
        this.story = this.storyCollection.get(id);
        this.storyView = new StoryView({model: this.story});
        this.neighborhoods = this.neighborhoodsCollection;
        this.neighborhoodsCollectionIds = this.neighborhoodsCollection.pluck('id');
        this.storyNeighborhoods = this.story.attributes.neighborhoods;
        this.spotMarkers = this.story.attributes.spotMarkers;
        $('#content_container').html(this.storyView.render().el);
        sbk.map.reset_map();
        sbk.map.render_neighborhood_polygons(this.neighborhoodsCollectionIds, this.storyNeighborhoods, this.neighborhoods);
        sbk.map.render_story_markers(this.spotMarkers);
        this.navigationView = new NavigationView({model: this.story});
        $('#nav').html(this.navigationView.render().el);
    },
    load_spot: function (id) {
        this.spot = this.spotsCollection.get(id);
        this.spotView = new SpotView({model: this.spot});
        $('#content_container').html(this.spotView.render().el);
        this.navigationView = new NavigationView({model: this.spot});
        $('#nav').html(this.navigationView.render().el);
    }
});

$(document).ready(function () {
    var neighborhoodsCollection = new NeighborhoodsCollection();
    neighborhoodsCollection.fetch({
        success: function () {
            var storyCollection = new StoryCollection();
            storyCollection.fetch({
                success: function () {
                    var spotsCollection = new SpotsCollection();
                    spotsCollection.fetch({
                        success: function () {
                            window.app = new AppRouter(neighborhoodsCollection, storyCollection, spotsCollection);
                            Backbone.history.start();
                        }
                    });
                }
            });
        }
    });
});