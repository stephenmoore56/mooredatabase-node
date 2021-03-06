var mooredatabaseCustom = {
    setNavPill: function () {
        'use strict';
        // first remove active class from pills
        $('.nav li')
        .each(function () {
            $(this)
            .removeClass('active');
        });
        // set appropriate pill to active
        var myHash = window.location.hash.split("/");
        if ($.inArray("orders", myHash) !== -1) {
            $('#ordersNavPill')
            .addClass('active');
        }
        if ($.inArray("months", myHash) !== -1) {
            $('#monthsNavPill')
            .addClass('active');
        }
        if ($.inArray("years", myHash) !== -1) {
            $('#yearsNavPill')
            .addClass('active');
        }
        if ($.inArray("species", myHash) !== -1) {
            $('#speciesNavPill')
            .addClass('active');
        }
        if ($.inArray("detail", myHash) !== -1) {
            $('#speciesNavPill')
            .addClass('active');
        }
        if ($.inArray("nodejs", myHash) !== -1 || window.location.hash === "") {
            $('#nodejsNavPill')
            .addClass('active');
        }
        if ($.inArray("angularjs", myHash) !== -1) {
            $('#angularjsNavPill')
            .addClass('active');
        }
        if ($.inArray("bootstrap", myHash) !== -1) {
            $('#bootstrapNavPill')
            .addClass('active');
        }
    }
};
(function () {
    'use strict';
    $(function () {
        // start up carousel and slideshow
        $("#photoCarousel")
        .carousel({
            interval: 5000
        })
        .show();
        $("#slideshow")
        .show()
        .cycle();
        // change active nav pill
        mooredatabaseCustom.setNavPill();

        // nav pills are different on tools page; no controller
        $('.toolPill').on('click', function () {
            $('.nav li').each(function () {
                $(this).removeClass('active');
            });
            $(this).addClass('active');
        });
    });
})();
