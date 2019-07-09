/// <reference path="file_uploading.js" />
$(document).ready(function () {

    $("input[type='reset'],button[type='reset']").click(function () {
        $(this).parent().parent().parent().find("select option").attr("selected", false);
        $(this).parent().parent().parent().find("input[type='hidden']").val(0);
    });

    $(document).on("click", ".overLayerFunction .playVideoIcon", function () {
        var url = $(this).attr("data-video");
        $("#serviceMoviePlay video source").attr("src", url);
        $("#serviceMoviePlay .downloadMoviebtn").attr("href", url);

        var videocontainer = document.getElementById("playedVideo");
        videocontainer.pause();
        videocontainer.load();
        videocontainer.play();
        $("#serviceMoviePlay").modal("show");
    });

    $(document).on("click", "#serviceMoviePlay .modal-footer button", function () {
        var videocontainer = document.getElementById("playedVideo");
        videocontainer.pause();
        videocontainer.load();
    });

    $(".requestStatusTabs li a").click(function () {
        window.localStorage.currTab = $(this).attr("href");
    });

    if (window.location.pathname == "/Home/request_status/") {
        var id = window.localStorage.currTab;
        if (id == "") {

        }
        else {
            $(id).addClass("active").siblings().removeClass("active");
            $(".requestStatusTabs li a[href='" + id + "']").parent().addClass("active").siblings().removeClass("active");
        }
    } else {
        window.localStorage.currTab = "";
    }

    $("body").click(function (e) {
        if ($(e.target).parents('.beforeLogin').hasClass("beforeLogin") || $(e.target).attr("id") == "modalLoginPopup" || $(e.target).attr("id") == "modalRegPopup") {

        } else {
            $('.beforeLogin li').removeClass('active');
        }
    });

    $("#popUpReg, #popUpRegLog").click(function () {
        $(".topHeader .beforeLogin li").removeClass('active');
        $(".topHeader .beforeLogin li:first-child").addClass('active');
        $(".blackLayer").addClass("active");
        $(".beforeLogin li .loginForm").removeClass("loginPopUpCenter");
        $(".beforeLogin .registration").addClass("loginPopUpCenter");
        //$(this).parents(".beforeLogin li:first-child").addClass("active");
    });

    if ($(document).width() > 766) {
        $(".fancybox").fancybox({
            minWidth: 600,
        });
    } else {
        $(".fancybox").fancybox({
            minWidth: 300,
        });
    }

    $('.userSection .currStatus').click(function () {
        $(this).next().toggleClass('active');
    });

    $(".profileSection #photoUpload img").click(function () {
        $("#changeUserProfile").modal("show");
    });

    $('.countryIconName li').click(function () {
        $(this).toggleClass('active');
    });

    $('.userMasterPage .userSection .allStatus li').click(function () {
        $('.currStatus').removeClass().addClass($(this).attr("class") + " currStatus");
        $(this).addClass('active').siblings().removeClass('active');
    });



    $('.allStatus').mouseleave(function () {
        $(this).removeClass('active');
    });



    $('.datepicker').datepicker({
        format: 'MMM dd, yyyy'
    });

    $('#fromDate').change(function () {
        $('#toDate').datepicker('remove').val("");
        var frDate = $(this).val();
        $('#toDate').datepicker({
            format: 'dd/mm/yyyy',
            startDate: frDate,
        });
    });


    $('body').on('click', '.closeCurrChat', function () {
        $(this).parent().parent().parent().remove();
    });

    $('body').on('click', '.fileSharing', function () {
        $(this).next().trigger('click');
    });

    $('.userProileMob').click(function () {
        $('.profileSection').toggleClass('active');
        $(this).toggleClass('active');
    });

    $('.beforeLogin li a').click(function (e) {
        $(this).parent().toggleClass('active').siblings().removeClass('active');
    });


    $('body').on("click", ".userInfoTabs li", function (event) {
        $('.userInfoTabs li').removeClass('active');
        $(this).toggleClass('activeOption').siblings().removeClass('activeOption');
    });

    $('body').on('mouseleave', '.userInfoTabs', function (event) {
        $('.activeOption').removeClass('activeOption');
    });

    $(".friendList h4").click(function () {
        $(this).parent().find("i").toggleClass("fa-minus");
        $(this).parent().toggleClass("active");
    });


    $(".cancelGoBack").click(function () {
        $("#editProfileConfirm").modal("show");
    });


    $("li a[href='" + window.location.pathname + "']").parent().addClass("active").siblings().removeClass("active");


    $('.dobPicker').datepicker();
    $('.datepicker').datepicker();
    /*=========New Phase==============*/

    $("#requestOptionSearch").click(function () {
        window.location.href = "/Home/request_search/?optionKey=" + $("#searchOptionKeyword").val();
    });



    //$(".photoGalleryBox").each(function () {
    //    if($(this).find("ul li").length >2){
    //    var totWidth = $(this).width();
    //    var liWidth = Math.floor(totWidth / 150);        
    //    var marginLeft = Math.floor((totWidth - (liWidth * 150)) / 2)
    //    //alert(totWidth + " " + liWidth + " " + marginLeft);
    //    $(this).find("ul").css("margin-left", marginLeft);
    //    }
    //});

    //$(window).resize(function () {
    //    $(".photoGalleryBox").each(function () {
    //        if ($(this).find("ul li").length > 2) {
    //            var totWidth = $(this).width();
    //            var liWidth = Math.floor(totWidth / 152);
    //            var marginLeft = Math.floor((totWidth - (liWidth * 152)) / 2)

    //            $(this).find("ul").css("margin-left", marginLeft);
    //        }
    //    });
    //});

    //$(".nav-tabs li").click(function () {
    //    setTimeout(function () { 
    //        $(".photoGalleryBox").each(function () {
    //            if ($(this).find("ul li").length > 2) {
    //                var totWidth = $(this).width();
    //                var liWidth = Math.floor(totWidth / 152);
    //                var marginLeft = Math.floor((totWidth - (liWidth * 152)) / 2)
    //                $(this).find("ul").css("margin-left", marginLeft);
    //            }
    //    });
    //    }, 200)
    //});


    $("#requestOption").click(function () {
        var value = $(".optionList input[type='radio']:checked").attr("data-id");
        var catId = $(".optionList input[type='radio']:checked").attr("data-catid");
        if (value == undefined) {
            $("#confirmation .modal-body h4").text("Please select an option for the continue");
            $("#confirmation .modal-footer a").text("Go Back Home");
            $("#confirmation .modal-footer button").text("Ok");
            $("#confirmation").modal("show");
        } else {
            $("#requestOption").attr("href", "/Home/request_form/?optionId=" + value + "&catId=" + catId);
        }
    });

    $("#requestOptionCancel").click(function () {
        $("#confirmation .modal-body h4").text("Are you sure you want to select this option");
        $("#confirmation .modal-footer a").text("Yes");
        $("#confirmation .modal-footer button").text("No");
    });


    $("#modalLoginPopup").click(function () {
        $("#askForLogin").modal("hide");
        $(".blackLayer").addClass("active");
        $(".beforeLogin li:nth-child(2) .loginForm").addClass("loginPopUpCenter");
    });

    $("#modalRegPopup").click(function () {
        $("#askForLogin").modal("hide");
        $(".blackLayer").addClass("active");
        $(".beforeLogin li .loginForm").removeClass("loginPopUpCenter");
        $(".beforeLogin .registration").addClass("loginPopUpCenter");
    });

    $(".blackLayer .closeBtn").click(function () {
        $(".blackLayer").removeClass("active");
        $(".beforeLogin li .loginForm").removeClass("loginPopUpCenter");
    });

    $("body").on("click", ".searchRequestPagin .pagination li a", function () {
        if (window.location.href.indexOf("optionKey") > -1) {
            var query_string = "";
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (i != 0) {
                    query_string += "&";
                }
                if (pair[0] == "page") {
                    query_string += pair[0] + "=" + $(this).attr("data-page");
                } else {
                    query_string += pair[0] + "=" + pair[1];
                }
            }
            if (query_string.indexOf("page") > -1) {
                window.location.href = "/Home/request_search/?" + query_string;
            } else {
                window.location.href = "/Home/request_search/?" + query_string + "&page=" + $(this).attr("data-page");
            }
        } else {
            window.location.href = "/Home/request_search/?page=" + $(this).attr("data-page");
        }
    });

    $("#allOptionList .perPageDropdown").change(function () {
        var pathname = window.location.pathname;
        if (window.location.search != "") {
            var query_string = "";
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");

                if (i != 0) {
                    query_string += "&";
                }
                if (pair[0] == "page") {
                    query_string += pair[0] + "=" + 1;
                } else if (pair[0] == "pageSize") {
                    query_string += pair[0] + "=" + $(this).val();
                } else {
                    query_string += pair[0] + "=" + pair[1];
                }
            }
            alert(query_string);
            if (query_string.indexOf("page") > -1 && query_string.indexOf("pageSize") > -1) {
                if (pathname.lastIndexOf("/") + "== " + (pathname.length - 1)) {
                    window.location.href = pathname + "?" + query_string;
                } else {
                    window.location.href = window.location.pathname + "/?" + query_string;
                }
            } else if (query_string.indexOf("page") > -1) {
                window.location.href = pathname + "?" + query_string + "&pageSize=" + $(this).val();
            }
            else {
                window.location.href = pathname + "?" + query_string + "page=1&pageSize=" + $(this).val();
            }
        } else {
            window.location.href = pathname + "?page=" + 1 + "&pageSize=" + $(this).val();
        }
    });

    /*==========Like event================*/

    $(".socialModule a[data-requestdetailid]").click(function () {
        var reqDetailID = $(this).attr("data-requestdetailid");
        var Mem_Id = $("#userId").val();
        if (Mem_Id != "") {
            var data = { 'Request_History_ID': reqDetailID };
            $.ajax({
                type: "Post",
                url: "/Home/likeCount",
                data: data,
                dataType: "text",
                success: function (data) {
                    $("#" + reqDetailID).find(".LikeCount").text(data);
                    if ($("#" + reqDetailID).find("label:first-child").text() != "Liked") {
                        $("#" + reqDetailID).find("label:first-child").text("Liked");
                    } else {
                        $("#" + reqDetailID).find("label:first-child").text("Like");
                    }
                },
                error: function (data) {
                    // alert(data + "Error");
                }
            });
        } else {
            $("#confirmation .modal-body h4").text("Please Login First");
            $("#confirmation .modal-footer a").hide();
            $("#confirmation .modal-footer button").text("Ok");
            $("#confirmation").modal("show");
        }
    });

    /*==========Rating event================*/

    $(".PostCategoryList .ratingStars").click(function () {
        var Mem_Id = $("#userId").val();
        $(".forRatingGiven span").removeClass("active");
        $(".forRatingGiven span").removeClass("ratingPoint");
        if (Mem_Id != "") {
            $("#reqHisHd").val($(this).attr("data-ratingreq"));
            $("#ratingGiven").modal("show");
        } else {
            $("#confirmation .modal-body h4").text("Please Login First");
            $("#confirmation .modal-footer a").hide();
            $("#confirmation .modal-footer button").text("Ok");
            $("#confirmation").modal("show");
        }
    });

    $(".forRatingGiven span").click(function () {
        $(this).addClass("active ratingPoint").siblings().removeClass("active");
        $(this).prevAll().addClass("active");
    });

    $("#requestDetailSearch").click(function () {
        var getUrl = window.location.pathname;
        if (window.location.search != "") {
            var query_string = "";
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (i != 0) {
                    query_string += "&";
                }
                if (pair[0] == "page") {
                    query_string += pair[0] + "=" + 1;
                } else if (pair[0] == "pageSize") {
                    query_string += pair[0] + "=" + pair[1];
                }
                else if (pair[0] == "requestKey") {
                    query_string += pair[0] + "=" + $("#requestDetailSearchText").val();
                } else {
                    query_string += pair[0] + "=" + pair[1];
                }
            }
            if (window.location.href.indexOf("requestKey") > -1) {
                window.location.href = getUrl + "?" + query_string;
            } else if (getUrl != "/") {
                window.location.href = getUrl + "?" + query_string + "&requestKey=" + $("#requestDetailSearchText").val();
            }
        } else {
            window.location.href = getUrl + "?requestKey=" + $("#requestDetailSearchText").val();
        }
    });

    $("#requestDetailSearchText").keyup(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            var getUrl = window.location.pathname;
            if (window.location.search != "") {
                var query_string = "";
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i = 0; i < vars.length; i++) {
                    var pair = vars[i].split("=");
                    if (i != 0) {
                        query_string += "&";
                    }
                    if (pair[0] == "page") {
                        query_string += pair[0] + "=" + 1;
                    } else if (pair[0] == "pageSize") {
                        query_string += pair[0] + "=" + pair[1];
                    }
                    else if (pair[0] == "requestKey") {
                        query_string += pair[0] + "=" + $("#requestDetailSearchText").val();
                    } else {
                        query_string += pair[0] + "=" + pair[1];
                    }
                }

                if (window.location.href.indexOf("requestKey") > -1) {
                    window.location.href = getUrl + "?" + query_string;
                } else if (getUrl != "/") {
                    window.location.href = getUrl + "?" + query_string + "&requestKey=" + $("#requestDetailSearchText").val();
                }
            } else {
                window.location.href = getUrl + "?requestKey=" + $("#requestDetailSearchText").val();
            }
        }
    });

    $("#searchOptionKeyword").keyup(function (e) {
        var key = e.which;
        if (key == 13)  // the enter key code
        {
            window.location.href = "/Home/request_search/?optionKey=" + $("#searchOptionKeyword").val();
        }
    });

    $("body").on("click", ".requestPagin .pagination li a, .personalReqPage.pagination li a", function () {        
        var pathName = "";
        if (window.location.pathname != null) {
            pathName = window.location.pathname;
        }
        var location = window.location.search;
        //alert(location);
        if (window.location.search != "") {
            var query_string = "";
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (i != 0) {
                    query_string += "&";
                }
                if (pair[0] == "page") {
                    query_string += pair[0] + "=" + $(this).attr("data-page");
                } else if (pair[0] == "pageSize") {
                    query_string += pair[0] + "=" + pair[1];
                } else {
                    query_string += pair[0] + "=" + pair[1];
                }
            }
            //alert(query_string);
            //if (pathName == "/Home" || pathName == "/Home/") {
            //    window.location.href = "/Home/?" + query_string + "&page=" + $(this).attr("data-page");
            //} else if (pathName == "/User" || pathName == "/User/") {
            //    window.location.href = "/User/?" + query_string + "&page=" + $(this).attr("data-page");
            //} else if (pathName == "/User/achivements" || pathName == "/User/achivements/") {
            //    window.location.href = "/User/achivements/?" + query_string + "&page=" + $(this).attr("data-page");
            //} else if (pathName == "/User/all_members" || pathName == "/User/all_members/") {
            //    window.location.href = "/User/all_members/?" + query_string + "&page=" + $(this).attr("data-page");
            //} else {
            if (window.location.href.indexOf("page") > -1) {
                window.location.href = pathName + "?" + query_string;
            } else if (pathName != "/") {
                window.location.href = pathName + "?" + query_string + "&page=" + $(this).attr("data-page");
            }

            //}
        } else {
            //if (window.location.href.indexOf("page") > -1) {
            window.location.href = pathName + "?page=" + $(this).attr("data-page");
            //} else if (pathName != "/") {
            //    window.location.href = pathName + "?page=" + $(this).attr("data-page");
            //} else if (pathName == "/") {
            //    window.location.href = pathName + "Home/?page=" + $(this).attr("data-page");
            //} else {
            //    window.location.href = location + "Home/?page=" + $(this).attr("data-page");
            //}
        }
    });

    $(".contentSection .requestList").change(function () {
        var pathName = window.location.pathname;
        if (window.location.search != "") {
            var query_string = "";
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (i != 0) {
                    query_string += "&";
                }
                if (pair[0] == "page") {
                    query_string += pair[0] + "=" + 1;
                } else if (pair[0] == "pageSize") {
                    query_string += pair[0] + "=" + $(this).val();
                } else {
                    query_string += pair[0] + "=" + pair[1];
                }
            }
            //alert(query_string);
            if (query_string.indexOf("page") > -1 && query_string.indexOf("pageSize") > -1) {
                window.location.href = pathName + "?" + query_string;
            }
            else if (query_string.indexOf("pageSize") > -1) {
                window.location.href = pathName + "?" + query_string + "&pageSize=" + $(this).val();
            } else {
                window.location.href = pathName + "?" + query_string + "&page=" + 1 + "&pageSize=" + $(this).val();
            }
        } else {
            window.location.href = pathName + "?page=1&pageSize=" + $(this).val();
        }
    });

    $(".perPageDropdown").val($("#pageSize").val());

    $("#currentUserBox").dblclick(function () {
        window.location.href = "/User/";
    });


    $(".statusBox ul li").click(function () {
        var loginStatus = $(this).attr("data-status");

        var Mem_Id = $("#userId").val();
        if (Mem_Id != "") {
            var data = { 'loginStatus': loginStatus };
            $.ajax({
                type: "Post",
                url: "/User/ChangeloginStatus",
                data: data,
                dataType: "text",
                success: function (data) {

                },
                error: function (data) {
                    //alert(data + "Error");
                }
            });
        } else {

        }
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

    $(".businessList li input#yes").click(function () {
        $(".businessForm").removeClass("active");
        $(".businessForm").addClass("active");
    });
    $(".businessList li input#no").click(function () {
        $(".businessForm").removeClass("active");
    });

    $("#modalLoginPopup, #modalRegPopup").click(function () {
        var id = $("#reqTypeID").val();
        $("#reqIdLog,#reqIdReg").val(id);
    });

    $("form#forgotPassword").submit(function () {
        $("#forgotPassword .errorMsg").remove();
        if ($("input[name='mailid']").val() != "") {
            if (!checkUserEmail($("input[name='mailid']").val())) {
                $("input[name='mailid']").parent().append("<span class='errorMsg'>Please Enter Valid Email Id!</span>");
                return false;
            } else {
                // generateUserName($("input[name='mailid']").val());
            }
        } else {
            $("input[name='mailid']").parent().append("<span class='errorMsg'>Please Enter Your Email Id!</span>");
            return false;
        }
    });


});



function ratingSubmit() {
    var reqDetailID = $("#reqHisHd").val();
    var ratingPoint = $(".forRatingGiven .ratingPoint").attr("data-value");
    var data = { 'Request_History_ID': reqDetailID, 'ratingPoint': ratingPoint };
    $.ajax({
        type: "Post",
        url: "/Home/RatingCount",
        data: data,
        dataType: "text",
        success: function (data) {
            var rating = parseInt(data);
            var ratingStr = "";
            for (var i = 0; i < 5; i++) {
                if (data > i) {
                    var rest = data - i;
                    if (rest <= 0.9) {
                        ratingStr += "<span><img src='/Content/images/half-filled-star.png' /></span>&nbsp;";
                    }
                    else {
                        ratingStr += "<span><img src='/Content/images/filled-star.png' /></span>&nbsp;";
                    }
                }
                else {
                    ratingStr += "<span><img src='/Content/images/empty-star.png' /></span>&nbsp;";
                }
            }
            if (data != 0) {
                ratingStr += "<span class='badge'>" + data + "</span>";
            }
            $(".ratingStars[data-ratingReq=" + reqDetailID + "]").html(ratingStr);
            $("#ratingGiven").modal("hide");
            $(".forRatingGiven span").removeClass("active");
            $(".forRatingGiven span").removeClass("ratingPoint");
        },
        error: function (data) {
            //alert(data + "Error");
        }
    });
}

function ReqShareWith(shareId, Request_History_ID, event) {
    var data = { "shareId": shareId, "Request_History_ID": Request_History_ID }

    $(event).parent().find("i.glyphicon-ok").remove();
    $(event).append("<i class='glyphicon glyphicon-ok'></i>");
    $.ajax({
        type: "Post",
        url: "/User/share_request",
        data: data,
        dataType: "text",
        success: function (data) {
            $("#confirmation").modal("show");
            var msg;
            if (shareId == 2) {
                msg = "Request shared successfully with all members!";
            } else if (shareId == 3) {
                msg = "Request shared successfully with friends!";
            } else {
                msg = "Request unshared successfully!";
            }
            $("#confirmation .modal-body h4").text(msg);
            $("#confirmation a").hide();
            $("#confirmation .modal-footer button").text("Ok");
        },
        error: function (data) {
            //alert(data.d + "Error");
        }
    });
}

function checkUserEmail(email) {
    var data = { 'email': email };
    $.ajax({
        type: "Post",
        url: "/Account/checkUserEmail",
        data: data,
        dataType: "text",
        success: function (data) {
            alert(data);
        },
        error: function (data) {
            //alert(data + "Error");
        }
    });
}
