/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.MapView = Backbone.View.extend({

    initialize: function (collections) {
        this.storyCollection = collections.storyCollection;
        this.spotCollection = collections.spotCollection;
        this.neighborhoodCollection = collections.neighborhoodCollection;

        var lmap = this.lmap = L.mapbox.map('map', 'spotbrooklyn.3xa8n79b', {
            attributionControl: false
        });

        var self = this;

        this.replaceNeighborhoodsLayer([]);
        this.renderStoryMarkers([]);

        lmap.on('zoomend', function (){
            if(lmap.getZoom() <=12){
                lmap.addLayer(self.neighborhoodsLayer);
                lmap.removeLayer(self.storyMarkers);
            } else if (lmap.getZoom() > 12) {
                lmap.removeLayer(self.neighborhoodsLayer);
                lmap.addLayer(self.storyMarkers);
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

    renderStoryMarkers: function (points) {
        var self = this;
        this.storyMarkers = L.geoJson(points, {
            onEachFeature: function (feature, layer) {
                layer.on('click', function () {
                    sbk.app.navigate('/spot/' + feature.id, {trigger: true});
                    self.lmap.setView([
                        feature.geometry.coordinates[1],
                        feature.geometry.coordinates[0]],
                        15);
                });
            }
        });
    },

    renderMap: function (story) {
        var self = this;

        this.replaceNeighborhoodsLayer(story.get('neighborhoods'));
        this.renderStoryMarkers(story.get('spotMarkers'));
    },

    resetMap: function () {
        var self = this;
        self.lmap.setView([40.685259, -73.977664], 10);
    }
});