var $body;

var isMobile = false; //initiate as false

// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;

function getWidth() {
    var myWidth = 0;
    if (typeof( window.innerWidth ) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
    } else if (document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientWidth )) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
    } else if (document.body && ( document.body.clientWidth || document.body.clientWidth )) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
    }
    return myWidth;
}

function getHeight() {
    var myHeight = 0;
    if (typeof( window.innerHeight ) == 'number') {
        //Non-IE
        myHeight = window.innerHeight;
    } else if (document.documentElement && ( document.documentElement.clientHeight || document.documentElement.clientHeight )) {
        //IE 6+ in 'standards compliant mode'
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && ( document.body.clientHeight || document.body.clientHeight )) {
        //IE 4 compatible
        myHeight = document.body.clientHeight;
    }
    return myHeight;
}

function transform() {
    var windowWidth = getWidth(),
        windowHeight = getHeight(),
        html = $('html');

    if (windowHeight > 320) {
        $('.column_left_delivery_content').show();
    }

    var scrolled,
        headerHeight = parseInt($('.page_header').height()),
        headerTopHeight = parseInt($('.top_wrapper').height());

    window.onscroll = function() {
        windowHeight = document.documentElement.clientHeight;
        scrolled = window.pageYOffset || document.documentElement.scrollTop;
        scrolled = parseInt(scrolled);

        var pageHeaderSmall = $('.page_header_small');
        var pageHeaderMobile = $('.head_wrapper');

        if (scrolled >= headerHeight) {
            pageHeaderSmall.addClass('page_header_small_show');
        } else {
            pageHeaderSmall.removeClass('page_header_small_show');
        }

        if (windowWidth < 768) {
            if (scrolled >= headerTopHeight) {
                pageHeaderMobile.addClass('head_wrapper_fix');
            } else {
                pageHeaderMobile.removeClass('head_wrapper_fix');
            }
        }
    };
}

$(window).resize(function() {
    transform();
});

$(document).ready(function() {
    transform();

    $body = $('body');

    /*
     * Разное
     */

     var eventtype = 'touchstart click',
		resetMenu = function() {
            $('.tooltip_container').removeClass('tooltip_container_open');
            $('.column_right_submenu_dropdown_content, .column_left_catalog').slideUp();
            $('.calendar_container').hide();
		},
		bodyClickFn = function(evt) {
			if (!$(evt.target).parents('.tooltip_container, .column_right_submenu_dropdown, .column_left_catalog_container, .column_right_catalog_header, .delivery_form_step_variant_date').length) {
				resetMenu();
				$(document).off(eventtype, bodyClickFn);
			}
		};

    $body.on('keyup keypress change', '.only_digit', function(e) {
        if (e.which == 13) {
        }
        if( e.which!=8 && e.which!=0 && (e.which<48 || e.which>57))
        {
            return false;
        }
    });

    $body.on('change', '.switcher_one input', function(){
        var self = $(this),
            label = self.closest('.switcher_one'),
            labelId = label.data('id');

        if ( self.is(':checked')) {
            label.siblings('.switcher_one').removeClass('switcher_one_active');
            label.addClass('switcher_one_active');

            if (labelId.length) {
                var contactsContainer = $('.contacts_container');

                contactsContainer.find('.contacts_content').hide();
                contactsContainer.find('#' + labelId).fadeIn(400);
            }
        }
    });

    $body.on('click', '.tab_link', function(e){
        e.preventDefault();

        var self = $(this),
            parent = self.parent(),
            id = self.attr('href');

        if ( !parent.hasClass('active')) {
            parent.siblings().removeClass('active');
            parent.addClass('active');
            $('.tab_content').hide().filter(id).fadeIn();

            if ( id === '#ur') {
                $('.club_card_content').hide();
                $('.ur_content').show();
            } else {
                $('.club_card_content').show();
                $('.ur_content').hide();
            }
            console.log(id);
            if ( id === '#tab_self') {
                $('.delivery_content').hide();
            } else {
                $('.delivery_content').show();
            }

        }
    });

    $body.on('click', '.question_one_link', function(e){
        e.preventDefault();

        var self = $(this),
            parent = self.closest('.question_one');

        if (!parent.hasClass('question_one_open')) {
            parent.addClass('question_one_open');
        } else {
            parent.removeClass('question_one_open');
        }
    });

    $body.on('click', '.catalog_open_link', function(e){
        e.preventDefault();

        var self = $(this),
            catalogMenu = self.parent().siblings('.column_left_catalog');

        if ( catalogMenu.is(':hidden')) {
            catalogMenu.slideDown();
            $(document).on(eventtype, bodyClickFn);
        } else if (!catalogMenu.parent().hasClass('column_left_catalog_container_open')) {
            catalogMenu.slideUp();
        }
    });

    $body.on('click', '.auth_user_link', function(e){
        e.preventDefault();

        var self = $(this),
            tooltipContainer = self.closest('.tooltip_container');

        if ( !tooltipContainer.hasClass('tooltip_container_open')) {
            $('.tooltip_container').removeClass('tooltip_container_open');
            tooltipContainer.addClass('tooltip_container_open');

            $(document).on(eventtype, bodyClickFn);

        } else {
            tooltipContainer.removeClass('tooltip_container_open');
        }
    });

    /*
     * Формы
     */

    $('.textInput_phone').mask("(999) 999-99-99");

    $body.on('click', '.form_open_link', function(e){
        e.preventDefault();

        var self = $(this),
            id = self.data('id'),
            formsContainer = $('#form_container');

        $('body, html').animate({scrollTop: 0});

        formsContainer.find('.form_content').hide();
        formsContainer.addClass('show').find('#' + id).show();
    });

    $body.on('click', '.form_close', function(e){
        e.preventDefault();

        $('.form_container').removeClass('show');
    });

    var recentlyViewedContainer = $('#recently_viewed_container');

    if (recentlyViewedContainer.length) {
        $body.on('focus', '#query', function(){
            recentlyViewedContainer.slideDown();
        }).on('blur', '#query', function(){
            recentlyViewedContainer.slideUp();
        }).on('keyup', '#query', function(){
            recentlyViewedContainer.slideUp();
        });
    }

    var availableTags = [
        'лампа',
        'ламинат',
        'ламинированный',
        'лампочки'
    ];
    $('#query').autocomplete({
        appendTo: '#search_form',
        source: availableTags
    });

    $body.on('click', '.calendar_control', function(){
        var self = $(this),
            parent = self.parent(),
            inputRadio = self.find('.variant_choose'),
            calendar = self.siblings('.calendar_container'),
            stepContainer = self.closest('.delivery_form_step');

        if (!parent.hasClass('delivery_form_step_variant_active')) {
            parent.addClass('delivery_form_step_variant_active');
            stepContainer.removeClass('delivery_form_step_error').addClass('delivery_form_step_done').find('.error').remove();
            parent.siblings().removeClass('delivery_form_step_variant_active');
            inputRadio.attr('checked', 'checked');
        }

        if (calendar.is(':hidden')) {
            calendar.css('display', 'table');
        }

        $(document).on(eventtype, bodyClickFn);
    });

    $body.on('click', '.calendar_day', function() {
        var self = $(this),
            calendar = self.closest('.calendar_container'),
            date = self.find('.calendar_date').text(),
            dateMonth = self.find('.calendar_month').data('month'),
            dateChoosenContainer = calendar.siblings('.calendar_control').find('.calendar_date_choosen');

        self.siblings().removeClass('active');
        self.addClass('active');
        dateChoosenContainer.find('.calendar_date_choosen_date').text(date);
        dateChoosenContainer.find('.calendar_date_choosen_month').text(dateMonth);
        calendar.hide();
    });

    /*
     * Меню в мобильных разрешениях
     */
    $body.on('click', '.head_menu', function(e) {
        e.preventDefault();

        var mobileNav = $('.column_right_mobile_navigation');

        if (mobileNav.is(':empty')){
            $('.top_items').clone().children().removeClass().addClass('column_right_mobile_navigation_item').appendTo('.column_right_mobile_navigation');
        }

        mobileNav.toggleClass('column_right_mobile_navigation_open');
    });

    /*
     * Для продуктов
     */

    $('.niceselect').selectOrDie({
        customClass: 'niceselect'
    });

    var filtersContainer = $('.filters_container');

    if (filtersContainer.length) {

        var filtersBlock = $('.filters_block');

        $body.on('click', '.filters_container_inner_link', function(e){
            e.preventDefault();

            var self = $(this),
                filterContainer = self.closest('.filters_container_inner');

            if (!filterContainer.hasClass('filters_container_inner_open')) {
                filterContainer.addClass('filters_container_inner_open');
            } else {
                filterContainer.removeClass('filters_container_inner_open')
            }

            var filtersBlockHeight = filtersBlock.height();

            filtersContainer.css('min-height', filtersBlockHeight + 20);
        });

        $body.on('change', '.filter_label input', function(){
            var self = $(this),
                filterContainer = self.closest('.filter_item');

            if ( self.is(':checked')) {
                $('.filter_quantity_container').fadeOut(function(){
                    $(this).remove();
                });
                filterContainer.append('<div class="filter_quantity_container">' +
                    '<p>Найдено 5 товаров</p>' +
                    '<a class="btn btn_orange full_width" href="#">Показать</a>' +
                    '</div>');
                filterContainer.find('.filter_quantity_container').fadeIn();
            } else {
                $('.filter_quantity_container').fadeOut(function(){
                    $(this).remove();
                });
            }
        });
    }

    $body.on('click', '.product_status', function(e){
        e.preventDefault();

        var self = $(this),
            tooltipContainer = self.closest('.tooltip_container');

        if ( !tooltipContainer.hasClass('tooltip_container_open')) {
            $('.tooltip_container').removeClass('tooltip_container_open');
            tooltipContainer.addClass('tooltip_container_open');

            $(document).on(eventtype, bodyClickFn);

        } else {
            tooltipContainer.removeClass('tooltip_container_open');
        }
    });

    $body.on('click', '.product_add_compare', function(e){
        var self = $(this);

        if ( !self.hasClass('active')) {
            e.preventDefault();
            self.addClass('active').find('span').text('Сравнить');
            self.find('svg').remove();
            self.append('<svg class="ic ic_compare"><use xlink:href="#compare"/></svg>');

            if (filtersContainer.length) {
                $('#compare_link').addClass('btn_compare_active');
            }
        }
    });

    $body.on('click', '.cart_row_delete_link', function(e){
        e.preventDefault();

        $(this).closest('.cart_row_content').remove();
    });

    $body.on(eventtype, '.cart_page_delete_all_link', function(e){
        e.preventDefault();

        var self = $(this),
            cartContent =  self.closest('.column_full').find('.tab_content:visible');

        cartContent.find('.cart_rows_list').remove();
    });

    $body.on('click', '.column_right_submenu_dropdown_link', function(e){
        e.preventDefault();

        var self = $(this),
            dropdownMenu = self.siblings('.column_right_submenu_dropdown_content');

        if ( dropdownMenu.is(':hidden')) {
            dropdownMenu.slideDown();
            $(document).on(eventtype, bodyClickFn);

        } else {
            dropdownMenu.slideUp();
        }
    });

    $('.icon_tooltip_link').each(function(){

        var self = $(this),
            tooltipContentHtml = self.next('.icon_tooltip_content').html();

        self.tooltipster({
            trigger: 'click',
            contentAsHTML: true,
            interactive: true,
            theme: 'tooltip_white',
            arrowColor: '#fff',
            position: 'top-left',
            offsetX: '-7px',
            offsetY: '5px',
            content: tooltipContentHtml
        });
    });


    if ( isMobile) {
        $body.on(eventtype, '.btn_filter', function(e){
            e.preventDefault();

            $('.filters_container').fadeIn();
        });

        $body.on(eventtype, '.btn_filters_apply', function(e){
            e.preventDefault();

            $('.filters_container').fadeOut();
        });

        $body.on(eventtype, '.column_left_delivery_subheader', function(e){
            e.preventDefault();

            var self = $(this),
                hiddeContent = self.siblings('.column_left_delivery_content');

            if (hiddeContent.is(':hidden')) {
                hiddeContent.slideDown();
                self.addClass('open');
            } else {
                hiddeContent.slideUp();
                self.removeClass('open');
            }
        });
    }

    /*
     * Валидация формы регистрации
     */
    jQuery.validator.addMethod('uncheck', function(value, element) {
        return this.optional(element) || !$(element).is(':checked');
    }, 'please uncheck');

    $('#registration').validate({
        rules: {
            firstName: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password : {
                minlength : 6
            },
            password2 : {
                minlength : 6,
                equalTo : '#password'
            },
            bot: {
                uncheck: true
            }
        },
        errorPlacement: function(error, element) { },
        highlight: function(element) {
            $(element).parent().addClass('field_error');
        },
        unhighlight: function(element) {
            $(element).parent().removeClass('field_error');
        },
        submitHandler: function(form) {
            form.submit();
        }
    });

    $body.on(eventtype, '.popup_open', function(e) {
        e.preventDefault();
       modalOpen($(this).attr('href'));
    });

    $body.on(eventtype, '.modal_close', function(e) {
        e.preventDefault();
        modalClose();
    });

    $body.on(eventtype, '.log_link', function(e) {
        e.preventDefault();

        var self = $('.log_link');

        if (!self.hasClass('active')) {
            self.addClass('active').html('<svg class="ic ic_eye_open"><use xlink:href="#eye_open"></use></svg> Отключить логирование');
        } else {
            self.removeClass('active').html('<svg class="ic ic_eye"><use xlink:href="#eye"></use></svg> Включить логирование');
        }
    });

});
function modalOpen(modalId){
    var modalOpened = $('.modal_container').filter(modalId);
    var aroundCbox;

    if (!$('#overlay').length) {
        $body.append('<div id="overlay"></div>');
        setTimeout(function(){
            $('#overlay').fadeIn(600);
        }, 200);
    }

    if (!$('.aroundCbox').length) {
        $body.append('<div class="aroundCbox"></div>');

        aroundCbox = $('.aroundCbox');
        aroundCbox.show();
        modalOpened.appendTo(aroundCbox);

        setTimeout(function(){
            modalOpened.addClass('modal_container_open');
        }, 200);


    }

    modalFix();
    overlayClose();
}

function modalClose() {
    $('#overlay').fadeOut(function(){
        $(this).remove();
    });

    var s = $('.modal_container_open');
    s.removeClass('modal_container_open');

    setTimeout(function(){
        $('.aroundCbox').replaceWith(s);

        $('html').css('overflow-y', 'scroll');
        $('body').css('marginRight', 0);
    }, 200);
}

function overlayClose() {
    $('.aroundCbox').on('click', function() {

        $(document).bind('click.myEvent', function(e) {
            if ($(e.target).find('.modal_container').length == 0) {

            } else {
                modalClose();
            }
        });

    });
}

function modalFix() {
    var $body = $('body');
    var oldBodyOuterWidth = $body.outerWidth(true);
    var $html = $('html');
    $html.css('overflow-y', 'hidden');
    var newBodyOuterWidth = $body.outerWidth(true);
    $body.css('margin-right', (newBodyOuterWidth - oldBodyOuterWidth) + 'px');
}

