//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require jquery.cookie
//= require_tree .

$(document).ready(function () {
    var phone_field = $('#contact_phone'),
        click_to_call = $('.click-to-call'),
        zip_field = $('#contact_zip_code'),
        phone_number, zip_code;

    // http://detectmobilebrowsers.com/ by Chad Smith (Licensed under Unlicense http://unlicense.org/)
    function mobileCheck() {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    $('#contact_phone, #contact_zip_code').on('keyup', function () {
        phone_number = phone_field.val().match(/[0-9]/g) || [];
        zip_code = zip_field.val().length ? zip_field.val().match(/[0-9]/g).join('') : [];
        if ((phone_number.length >= 10 || !phone_field.filter(':visible').length ) && zip_code.length >= 5) {
            click_to_call.removeClass('disabled');
        } else {
            click_to_call.addClass('disabled');
        }
    });

    function setZip(zip) {
        $.cookie('zip', zip, {path: '/', expires: 365})
        $('#contact_zip_code').val(zip).trigger('keyup')
    }

    var zip_code = $.cookie('zip');

    if (window.geoip2 && !zip_code) {
        geoip2.cityISPOrg(function (result) {
            if (result.country.iso_code == "US")
                setZip(result.postal.code)
        }, function (error) {
            try {
                console.log(error);
            } catch (e) {
                // ignored
            }
        });
    } else {
        setZip(zip_code)
    }

    phone_field.trigger('keyup');

    $(document).on('cp-results-processed', function () {
        var iframe = top.$(top.document).find('iframe');

        // Show the iframe so the height is calculated accurately.
        iframe.show();
        // Resize the iframe.
        iframe.css('height', $('#content').height() + "px");

        if (mobileCheck()) {
            $('.number').each(function (i, ele) {
                var number_ele = $(ele);
                number_ele.find('h2').wrap('<a href="tel:1' + number_ele.data('plain-number') + '" class="text-success"></a>');
            })
        }
    });

    $(document).on('click', '.click-to-call:not(.disabled)', function (event) {
        event.preventDefault();

        var currently_insured = $('#contact_currently_insured_yes:checked').length ? 'yes' : 'no';
        if ($('#contact_call_me_now_yes:checked').length) {
            window.callpixels.call(phone_field.val(), null, {geo: 'us-' + zip_code, ai_currently_insured: currently_insured});
            alert('We are calling you now!');
        }
        if ($('#contact_call_me_now_no:checked').length) {
            // Add the hidden CallPixels Results iframe.
            var iframe = "<iframe src='/results?geo=us-" + zip_code + "&ai_currently_insured=" +
                currently_insured + "' style='display: none'></iframe>";
            $('#results').html(iframe);
        }

    });
});
