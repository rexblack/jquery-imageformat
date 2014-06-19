(function ( $, window) {
  
  var pluginName = 'imageformat';
  
  var formats = {
    'small': {width: 320, height: 520}, 
    'medium': {width: 768, height: 1024}, 
    'large': {width: 1680, height: 1050}, 
    'big': {width: 1920, height: 1080}
  };
  
  var defaults = {
    attribute: 'src'
  };
  
  var pixelResolution = (function() {
  if (!window.devicePixelRatio || navigator.userAgent.toLowerCase().indexOf("android") != -1) {
    return {
      width: screen.width, 
      height: screen.height
    };
  }
  return {
    width: screen.width * window.devicePixelRatio,  
    height: screen.height * window.devicePixelRatio
  };
  })();

  function getUserFormat() {
    
    // convert to array
    var array = $.map(formats, function(value, index) {
      var obj = {
        name: index, width: value.width, height: value.height
      };
      return [obj];
    });
    
    // sort based on dimensions
    array.sort(function(a, b) {
      if (a.width > b.width && a.height > b.height) {
        return 1;
      } else if (a.width > b.width && a.height > b.height) {
        return -1;
      } else return 0;
    });
    
    
    var pw = Math.min(pixelResolution.width, pixelResolution.height);
    var ph = Math.max(pixelResolution.width, pixelResolution.height);
      
    // iterate to match format
    for (var i = 0; i < array.length; i++) {
      var f = array[i];
      
      var fw = Math.min(f.width, f.height);
      var fh = Math.max(f.width, f.height);
      if (fw <= pw && fh <= fh) {
        userFormat = f.name;
      }
    }
    
    return userFormat;
  }
  
  var userFormat = getUserFormat();
  
  
  
  var pluginMethod = function(element, options) {
    
    var $element = $(element);

    if (userFormat) {
      
      var data = $element.data();
      for (var i = 0; i < element.attributes.length; i++) {
        var attrNode = element.attributes[i];
        var attrName = attrNode.nodeName;
        var attrValue = attrNode.nodeValue;
        if (attrName.indexOf('data-src') == 0) {
          var f = attrName.substr('data-src'.length + 1);
          if (f == userFormat) {
            element.setAttribute(options.attribute, attrValue);
          }
          if (attrName != options.attribute) {
            element.removeAttribute(attrName);
            i--;
          }
          
        }
      }

    }
  };
  
  
  

  // register plugin
  
  $.fn[pluginName] = function(options) {
      
      options = $.extend({}, defaults, options);

      return this.each(function() {
  
          pluginMethod(this, options);
          
          return $(this);
  
    });

  };
  
  $.fn[pluginName].CLIENT_FORMAT = userFormat;
  
 
  $.fn[pluginName].setImageFormat = function(name, width, height) {
    formats[name] = {
      width: width, height: height
    };
    userFormat = getUserFormat();
  };
  
  $.fn[pluginName].removeImageFormat = function(name, width, height) {
    delete formats[name];
    userFormat = getUserFormat();
  };

})( jQuery, window );