/// <reference path="file_uploading.js" />
$(document).ready(function () {
    $('.fancybox').fancybox();

    $('.shoppingBanner').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 1,
                nav: true
            },
            1000: {
                items: 1,
                nav: true,
                loop: true
            }
        }
    })

    $('.popularProducts').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            480: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: true
            },
            1000: {
                items: 4,
                nav: true,
                loop: true
            }
        }
    });

    $('.popularImages').owlCarousel({
        loop: false,
        margin: 0,
        nav: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            480: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: true
            },
            1000: {
                items: 4,
                nav: true
            }
        }
    });

   


    $('.testimonialSlider').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            480: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: true
            },
            1000: {
                items: 3,
                nav: true
            }
        }
    });

    $(".less").click(function () {
        var quantity = (parseInt($(this).parent().parent().find("input[name='quantity']").val()) - 1);
        if (quantity > 0) {
            $(this).parent().parent().find("input[name='quantity']").val(quantity);
        } else {
            $(this).parent().parent().find("input[name='quantity']").val(1);
        }
    });

    $(".increase").click(function () {
        var quantity = (parseInt($(this).parent().parent().find("input[name='quantity']").val()) + 1);
        var maxVal = (parseInt($(this).parent().parent().find("input[name='quantity']").attr("max")))
        if (quantity > 0) {
            if(quantity<=maxVal){
                $(this).parent().parent().find("input[name='quantity']").val(quantity);
            } else {
                $(this).parent().parent().find("input[name='quantity']").val(maxVal);
            }
        } else {
            $(this).parent().parent().find("input[name='quantity']").val(1);
        }
    });

    $("input[name='quantity']").on("keyup",function () {
        var quantity = (parseInt($(this).parent().parent().find("input[name='quantity']").val()));
        var maxVal = (parseInt($(this).parent().parent().find("input[name='quantity']").attr("max")))
        if (quantity > 0) {
            if (quantity <= maxVal) {
                $(this).parent().parent().find("input[name='quantity']").val(quantity);
            } else {
                $(this).parent().parent().find("input[name='quantity']").val(maxVal);
            }
        } else {
            $(this).parent().parent().find("input[name='quantity']").val(1);
        }
    })


    $('.testimonialSlider.owl-carousel').find(".owl-item.active").eq(1).addClass("BigImg");
    var owl = $('.testimonialSlider.owl-carousel');
    owl.owlCarousel();
    // Listen to owl events:
    owl.on('changed.owl.carousel', function (event) {
        setTimeout(function () {
            $('.testimonialSlider.owl-carousel .owl-item').removeClass("BigImg");
            $('.testimonialSlider.owl-carousel').find(".owl-item.active").eq(1).addClass("BigImg");
        }, 50)
    })

    $("button.navigation, .TopCategory").hover(function () {
        $("button.navigation").addClass("active");
    }, function () {
        $("button.navigation").removeClass("active");
    });

    $(".cartList .row .addressDetail").click(function () {
        $(this).parent().parent().parent().parent().addClass("active").siblings().removeClass("active");
    })

    $(".forRatingGiven span").click(function () {
        $(this).addClass("active ratingPoint").siblings().removeClass("active");
        $("input[name='Product_Rating']").val($(this).attr("data-value"))
        $(this).prevAll().addClass("active");
    });

    $('body').on("click", ".userInfoTabs li", function (event) {
        $('.userInfoTabs li').removeClass('active');
        $(this).toggleClass('activeOption').siblings().removeClass('activeOption');
    });

    $('body').on('mouseleave', '.userInfoTabs', function (event) {
        $('.activeOption').removeClass('activeOption');
    });

    $(".changeURL").click(function () {
        var data;
        //alert(window.location.search.indexOf("?"));
        if (window.location.search.indexOf("?") > -1) {
            var query_string = "";
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (i != 0) {
                    query_string += "&";
                }
                if (pair[0] == "name") {
                    query_string += pair[0] + "=" + $(this).attr("data-dataurl");
                } else {
                    query_string += pair[0] + "=" + pair[1];
                }
            }
            if (window.location.search.indexOf("name") == -1) {
                data = window.location.pathname + "?" + query_string + "&name=" + $(this).attr("data-dataurl");;
            } else {
                data = window.location.pathname + "?" + query_string;
            }
        } else {
            data = window.location.pathname + "?name=" + $(this).attr("data-dataurl");
        }
        window.history.pushState({}, "", data);
    });

    $("li a[data-dataurl='Albums']").click(function () {
        $(".ablumSection .ablumList").removeClass("hide");
        $(".ablumSection .albumInner").addClass("hide");
    });

    $("body").on("click", ".currentVideo p span", function () {
        $(this).parent().addClass("active");
        $(this).hide();
    });
        
});