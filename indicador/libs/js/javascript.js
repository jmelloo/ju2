$(document).ready(function()
{
//toggles active class between tabs by clicking on header links
    $('.header-item').on('click', function (e) {
        e.preventDefault();
        $(this).addClass('activated active');
        $(this).siblings().removeClass('activated active');


//changes login to register view and vice versa
        let target_href = $(this).attr('href');
        if(target_href === '#register' && $(target_href).css('display') === 'none')  {
            $('.dish').addClass("activated");

        }
        else if(target_href === '#login' && $(target_href).css('display') === 'none')
        {
            $('.dish').addClass("activated");
        }

        else {

        }

        $('.form-holder > .form').not(target_href).hide();
        $(target_href).fadeIn(850);

        setTimeout(function () {
            $('.dish').removeClass('activated active');
        }, 600);

    });
});