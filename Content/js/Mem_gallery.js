$(document).ready(function () {

    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        //alert("Windows Phone");
    } else if (/android/i.test(userAgent)) {
        //alert("Android Phone");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        //alert("IOS Phone");
    }

    $(".addPhotoButton").click(function () {
        $("#addPhotoGallery").modal("show");
    });

    //if (Object.keys(jQuery.browser)[0] == "mozilla") {
    //    $("#takePhotoByMedia").parent().addClass("IEBrowser");
    //}

    $("#takePhotoByMedia").click(function (e) {
        $(".booth").show();
        $(".addPhotoEvent").hide();
        $("#uploadClickedPhoto").removeClass("hide");
        $("#uploadPhotoInProfile").addClass("hide");

        $("#uploadClickedReqPhoto").removeClass("hide");
        $("#uploadReqPhoto").addClass("hide");
        $("#addPhotoGallery .modal-dialog").addClass("mediaActive");
        $(".addphotoBack").removeClass("hide");
        var video = document.getElementById("liveVideo"),
       vendorUrl = window.URL || window.webkitUrl || window.mozURL || window.msURL;
        navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia || navigator.mozGetUserMedia;

        navigator.getMedia({
            video: true,
            audio: false
        }, function (stream) {
            video.src = vendorUrl.createObjectURL(stream);
            video.play();
        }, function (error) {
            alert(error);
        });
    });

    $("#takeLivePhoto").click(function () {
        var video = document.getElementById("liveVideo");
        var canvas = document.getElementById("storePhotCanvas"),
            context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, 300, 150);
        $("#clickedPhoto img").attr("src", canvas.toDataURL("image/png"));
        //$("#liveVideo").hide();
    });

    $("#inputPhoto").click(function () {
        $(".booth").hide();
    });

    $("#addAlbumButton").click(function () {
        $("#addAlbumPopUp").modal("show");
    });

    $(".addphotoBack").click(function () {
        $(".addPhotoEvent").show();
        $("#uploadPhotoInProfile").removeClass("hide");
        $("#uploadClickedPhoto").addClass("hide");

        $("#uploadClickedReqPhoto").addClass("hide");
        $("#uploadReqPhoto").removeClass("hide");

        $(".selected-Photo-Preview, .addphotoBack").addClass("hide");
        $("#inputPhoto").attr("type", "text");
        $("#inputPhoto").attr("type", "file");
        $('.selected-Photo-Preview ul li').remove();
        $(".booth").hide();
    });

    $("#uploadPhotoInProfile").click(function () {
        //------------Photo Upload In User Photo---------
        $("#loadingreg").css("display", "block");
        var ev = $("input#inputPhoto");
        var fileUpload = $(ev).get(0);
        var files = fileUpload.files;
        var test = new FormData();
        var albumid = $("#albumIdinput").val();
        // if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            test.append(files[i].name, files[i]);
        }
        alert(test);
        if ($(ev).val() != "") {
            var msg, userId;
            $.ajax({
                url: "/Utility/Mem_photo_upload.ashx?album=" + albumid,
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
                    confirmBox(err.status);
                    $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
                        $("#confirmBox").modal("hide")
                    });
                }
            });
        }
        else {
            $("#loadingreg").css("display", "none");
            confirmBox("Please Selete the photos!");
            $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
                $("#confirmBox").modal("hide")
            });
        }
    });

    $("button#createAlbum").click(function () {
        $("#loadingreg").css("display", "none");
        var curr = $(this);
        var albumName = $("#addAlbumPopUp .modal-body input").val();
        var data = { 'albumName': albumName };
        if (albumName.trim() != "") {
            $.ajax({
                url: "/User/createMemAlbum",
                type: "POST",
                data: data,
                dataType: "text",
                success: function (res) {
                    if (res == "1") {
                        window.location.href = window.location.href;
                    }
                },
                error: function () {
                    $("#loadingreg").css("display", "none");
                }
            });
        } else {
            $("#loadingreg").css("display", "none");

        }
    });

    $("button.makeCoverPhoto").click(function () {
        var curr = $(this);
        var coverId = $(this).attr("data-photo-id");
        var albumId = $(this).attr("data-album-id");
        var data = { 'coverId': coverId, 'albumId': albumId };
        $("#loadingreg").css("display", "block");
        $.ajax({
            url: "/User/coverAlbum",
            type: "POST",
            data: data,
            dataType: "text",
            success: function (res) {
                if (res == "1") {
                    window.location.href = window.location.href;
                }
            },
            error: function () {
                $("#loadingreg").css("display", "none");
            }
        });

    });

    $("#uploadClickedPhoto").click(function () {
        var albumeId = $("#albumIdinput").val();
        var data = { 'imgSrc': $("#clickedPhoto img").attr("src"), 'albumId': albumeId };
        $("#loadingreg").css("display", "block");
        $.ajax({
            url: "/User/saveClickImg",
            type: "POST",
            data: data,
            dataType: "text",
            success: function (res) {
                if (res == "1") {
                    window.location.href = window.location.href;
                }
                else {
                    $("#loadingreg").css("display", "none");
                }
            },
            error: function () {
                //alert(res);
                $("#loadingreg").css("display", "none");
            }
        });
    });

    $("button.removeCurrPhoto").click(function () {
        
        var curr = $(this);
        var photoId = curr.attr("data-photo-id");
        var fileName = curr.prev().attr("href");
        var data = { 'photoId': photoId, 'fileName': fileName };
        confirmBox("Do You Want Delete This File!");
        $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
            $("#loadingreg").css("display", "block");
            $.ajax({
                url: "/User/removeMemPhotosById",
                type: "POST",
                data: data,
                dataType: "text",
                success: function (res) {
                    $("#loadingreg").css("display", "none");
                    if (res == "1") {
                        $("#confirmBox").modal("hide");
                        curr.parent().parent().remove();
                    }
                },
                error: function (res) {
                    $("#loadingreg").css("display", "none");
                }
            });
        });
    });

    $(".albumEdit").click(function () {
        $("#addAlbumPopUp").modal("show");
        $("#createAlbum").addClass("hide");
        $("#updateAlbum").removeClass("hide");
        var albId = $(this).attr("data-album-id");
        var alb_name = $(this).attr("data-album-name");
        $("#addAlbumPopUp .modal-title").text("Update Album Name");
        $("#addAlbumPopUp .modal-body input").val(alb_name);
        $("#addAlbumPopUp .modal-body input").attr("data-album-id", albId);
    });

    $("button#updateAlbum").click(function () {
        $("#loadingreg").css("display", "block");
        var curr = $(this);
        var albumName = $("#addAlbumPopUp .modal-body input").val();
        var albumId = $("#addAlbumPopUp .modal-body input").attr("data-album-id");
        var data = { 'albumName': albumName, 'albumId': albumId };
        if (albumName.trim() != "") {
            $.ajax({
                url: "/User/updateMemAlbum",
                type: "POST",
                data: data,
                dataType: "text",
                success: function (res) {
                    if (res == "1") {
                        window.location.href = window.location.href;
                    }
                },
                error: function () {
                    $("#loadingreg").css("display", "none");
                }
            });
        } else {
            $("#loadingreg").css("display", "none");
        }
    });

    $("body").on("click", "button.removeAlbum", function () {
        
        var curr = $(this);
        var albumeId = curr.attr("data-albid");
        var data = { 'albumeId': albumeId };
        confirmBox("Do You Want Delete This Album!");
        $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
            $("#loadingreg").css("display", "block");
            $.ajax({
                url: "/User/removeMemAlbumById",
                type: "POST",
                data: data,
                dataType: "text",
                success: function (res) {
                    $("#loadingreg").css("display", "none");
                    if (res == "1") {
                        $("#confirmBox").modal("hide");
                        curr.parent().remove();
                    }
                },
                error: function (res) {
                    $("#loadingreg").css("display", "none");
                }
            });
        });

    });

    $(".userInfoLog .imgBox span, .userInfoLog .userName label span, .userprofilebtn").click(function () {
        $("#loadingreg").css("display", "block");
        var frndid = $(this).attr("data-user-id");
        var frndimg = $(this).attr("data-user-img");
        var frndname = $(this).attr("data-user-name");
        var data = { 'frndid': frndid, 'frndimg': frndimg, 'frndname': frndname };

        $.ajax({
            url: "/User/friendProfile",
            type: "POST",
            data: data,
            dataType: "text",
            success: function (res) {
                if (res == "1") {
                    window.location.href = '/friends_profile/';
                } else {
                    $("#loadingreg").css("display", "none");
                }
            },
            error: function (res) {
                $("#loadingreg").css("display", "none");
            }
        });

    });

    $("#docSearch").keydown(function (e) {
        if (e.key == 'Enter') {
            $("#documentFilter").trigger("click");
        }

    });

    $("#documentFilter").click(function () {
        var docId = $("#Document-DropdownID").val();
        if (docId == "") {
            docId = 0;
        }
        window.location.href = window.location.pathname + "?name=document&keyword=" + $("#docSearch").val() + "&Doctype=" + docId;
    });
});


function selectedImages(input) {
    $(".addPhotoEvent").hide();
    $(".selected-Photo-Preview, .addphotoBack").removeClass("hide");
    for (var i = 0; i < input.files.length; i++) {
        if (input.files && input.files[i]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                //console.log(e.target.result)
                $('.selected-Photo-Preview ul').append("<li><img src='" + e.target.result + "' class='img-responsive' /></li>");
            };
            reader.readAsDataURL(input.files[i]);
        }
    }
}


function confirmBox(message) {
    $("#confirmBox .modal-body h4").text(message);
}

function getMemAlbum() {
    var path = window.location.pathname;
    
    $.ajax({
        url: "/User/getMemAlbum?path=" + path,
        type: "Post",
        data: "{}",
        dataType: "json",
        success: function (res) {
            for (var i = 0; i < res.length; i++) {
                var coverPhoto;

                if (res[i].photo_name != null && res[i].photo_name != 0 && res[i].photo_name != "") {
                    coverPhoto = "/Content/images/gallery-photo/" + res[i].Mem_id + "/" + res[i].photo_name;
                } else {
                    coverPhoto = "../Content/images/album-icon.png";
                }

                if (window.location.pathname == "/friends_profile/gallery") {
                    $(".photoGalleryBox.ablumList").append("<li><a href='/friends_profile/gallery?name=Albums&album=" + res[i].album_id + "'><img src=" + coverPhoto + " class='MemberPhotos' alt='' class='img-responsive' />" +
                                        "<span class='overText'>" + res[i].name + " (" + res[i].phCount + " Photos)<br/>" + res[i].strDate + "</span></a></li>");
                } else {
                    $(".photoGalleryBox.ablumList").append("<li><a href='/User/gallery?name=Albums&album=" + res[i].album_id + "'><img src=" + coverPhoto + " class='MemberPhotos' alt='' class='img-responsive' />" +
                                            "<span class='overText'>" + res[i].name + " (" + res[i].phCount + " Photos)<br/>" + res[i].strDate + "</span></a><button class='removeAlbum' data-albid='" + res[i].album_id + "' title='Remove Album'><i class='fa fa-remove'></i></button></li>");
                }
            }

        },
        error: function (error) {
            //alert(JSON.stringify(error));
        }
    });
}
