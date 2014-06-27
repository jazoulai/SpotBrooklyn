/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.Map = Backbone.View.extend({

    initialize: function (collections) {
        this.storyCollection = collections.storyCollection;
        this.spotCollection = collections.spotCollection;
        this.neighborhoodCollection = collections.neighborhoodCollection;

        var lmap = this.lmap = L.mapbox.map('map', 'spotbrooklyn.i0onatsj', {
            attributionControl: false
        });

        var self = this;
        this.replaceNeighborhoodsLayer([]);

        lmap.on('zoomend', function () {
            if (lmap.getZoom() <= 12 && !lmap.hasLayer(self.neighborhoodsLayer)) {
                lmap.addLayer(self.neighborhoodsLayer);
            } else if (lmap.getZoom() > 12 && lmap.hasLayer(self.neighborhoodsLayer)) {
                lmap.removeLayer(self.neighborhoodsLayer);
            }
        });
    },

    replaceNeighborhoodsLayer: function (neighborhoodIds) {
        var self = this;
        if (this.neighborhoodsLayer) {
            this.lmap.removeLayer(this.neighborhoodsLayer);
        }
        this.neighborhoodsLayer = new L.GeoJSON([], {
            onEachFeature: function(feature, layer) {
                layer.on('click', function () {
                    self.lmap.setView(
                        feature.properties.center_point,
                        feature.properties.zoom_level
                    );
                });
            }
        });
        _.forEach(neighborhoodIds, function (id) {
            self.neighborhoodsLayer.addData(
                self.neighborhoodCollection.get(id).attributes
            );
        });
        this.lmap.addLayer(this.neighborhoodsLayer);
    },

    render: function (story) {
        var self = this;

        // Look for all neighborhoods in a story
        this.replaceNeighborhoodsLayer(story.get('neighborhoods'));
        this.renderStoryMarkers(story.get('spotMarkers'));
    },

    renderStoryMarkers: function (points) {
        var self = this;
        if (!this.render_story_markers_has_been_executed) {
            var story_markers = L.geoJson(points, {
                onEachFeature: function (feature, layer) {
                    layer.on('click', function () {
                        sbk.app.navigate('/spot/' + feature.id, {trigger: true});
                        self.map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 15);
                    });
                }
            });

            this.render_story_markers_has_been_executed = true;
        }

        this.lmap.on('zoomend', function () {
            if (self.lmap.getZoom() >= 13 && !self.lmap.hasLayer(story_markers)) {
                story_markers.addTo(self.lmap);
            } else if (self.lmap.getZoom() >= 13 && !self.lmap.hasLayer(story_markers)) {
                self.lmap.addLayer(story_markers);
            } else if (self.lmap.getZoom() < 13 && self.lmap.hasLayer(story_markers)) {
                self.lmap.removeLayer(story_markers);
            }
        });

    },
    reset_map: function () {
        this.lmap.setView([40.685259, -73.977664], 10);
    }
});