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

        this.neighborhoodsLayer = new L.GeoJSON([]);
        this.spotMarkersLayer = new L.GeoJSON([]);

        lmap.on('zoomend', function (){
            self.showLayerForZoom();
        });
        self.showLayerForZoom();
    },

    replaceNeighborhoodsLayer: function (story) {
        var self = this;
        var neighborhoodIds = story.get('neighborhoods');
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

    renderSpotMarkers: function (story) {
        var self = this;
        if (this.spotMarkersLayer) {
            this.lmap.removeLayer(this.spotMarkersLayer);
        }
        var spots = self.spotCollection.filter(function (spot) {
            return _.contains(story.get('spots'), spot.id);
        });
        var spotGeometries = [];
        _.each(spots, function (spot) {
            var geometry = spot.get('geometry');
            geometry.id = spot.get('id');
            spotGeometries.push(geometry);
        });
        // var spotGeometries = _.invoke(spots, 'get', 'geometry');  // This wouldn't include spot IDs.
        this.spotMarkersLayer = new L.GeoJSON(spotGeometries, {
            onEachFeature: function (feature, layer) {
                layer.on('click', function () {
                    sbk.app.navigate(story.id + '/' + feature.id, {trigger: true});
                });
            }
        });
    },

    renderStory: function (story) {
        var self = this;

        self.replaceNeighborhoodsLayer(story);
        self.renderSpotMarkers(story);
        self.showLayerForZoom();
    },

    zoomToSpot: function (spot) {
        var self = this;
        self.lmap.setView([
            spot.get('geometry').coordinates[1],
            spot.get('geometry').coordinates[0]
        ], 15);
        self.showLayerForZoom();
    },

    /**
     * Show the neighborhoods layer if we're below or at zoom 12,
     * and the spotMarkers layer otherwise.
     */
    showLayerForZoom: function () {
        var self = this,
            hasNeighborhoods = self.lmap.hasLayer(self.neighborhoodsLayer),
            hasSpotMarkers = self.lmap.hasLayer(self.spotMarkersLayer);

        // Show a layer iff a layer is already being shown
        if (hasNeighborhoods || hasSpotMarkers) {
            if(self.lmap.getZoom() <= 12){
                if (!hasNeighborhoods) {
                    self.lmap.addLayer(self.neighborhoodsLayer);
                }
                if (hasSpotMarkers) {
                    self.lmap.removeLayer(self.spotMarkersLayer);
                }
            } else {
                if (hasNeighborhoods) {
                    self.lmap.removeLayer(self.neighborhoodsLayer);
                }
                if (!hasSpotMarkers) {
                    self.lmap.addLayer(self.spotMarkersLayer);
                }
            }
        }
    },

    resetMap: function () {
        var self = this;
        self.lmap.setView([40.685259, -73.977664], 10);
        self.lmap.removeLayer(self.neighborhoodsLayer);
        self.lmap.removeLayer(self.spotMarkersLayer);
    }
});
