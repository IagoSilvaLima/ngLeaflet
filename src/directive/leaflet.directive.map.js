(function(){
    'use strict';
    angular.module("ng-leaflet").directive("ngLeafletMap",ngLeafletMap);
    leafletMap.$inject = ["$leafletConfig","$leafletHelper","$leafletOptionsDefault",]

    function leafletMap($leafletConfig, $leafletHelper, $leafletOptionsDefault){
        return {
            restrict : "E",
            replace : true,
            scope:{
                ngConfig : "@",
                ngLeafletclick : "&"
            },
            template : "<div></div>",

            link : function(scope, element, attrs){
            var options =  $leafletOptionsDefault.setDefaults(scope.ngConfig.options);
                var map = new L.Map(element[0],options);
                $leafletConfig.setConfigurations(attrs, scope.config, element, map);
                if($leafletHelper.isDefined(scope.ngLeafletClick)){
                    map.on('click',function(e){
                        scope.ngLeafletClick({ event:e,map :map});
                    })        
                }
      
                var tileLayer = L.tileLayer(options.tileLayer,options.tileLayerOptions)
                map.addLayer(tileLayer);
                var points = L.layerGroup().addTo(map);
            }
        };
    }    
});