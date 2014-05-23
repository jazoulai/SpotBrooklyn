var Model = Backbone.Model.extend({
    urlRoot: 'data.json'
});

var View = Backbone.View.extend({
   initialize: function(){
       var _thisView = this;
       this.model.fetch().done(function(){
           _thisView.render();
       });
   },
    template: _.template($('#search_template').html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var myModel = new Model({});
var myView = new View({
    model: myModel,
    el: $('#search_container')
});