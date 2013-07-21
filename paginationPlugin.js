;(function($) {
    
    var methods = {

        init: function(options) {
            return this.each(function() {
                this.options = $.extend({}, $.fn.pagination.defaultOptions, options);
                console.log(this.options);

                var o = this.options;

                $(o.selectorPrev).bind("click", function (e) {
                    e.preventDefault();
                    var $el = e.currentTarget;

                    //if currentPage != first
                    if (!methods.isFirstPage(o.currentPage)) {
                        console.log("go to prev page");

                        //--currentPage
                        o.currentPage -= 1;

                        //load content
                        methods.loadAjaxResponseToContainer($el.attr("href"), o.selectorContent);
                        
                        //set new links for prev & next button
                        $(o.selectorPrev).attr("href", methods.getUrlForPreviousPage);
                        $(o.selectorNext).attr("href", methods.getUrlForNextPage);

                        //set new textfield value
                        $(o.selectorPage).val(o.currentPage);
                    }
                });

                $(o.selectorNext).bind("click", function (e) {
                    e.preventDefault();
                    var $el = e.currentTarget;

                    //if currentPage != first
                    if (!methods.isLastPage(o.currentPage, o.pageCount)) {
                        console.log("go to next page");

                        //--currentPage
                        o.currentPage += 1;

                        //load content
                        methods.loadAjaxResponseToContainer($el.attr("href"), o.selectorContent);
                        
                        //set new links for prev & next button
                        $(o.selectorPrev).attr("href", methods.getUrlForPreviousPage);
                        $(o.selectorNext).attr("href", methods.getUrlForNextPage);

                        //set new textfield value
                        $(o.selectorPage).val(o.currentPage);
                    }
                });

                $(o.selectorPage).bind("blur", function (e) {
                    e.preventDefault();

                    //sanitize input

                    //if valid new page

                    //currentPage = new page

                    //load content

                    //set new links for prev & next button
                });

                // other init stuff
            });
        },
        isFirstPage: function(page) {
            if (page > 1) {
                return false;
            }
            return true;
        },
        isLastPage: function(page, pageCount) {
            if (page < pageCount) {
                return false;
            }
            return true;
        },
        validatePage: function() {
            // ...
        },
        getUrlForNextPage: function() {
            if (!this.isLastPage()) {
                return this.getUrlForPage(this.options.currentPage+1);
            }
            return this.getUrlForPage(this.options.currentPage);
        },
        getUrlForPreviousPage: function() {
            if (!this.isFirstPage()) {
                return this.getUrlForPage(this.options.currentPage-1);
            }
            return this.getUrlForPage(this.options.currentPage);
        },
        loadAjaxResponseToContainer: function(ajaxUrl, containerSel) {
            console.log("loading content from "+ajaxUrl+" to "+containerSel);
        },
        getUrlForPage: function(page) {
            var currentUrl = window.location.href;

            if (page == 1) {
                //remove p parameter from url if present
                return currentUrl.replace(/\?p=[0-9]+&/, "?").replace(/[\?&]p=[0-9]+/, "");
            }

            if (currentUrl.match(/\?/) == null) {
                //no query string at all, add p parameter
                return currentUrl+"?p="+page;
            } else if (currentUrl.match(/[\?&]p=[0-9]+/) == null) {
                //query string without p parameter, so add it
                return currentUrl+"&p="+page;
            } else {
                //replace p parameter in query string
                return currentUrl.replace(/\?p=[0-9]+/, "?p="+page).replace(/[&]p=[0-9]+/, "&p="+page);
            }
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
        selectorPageCount: ".pagecount",
        selectorContent: ".content"
    };
    
})(jQuery);