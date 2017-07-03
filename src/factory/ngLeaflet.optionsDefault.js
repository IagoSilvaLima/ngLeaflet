(function(){
    'use strict';

    angular.module('ng-leaflet').factory("$leafletOptionsDefault",$leafletOptionsDefault);

    $leafletOptionsDefault.$inject = ['$leafletHelper'];

    function leafletOptionsDefault($leafletHelper){

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