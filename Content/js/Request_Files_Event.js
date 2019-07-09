$(document).ready(function () {

    
    $("#uploadDocPopup").click(function (e) {
        $("#reqDocumentPopUp").modal("show");
    });

    $("#uploadReqDocument").click(function () {
        $(".loader-Class").css("display","block");
        var ev = $("input#inputFile");
        var fileUpload = $(ev).get(0);
        var files = fileUpload.files;
        var test = new FormData();
        var title = $("#docTitle").val();
        for (var i = 0; i < files.length; i++) {
            test.append(files[i].name, files[i]);
        }
        var frndId = 0;        
        if (window.location.pathname == "/friends_profile/" || window.location.pathname == "/friends_profile/index") {
            frndId = $('.userProfile').attr('data-friendid');
        }
        
        if ($(ev).val() != "" && title.trim() != "") {
            $.ajax({
                url: "/Utility/Request_doc_upload.ashx?title=" + title + "&frndId=" + frndId,
                type: "POST",
                contentType: false,
                processData: false,
                data: test,
                // dataType: "json",
                success: function (result) {
                    if (result != "") {
                        window.location.href = window.location.href;
                    }
                },
                error: function (err) {
                    $(".loader-Class").css("display", "none");
                    //alert(err.statusText + " Something is wrong flease check file type");
                }
            });
        }
        else {
            $(".loader-Class").css("display", "none");
            if (title.trim() == "") {
                $("#reqDocumentPopUp .has-error").text("Please Enter a valid Document Title!");
            }
            else if ($(ev).val() == "") {
                $("#reqDocumentPopUp .has-error").text("Please select a file");
            }
        }
    });
    
    $("body").on("click","button.removeReqDoc",function () {
        var curr = $(this);
        var docId = curr.attr("data-Doc-id");        
        var filePath = curr.prev().attr("href");
        var data = { 'docId': docId, 'filePath': filePath };
        confirmBox("Do You Want Delete This File!");
        $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
            $.ajax({
                url: "/Home/removeReqDocById",
                type: "POST",
                data: data,
                dataType: "text",
                success: function (res) {
                    if (res == "1") {
                        $("#confirmBox").modal("hide");
                        curr.parent().parent().remove();
                    }
                },
                error: function () {

                }
            });
        });
    });

    $("a.readThisDoc").click(function () {
        var curr = $(this);
        var docId = curr.attr("data-Doc-id");        
        var data = { 'docId': docId};        
            $.ajax({
                url: "/Home/readDocById",
                type: "POST",
                data: data,
                dataType: "text",
                success: function (res) {
                    if (res == "1") {
                        $(curr).parent().parent().removeClass("strong");
                    }
                },
                error: function () {

                }
            });
        //});
    });
    
    $("#uploadReqPhoto").click(function () {
        //------------Photo Upload In User Photo---------
        $("#loadingreg").css("display", "block");
        var ev = $("input#inputPhoto");
        var fileUpload = $(ev).get(0);
        var files = fileUpload.files;
        var test = new FormData();
        var reqId = $("#reqId").val();
        // if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            //alert(files[i].name + " " + files[i]);
            test.append(files[i].name, files[i]);
        }
        //alert(test);
        if ($(ev).val() != "") {

            $.ajax({
                url: "/Utility/Request_photos_upload.ashx?reqId=" + reqId,
                type: "POST",
                contentType: false,
                processData: false,
                data: test,
                // dataType: "json",
                success: function (result) {
                    if (result != "") {
                        window.location.href = window.location.href;
                    }
                },
                error: function (err) {
                    $("#loadingreg").css("display", "none");
                    //alert(err.statusText + " Something is wrong flease check file type");
                }
            });
        }
        else {
            $("#loadingreg").css("display", "none");
        }
    });

    $("#uploadClickedReqPhoto").click(function () {
        var reqId = $("#reqId").val();
        //alert(reqId);
        var data = { 'imgSrc': $("#clickedPhoto img").attr("src"), 'reqId': reqId };
        $.ajax({
            url: "/Home/saveReqClickImg",
            type: "POST",
            data: data,
            dataType: "text",
            success: function (res) {
                if (res == "1") {
                    window.location.href = window.location.href;
                }
            },
            error: function () {

            }
        });
    });

    $("button.removeCurrReqPhoto").click(function () {
        var curr = $(this);
        var photoId = curr.attr("data-photo-id");
        var fileName = curr.prev().attr("href");
        var data = { 'photoId': photoId, 'fileName': fileName };
        confirmBox("Do You Want Delete This File!");
        $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
            $.ajax({
                url: "/Home/removeReqPhotosById",
                type: "POST",
                data: data,
                dataType: "text",
                success: function (res) {
                    if (res == "1") {
                        $("#confirmBox").modal("hide");
                        curr.parent().parent().remove();
                    }
                },
                error: function () {

                }
            });
        });
    });

    $("#addReqMovie").click(function (e) {
        $("#addReqMoviePopUp").modal("show");
        //document.getElementById("movieTitle").unbind().focus();
       
    });
    
    $("#uploadReqMovie").click(function () {
        //------------Photo Upload In User Photo---------
        $("#loadingreg").css("display","block");
        var ev = $("input#inputMovie");
        var fileUpload = $(ev).get(0);
        var files = fileUpload.files;
        var test = new FormData();
        var reqId = $("#reqId").val();
        var movieTitle = $("#movieTitle").val();
        
        $(".MovieError").text("");
        if (files.length > 0 && movieTitle.trim()!="") {
            for (var i = 0; i < files.length; i++) {
                test.append(files[i].name, files[i]);
            }
            //alert(reqId);
            $.ajax({
                url: "/Utility/Request_movie_upload.ashx?reqId=" + reqId + "&movieTitle=" + movieTitle,
                type: "POST",
                contentType: false,
                processData: false,
                data: test,
                // dataType: "json",
                success: function (result) {
                    if (result == "1") {
                        window.location.href = window.location.href;
                    } else {
                        $(".MovieError").text(result);
                        $("#loadingreg").css("display", "none");
                    }
                },
                error: function (err) {
                    $("#loadingreg").css("display", "none");
                    $(".MovieError").text("You can upload up to 300MB video!");
                }
            });
        } else {            
            if (movieTitle.trim() == "") {
                $("#addReqMoviePopUp .MovieError").text("Please Enter a valid Movie Title!");
            }
            else if (files.length == 0) {
                $("#addReqMoviePopUp .MovieError").text("Please select a Video");
            }
            
            $("#loadingreg").css("display", "none");
        }
    });

    $("button.removeCurrReqMovie").click(function () {
        var curr = $(this);
        var movieId = curr.attr("data-movie-id");
        var fileName = curr.parent().parent().attr("data-url");
        var data = { 'movieId': movieId, 'fileName': fileName };
        confirmBox("Do You Want Delete This File!");
        $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
            $.ajax({
                url: "/Home/removeReqMovieById",
                type: "POST",
                data: data,
                dataType: "text",
                success: function (res) {
                    if (res == "1") {
                        curr.parent().parent().remove();
                        window.location.href = window.location.href;
                    }
                },
                error: function () {

                }
            });
        });
    });

    $(".videoList .item .playVideoIcon").click(function () {
        var vdeo = "/Content/videos/request_videos/"+$(this).attr("data-video");
        var title = $(this).attr("data-videotitle");
        var titleHtml="";
        if (title.length > 60) {
            titleHtml="<p class='nomargin'>" + title + "<span class='readmore'>see more</span></p>"
        }else{
            titleHtml="<p class='nomargin'>" + title + "</p>";
        }

        var downloadCode="<a href='"+vdeo+"' download target='_blank' class='btn btn-default downloadMoviebtn'><i class='fa fa-download'></i></a>"
        $(".currentVideo").html("<div class='videoSection'>"+downloadCode + "<video>" + $(this).parent().prev().html() + "</video></div>" + titleHtml);
        $("body").find(".currentVideo video").attr("controls", true);
        $(".videoList .item.active").removeClass("active");
        $(this).parent().parent().addClass("active")
    });

    $(".shareUserDoc").click(function () {
        $("#shareDocumentPopUp").modal("show");
        $("#shareDocumentPopUp .modal-body input").attr("data-doc-id",$(this).attr("data-doc-id"));
    });

    $("#shareDoc").keyup(function () {
        var len = $(this).val().length;
        if (len > 0) {
            $(".shareFriendList").addClass("active");
        } else {

            $(".shareFriendList").removeClass("active");
        }

        var filter = $(this).val().toUpperCase();
        var li = $(".shareFriendList .FriendListBox li");

        for (i = 0; i < li.length; i++) {
            if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }

    });

    $("body").on("click", ".shareFriendList .FriendListBox li", function () {        
        $(".shareWith small").append($(this).html());
        $(this).remove();
    });

    $("body").on("click", ".shareWith small a i", function () {
        var id = $(this).parent().attr("id");
        var outerHtml = document.getElementById(id).outerHTML;
        $(".shareFriendList .FriendListBox").append("<li>" + outerHtml + "</li>");
        $(this).parent().remove();
    });

    $("#shareDocument").click(function () {
        var count = $(".shareWith a").length;
        var docId = $("#shareDocumentPopUp .modal-body input").attr("data-doc-id");
        for (var i = 1; i <= count; i++) {
            var sharewith=$(".shareWith small a:nth-child(" + i + ")").attr("data-id");
            var data = { 'sharewith': sharewith, 'docId': docId };
            //if (confirm("Do You Want To Submit Without File!")) {        
            $.ajax({
                url: "/Home/shareDocWithFriends",
                type: "POST",
                data: data,
                dataType: "text",
                success: function (res) {
                    if (res == "1") {
                        //curr.parent().parent().remove();
                    }
                },
                error: function () {

                }
            });
        }
    });

    $('.owl-carousel.reqMovies').owlCarousel({
        loop: false,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 6,
                nav: true,
                loop: false
            }
        }
    });

    $('.owl-carousel.reqMovies .owl-prev').html("<i class='fa fa-arrow-circle-left'></i>");
    $('.owl-carousel.reqMovies .owl-next').html("<i class='fa fa-arrow-circle-right'></i>");

    $("body").on("click", ".documentPaging .pagination li a", function () {
        if (window.location.href.indexOf("name") > -1) {
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
                window.location.href = window.location.pathname + "?" + query_string;
            } else {
                window.location.href = window.location.pathname + "?" + query_string + "&page=" + $(this).attr("data-page");
            }
        } else {
            window.location.href = window.location.pathname+"?page=" + $(this).attr("data-page");
        }
    });

    $("#docPerPage .perPageDropdown").change(function () {
        if (window.location.href.indexOf("name") > -1) {
            var query_string = "";
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (i != 0) {
                    query_string += "&";
                }
                
                //if (pair[0] == "page") {
                //    query_string += pair[0] + "=" + $(this).attr("data-page");
                //} else {
                    query_string += pair[0] + "=" + pair[1];
                //}
            }

            if (query_string.indexOf("page") > -1 && query_string.indexOf("pageSize") > -1) {
                window.location.href = window.location.pathname+"?" + query_string;
            }
            else if (query_string.indexOf("page") > -1) {
                window.location.href = window.location.pathname + "?" + query_string + "&pageSize=" + $(this).val();
            } else {
                window.location.href = window.location.pathname + "?" + query_string + "&page=" + 1 + "&pageSize=" + $(this).val();
            }
        } else {
            var url = window.location.pathname;
            window.location.href = url + "?page=" + 1 + "&pageSize=" + $(this).val();
        }
    });

    $("#reqDocumentPopUp input[type='file'], #addReqMoviePopUp input[type='file']").change(function (e) {
        $(this).next().children("p.fileDetail").remove()
        $(this).next().append("<p class='text-center fileDetail'>" + e.target.files[0].name + " and Size (" + Math.round(e.target.files[0].size/1024).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "KB )</p>");
    });

    var query = window.location.search.substring(1);
    var vars = query.split("&");

    for (var i = 0; i < vars.length; i++) {
        var items = vars[i].split("=");

        $("li a[href='#" + items[1] + "']").parent().addClass("active").siblings().removeClass("active");
        $("#" + items[1]).addClass("active").siblings().removeClass("active");
    }
    
});
