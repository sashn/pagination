;(function($) {
    
    var methods = {

        init: function(options) {
            return this.each(function() {
                this.options = $.extend({}, $.fn.pagination.defaultOptions, options);
                console.log("asd");
                // other init stuff
            });
        },
        validatePage: function() {
            // ...
        },
        getUrlForNextPage: function() {
            // ...
        },
        getUrlForPreviousPage: function() {
            // ...
        },
        loadUrlContent: function() {
            // ...
        },
        getUrlForPage: function(page) {
            // ...
        }
        // ...
    };
    
    $.fn.pagination = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method '+method+' does not exist on jQuery.pagination');
        }
    };
    
    $.fn.pagination.defaultOptions = {
        currentPage: 1,
        pageCount: 10,
        selectorPrev: "a.prev",
        selectorNext: "a.next",
        selectorPage: "input.page",
        selectorPageCount: ".pagecount"
    };
    
})(jQuery);