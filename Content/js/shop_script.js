$(document).ready(function () {

    $(".AddInCart").click(function () {
        var Id = $("input[name='productId']").val();
        var ColorId = $(".colorBox span.active").attr("data-id");
        var sizeId = $(".sizeBox span.active").attr("data-id");
        var quantity = $("input[name='quantity']").val();
        var data = { 'ID': Id, 'ColorId': ColorId, 'sizeId': sizeId, 'Quantity': quantity };
        $.ajax({
            type: "Post",
            url: "/shop/addProductInCart",
            data: data,
            dataType: "text",
            success: function (data) {
                if (data == "-1") {

                } else {

                }
            },
            error: function (data) {
                alert(data);
            }
        });
    });


    /*==============Add Into Cart From Detail Page=====================*/
    $(".AddInCart").click(function () {
        var Id = $("input[name='productId']").val();
        var ColorId = $(".colorBox span.active").attr("data-id");
        var sizeId = $(".sizeBox span.active").attr("data-id");
        var quantity = $("input[name='quantity']").val();
        var data = { 'ID': Id, 'ColorId': ColorId, 'sizeId': sizeId, 'Quantity': quantity };
        $.ajax({
            type: "Post",
            url: "/shop/addProductInCart",
            data: data,
            dataType: "text",
            success: function (data) {
                if (data == "-1") {
                    $("#notification .modal-body").html("<a href='/Account'>Click Here</a> Please Login First!");
                    $("#notification").modal("show");
                } else {
                    $("#cartCount").text(data);
                }
            },
            error: function (data) {
                $("#notification .modal-body").text(data);
                $("#notification").modal("show");
            }
        });
    });

    /*==============Add Into Cart From Other Page Page=====================*/

    $(".addToCart button").click(function () {
        var Id = $(this).attr("data-id");
        var ColorId = $(this).attr("data-cololid");
        var sizeId = $(this).attr("data-size");
        var quantity = 1;
        var data = { 'ID': Id, 'ColorId': ColorId, 'sizeId': sizeId, 'Quantity': quantity };
        $.ajax({
            type: "Post",
            url: "/shop/addProductInCart",
            data: data,
            dataType: "text",
            success: function (data) {
                if (data == "-1") {
                    $("#notification .modal-body").html("<a href='/Account'>Click Here</a> and Login Please!");
                    $("#notification").modal("show");
                } else {
                    $("#cartCount").text(data);
                }
            },
            error: function (data) {
                $("#notification .modal-body").text(data);
                $("#notification").modal("show");
            }
        });
    });


    $(".AddInWishlist").click(function () {
        var Id = $("input[name='productId']").val();
        var data = { 'productId': Id };
        $.ajax({
            type: "Post",
            url: "/shop/_addProductInWishlist",
            data: data,
            dataType: "text",
            success: function (data) {
                if (data == "-1") {
                    $("#notification .modal-body").text("Product Not In WishList Successfully!");
                    $("#notification").modal("show");
                } else {
                    $("#notification .modal-body").text("Add In WishList Successfully!");
                    $("#notification").modal("show");
                }
            },
            error: function (data) {
                alert(data);
            }
        });
    });

    /*===============Add Like button===================*/

    $(".addLikeProduct").click(function () {
        var productId = $(this).attr("data-productId");
        var userId = $(".profilepic").attr("data-userid");
        if (userId != undefined) {
            var data = { 'Product_Id': productId, 'MemberId': userId };
            $.ajax({
                type: "Post",
                url: "/shop/_addProductLike",
                data: data,
                dataType: "text",
                success: function (data) {

                },
                error: function (data) {
                    $("#notification .modal-body").text(data);
                    $("#notification").modal("show");
                }
            });
        }
    });

});

/*=============Review and Rating==============*/

function ratingSubmitSuccess(data) {    
    if (data == "1") {
        var productId = $("input[name='productId']").val();
        $("#postQuestion").modal("hide");
        $("#userRatingSection").load('@Url.Action("_product_reviews", "shop")?id=' + productId);
        $(".modal").modal("hide");
    } else {
        if ($("#feedBackModal .modal-body").find(".errMsg").length == 0) {
            $("#feedBackModal .modal-body").append("<p class='errMsg'>You are already given review and ratings</p>")
        } else {
            $("#feedBackModal .modal-body .errMsg").text("You are already given review and ratings");
        }
    }
}

function ratingSubmitFailure(data) {
    
    if ($("#feedBackModal .modal-body").find(".errMsg").length == 0) {
        $("#feedBackModal .modal-body").append("<p class='errMsg'>You are already given review and ratings or " + data + "</p>")
    } else {
        $("#feedBackModal .modal-body .errMsg").text("You are already given review and ratings or " + data);
    }

}