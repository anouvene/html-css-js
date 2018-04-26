var App = {

    _isWithTooltips: false,

    init: function () {
        App._tableSorters()
        App._tooltips()

        $(window).on('resize', App._tooltips)
    },

    _backToTopButton: function () {
        if ($(window).scrollTop() > $(window).height()) {
            $('.docs-top').fadeIn()
        } else {
            $('.docs-top').fadeOut()
        }
    },

    _tooltips: function () {
        if ($(window).width() > 768) {
            if (App._isWithTooltips) return
            App._isWithTooltips = true
            $('[data-toggle="tooltip"]').tooltip()

        } else {
            if (!App._isWithTooltips) return
            App._isWithTooltips = false
            $('[data-toggle="tooltip"]').tooltip('destroy')
        }

    },

    _tableSorters: function () {
        $('[data-sort="table"]').tablesorter( {sortList: [[1,0]]} )
    }
}

App.init();

$(function () {
    // execute/clear BS loaders for docs
    while (window.BS && window.BS.loader && window.BS.loader.length) {
        (window.BS.loader.pop())()
    }

    // Select picker
    $('.selectpicker').selectpicker();

    // Input type file
    $(document).on('change', ':file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);

        $(':file').on('fileselect', function(event, numFiles, label) {

            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;

            if( input.length ) {
                input.val(log);
            } else {
                if( log ) alert(log);
            }

        });
    });

    // Modal
    /*$("#loginModal-light").modal();*/

    // Navbar toggler
    $('#toggler').on('click', function(){
            $('#nav-toggleable-md').slideToggle();
    });

    // New request : edit article
    $('#articles').find('tr>td>.edit').each(function(index){
        $(this).on('click', function(e){
            e.preventDefault();
            $('.article-edit').hide();
            $(this).parents('.article'+(index+1)).siblings('.article'+(index+1)+'-edit').show();

        });
    });

    //$( window ).resize(function() {
      //$(".table-responsive").mCustomScrollbar("update");
   // });

});

