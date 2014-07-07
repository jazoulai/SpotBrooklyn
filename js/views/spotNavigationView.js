/*jshint strict: false*/
/*globals Backbone: false, L: false, $: false, Handlebars: false, _: false, sbk: false */

sbk.SpotNavigationView = Backbone.View.extend({
    id: 'navigation_container',
    template: Handlebars.compile($('#spot_navigation_template').html()),
    render: function () {
        var self = this;
        var counter = 0;
        $(this.el).html(this.template(this.model.toJSON()));

        $(this.el).find('.story').on('click', function (e) {
            e.preventDefault();
            sbk.app.navigate(self.model.get('id'), { trigger: true } );
        });

        $(this.el).find('.next').on('click', function (e) {
            e.preventDefault();

            sbk.app.navigate(self.model.get('id') + '/' + self.model.get('spots')[counter++], { trigger: true });


        /*$(this.el).find('.previous').on('click', function (e) {
            e.preventDefault();

                sbk.app.navigate(self.model.get('id') + '/' + self.model.get('id')[counter++],
                    { trigger: true });


        });*/





        });


        return this;
    }
});