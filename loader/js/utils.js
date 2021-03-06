define('utils', function() {
    // Taken from underscore.js by Jeremy Ashkenas
    var nativeForEach = Array.prototype.forEach;
    var slice = Array.prototype.slice;

    var each = function(obj, iterator, context) {
        if (!obj) {
            return;
        }

        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, l = obj.length; i < l; i++) {
                if (i in obj && iterator.call(context, obj[i], i, obj) === {}) {
                    return;
                }
            }
        } else {
            for (var key in obj) {
                if (has(obj, key)) {
                    if (iterator.call(context, obj[key], key, obj) === {}) {
                        return;
                    }
                }
            }
        }
    };

    var extend = function(obj) {
        each(slice.call(arguments, 1), function(source) {
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        });
        return obj;
    };

    var getBaseUrl = function() {
        var scripts = document.getElementsByTagName('script');
        var element;
        var src;

        for (var i = 0; i < scripts.length; i++) {
            element = scripts[i];
            src = element.src;

            if (src && /\/toneden\.loader\.js/.test(src)) {
                return src.replace(/toneden\.loader\.js$/, '');
            }
        }

        return null;
    }

    var loadStylesheet = function(url) {
        var link = document.createElement('link');
        var entry = document.getElementsByTagName('script')[0];

        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;

        entry.parentNode.insertBefore(link, entry);
    };

    return {
        getBaseUrl: getBaseUrl,
        extend: extend,
        loadStylesheet: loadStylesheet
    };
});
