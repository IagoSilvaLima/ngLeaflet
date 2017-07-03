(function(){
    'use strict';
    angular.module("ng-leaflet").directive("leafletMap",ngLeafletMap);
    ngLeafletMap.$inject = ["$leafletConfig","$leafletHelper","$leafletOptionsDefault",]

    function ngLeafletMap($leafletConfig, $leafletHelper, $leafletOptionsDefault){
        return {
            restrict : "E",
            replace : true,
            scope:{
                ngConfig : "=",
                ngLeafletclick : "&"
            },
            template : "<div></div>",
            link : function(scope, element, attrs){
            var options =  $leafletOptionsDefault.setDefaults(scope.ngConfig.options);
                console.log(scope);
                var map = new L.Map(element[0],options);
                $leafletConfig.setConfigurations(attrs, scope.ngConfig, element, map);
                if($leafletHelper.isDefined(scope.ngLeafletclick)){
                    map.on('click',function(e){
                        scope.ngLeafletclick({ event:e,map :map});
                    })        
                }
      
                var tileLayer = L.tileLayer(options.tileLayer,options.tileLayerOptions)
                map.addLayer(tileLayer);
                var points = L.layerGroup().addTo(map);
            }
        };
    }    
})();