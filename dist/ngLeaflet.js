angular.module("ng-leaflet",[]);
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
(function(){
    'use strict';

    angular.module('ng-leaflet').factory("$leafletOptionsDefault",$leafletOptionsDefault);

    $leafletOptionsDefault.$inject = ['$leafletHelper'];

    function $leafletOptionsDefault($leafletHelper){

        return {
            getOptionsDefault : function(){
                return _getDefaults();        
            },
            setDefaults : function(customOptions){
                var newOptions = _getDefaults();
                if ($leafletHelper.isDefined(customOptions)){
                    newOptions.keyboard = $leafletHelper.isDefined(customOptions.keyboard) ? customOptions.keyboard : newOptions.keyboard;
                    newOptions.dragging = $leafletHelper.isDefined(customOptions.dragging) ? customOptions.dragging : newOptions.dragging;
                    newOptions.zoomControl = $leafletHelper.isDefined(customOptions.zoomControl) ? customOptions.zoomControl : newOptions.zoomControl;
                    newOptions.tileLayer = $leafletHelper.isDefined(customOptions.tileLayer) ? customOptions.tileLayer : newOptions.tileLayer;
                }
                
                return newOptions;
            }

        }

        function _getDefaults(){
            return {
                    keyboard : true,
                    dragging : true,
                    zoomControl : true,
                    tileLayer : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    tileLayerOptions : {
                        attribution : 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    }
            }
        }
    }    
        
})();
(function(){
    'use strict';
    angular.module('ng-leaflet').service('$leafletConfig',$leafletConfig);

    $leafletConfig.$inject = ['$leafletHelper'];

    function $leafletConfig($leafletHelper){
        var self = this;
        self.setConfigurations = _setConfigurations;


        function _definePosition(config, map){
            if ($leafletHelper.isDefined(config.center)){
                var latitude = $leafletHelper.isDefined(config.center.lat) ? config.center.lat : -3.71839;
                var longitude = $leafletHelper.isDefined(config.center.lgt) ? config.center.lgt : -38.5434; 
                var zoom = $leafletHelper.isDefined(config.center.zoom) ? config.center.zoom : 9;
                map.setView([latitude, longitude], zoom);
            }
            _setGeoLocate(config, map);
        }

        function _defineZoomControlPosition(config, map){
            if($leafletHelper.isDefined(config.zoomControlPosition)){
                map.zoomControl.setPosition(config.zoomControlPosition);
            };
        }

        function _setConfigurations(attrs, config, element, map){
            _updateSize(attrs,element);
            _definePosition(config, map);
            _defineZoomControlPosition(config, map);
        }

        function _setGeoLocate(config, map){
            if(config.geoLocate)
                map.locate({setView : true});
        }

        function _updateSize(attrs, element){
            if($leafletHelper.isDefined(attrs.width)){
                var width = isNaN(attrs.width) ? attrs.width : attrs.width + 'px';
                element.css('width',width);
            }
                
            if($leafletHelper.isDefined(attrs.height)){
                var height = isNaN(attrs.height) ? attrs.height : attrs.height + 'px';
                element.css('height',height);
            }   
        }


    };
})();
(function(){
    'use strict';
    angular.module('ng-leaflet').service('$leafletHelper',$leafletHelper);

    function $leafletHelper(){
        var self = this;
        self.isDefined = function(value){
            return angular.isDefined(value) && value !== null;
        }
    }
})();