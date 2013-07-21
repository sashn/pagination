
;(function($) {

    "use strict";

    var Pagination = function (options) {
        this.init(options);
    }

    Pagination.prototype = {
        defaults: {
            currentPage: 1,
            pageCount: 10,
            selectorPrev: "a.prev",
            selectorNext: "a.next",
            selectorPage: "input.page",
            selectorPageCount: ".pagecount",
            selectorContent: ".content"
        },
        init: function (options) {
            this.options = $.extend({}, this.defaults, options);

            var o = this.options,
                that = this;

            $(o.selectorPrev).attr("href", that.getUrlForPreviousPage()).bind("click", function (e) {
                e.preventDefault();
                var $el = $(e.currentTarget);

                //if currentPage != first
                if (!that.isFirstPage()) {
                    console.log("go to prev page");

                    //--currentPage
                    o.currentPage -= 1;

                    //load content
                    that.loadAjaxResponseToContainer($el.attr("href"), o.selectorContent);
                    
                    //set new links for prev & next button
                    $(o.selectorPrev).attr("href", that.getUrlForPreviousPage());
                    $(o.selectorNext).attr("href", that.getUrlForNextPage());

                    //set new textfield value
                    $(o.selectorPage).val(o.currentPage);
                }
            });

            $(o.selectorNext).attr("href", that.getUrlForNextPage()).bind("click", function (e) {
                e.preventDefault();
                var $el = $(e.currentTarget);

                //if currentPage != first
                if (!that.isLastPage()) {
                    console.log("go to next page");

                    //--currentPage
                    o.currentPage += 1;

                    //load content
                    that.loadAjaxResponseToContainer($el.attr("href"), o.selectorContent);
                    
                    //set new links for prev & next button
                    $(o.selectorPrev).attr("href", that.getUrlForPreviousPage());
                    $(o.selectorNext).attr("href", that.getUrlForNextPage());

                    //set new textfield value
                    $(o.selectorPage).val(o.currentPage);
                }
            });

            $(o.selectorPage).val(o.currentPage).bind("blur", function (e) {
                e.preventDefault();

                //sanitize input

                //if valid new page

                //currentPage = new page

                //load content

                //set new links for prev & next button
            });

            // other init stuff

        },
        isFirstPage: function() {
            if (this.options.currentPage > 1) {
                return false;
            }
            return true;
        },
        isLastPage: function() {
            if (this.options.currentPage < this.options.pageCount) {
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
    }

    $.fn.pagination = function (param) {
        return this.each(function () {
            if (typeof param == "string") {
                $(this).data("pagination")[param]();
            } else {
                $(this).data("pagination", new Pagination(param));
            }
        });
    }

})(window.jQuery);