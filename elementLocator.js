// jQuery Plugin Boilerplate
// A boilerplate for jumpstarting jQuery plugins development
// version 1.1, May 14th, 2011
// by Stefan Gabos

(function($) {

    $.locateElement = function(element, options) {

        var defaults = {
          message: 'Hello world!',
          color: "red",
          autoplay: true,
          autoplay_speed: 1000,
          styling: "border: 3px solid red;",
          css_class: randomString(25)
        };

        var obj = this;

        obj.settings = {}
        obj.parents = [];
        obj.current = 0;
        obj.original_styles = "";
        obj.stop = false;
        var mainLoopId;
        var $element = $(element),
             element = element;
        //https://www.thepolyglotdeveloper.com/2015/03/create-a-random-nonce-string-using-javascript/
        function randomString(length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            for(var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }

        function addCss(cssCode) {
            var styleElement = document.createElement("style");
              styleElement.type = "text/css";
              if (styleElement.styleSheet) {
                styleElement.styleSheet.cssText = cssCode;
              } else {
                styleElement.appendChild(document.createTextNode(cssCode));
              }
              document.getElementsByTagName("head")[0].appendChild(styleElement);
        }
        
        obj.init = function() {
            obj.settings = $.extend({}, defaults, options);
            obj.parents = get_parents(element);
            addCss('.'+obj.settings.css_class+' { '+obj.settings.styling +'}');
            $(element).trigger('locateElement.init');
            if(obj.settings.autoplay === true){
                obj.play();
            }
        }

        obj.play = function() {
            $(element).trigger('locateElement.play');
            mainLoopId = setInterval(function(){
                obj.next();
            }, obj.settings.autoplay_speed);

        }
        obj.stop = function(){
            console.log("stopping");
            $(element).trigger('locateElement.stop');
            clearInterval(mainLoopId);
        }

        obj.previous = function() {
            if(obj.current - 1 >= 0){
                obj.current--;
            }
            else{
                obj.current = obj.parents.length-1;
            }
            $("."+obj.settings.css_class).removeClass(obj.settings.css_class);
            obj.showElement(obj.parents[obj.current]);
        }

        obj.next = function() {
            if(obj.current + 1 <= obj.parents.length -1){
                obj.current++;
            }
            else{
                obj.current = 0;
            }
            $("."+obj.settings.css_class).removeClass(obj.settings.css_class);
            obj.showElement(obj.parents[obj.current]);
        }

        obj.showElement = function(el){
          $(el).addClass(obj.settings.css_class);
          $(element).trigger('locateElement.showElement');
        }

        obj.restoreElement = function(el){
            $(el).removeClass(obj.settings.css_class);
        }

        var save_initial_styling = function(el){
            
        }

        var restore_initial_styling = function(el){
            
        }


        var get_parents = function(el) {
            var parents = [];
            var elementUnderTest = el;
            while(!$(elementUnderTest).is(document)){
                parents.push(elementUnderTest);
                elementUnderTest = $(elementUnderTest).parent();
            }

            return parents.reverse();
        }

        obj.init();

    }

    $.fn.locateElement = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('locateElement')) {
                var plugin = new $.locateElement(this, options);
                $(this).data('locateElement', plugin);
            }
        });

    }
})(jQuery);