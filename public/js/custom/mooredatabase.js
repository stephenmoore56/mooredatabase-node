(function() {
    'use strict';
    $(function() {
        let myHash;
        $("#photoCarousel")
            .carousel({
                interval: 5000
            })
            .show();
        $("#slideshow")
            .show();
        $('#toolsNav a')
            .on('click', function() {
                $('#toolsNav li')
                    .each(function() {
                        $(this)
                            .removeClass('active');
                    });
                $(this)
                    .parent()
                    .addClass('active');
            });
        $('#toolsNav li')
            .each(function() {
                $(this)
                    .removeClass('active');
            });
        myHash = window.location.hash.split("/");
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
        $("#slideshow")
            .cycle();
    });
})();