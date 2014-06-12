



initialize: function(neighborhoodsCollection, storyCollection){
    this.neighborhoodsCollection = neighborhoodsCollection;
    this.storyCollection = storyCollection;

}


var storyNeighborhoods = this.story.attributes.neighborhoods;

    storyNeighborhoods.forEach(function(neighborhood){

     var hood = this.neighborhoodsCollection.attributes;
     var nabe = [];
     var nabeGeo = [];


     for(var i = 0; i < _.size(hood); i++){
         nabe.push(this.neighborhoodsCollection.attributes[i].properties.neighborhood);

         nabeGeo.push(this.neighborhoodsCollection.attributes[i]);

         var filterNabe = $.inArray(neighborhood, nabe);

         if(filterNabe > -1){
            L.geoJson(nabeGeo).addTo(map);
         }else{
            console.log('not found')
         }
     }
 });

$(document).ready(function() {
    var neighborhoodsCollection = new NeighborhoodsCollection();
    neighborhoodsCollection.fetch({
        success: function(){
            var storyCollection = new StoryCollection();
            storyCollection.fetch({
                success: function () {
                var app = new AppRouter(neighborhoodsCollection, storyCollection);
                Backbone.history.start();
                }
            });
        }
    });
});