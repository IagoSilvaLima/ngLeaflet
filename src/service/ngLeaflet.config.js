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