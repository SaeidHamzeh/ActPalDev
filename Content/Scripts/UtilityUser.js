$(document).ready(function () {
    $("#uploadProfile").click(function () {
        var b = $("input#imageFile");
        $("#loadinglogin").show();
        $(".uploadMsg").text("");
        b = new FormData;
        var a = $("#imageFile").get(0).files;
        0 < a.length && b.append("MyImages", a[0]);
        
        $.ajax({
            url: "/User/UploadProfilePic",
            type: "POST", processData: !1, contentType: !1, data: b,
            success: function (a) {
                $(".uploadMsg").text("Upload SucessFully!");
                $("#loadinglogin").hide();
                window.location.href = window.location.href;
            },
            error: function (a) {
                $("#confirmation .modal-body h4").text("Opps ! Some Error Occured. Please Try again.");
                $("#confirmation .modal-footer a").hide();
                $("#confirmation .modal-footer button").text("Ok");
                $("#confirmation").modal("show");                
            }
        });
    });
});

//function readImageURL() {
//    var b = $("input#imageFile");
//    if (b.files && b.files[0]) {
//        var a = new FileReader;
//        a.onload = function (a) {            
//            var uid = $("img#imgPreview").attr("data-userid");
//            $(".profilepic[data-userid='"+uid+"']").attr("src", a.target.result);
//        };        
//        a.readAsDataURL(b.files[0])
//    }
//}

function UnFriendRequest(b, a) {
    confirmBox("Do you want to unfriend this guy !");
    $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
        $.ajax({
            type: "Post",
            url: "/User/UnFriendRequest",
            data: { tomem: b },
            dataType: "json",
            success: function (c) {
                if (1 == c) {
                    $(a).attr("disabled", "disabled");
                    $(a).html("UnFriend");
                    location.reload();
                } else {
                    $("#confirmation .modal-body h4").text("Sorry Request Not Complete. Please Try again!");
                    $("#confirmation .modal-footer a").hide();
                    $("#confirmation .modal-footer button").text("Ok");
                    $("#confirmation").modal("show");
                }

            }, beforeSend: function () {
                $("#loadingreg").css("display", "block");
            }, complete: function () {
                $("#loadingreg").css("display", "none");
            }, error: function (a, b, d) {
                $("#confirmation .modal-body h4").text("Error while retrieving data. Please reload the page!");
                $("#confirmation .modal-footer a").hide();
                $("#confirmation .modal-footer button").text("Ok");
                $("#confirmation").modal("show");
            }
        });
    });
    
}

function RejectRequest(b, a) {
    confirmBox("Do you want reject this friend request !");
    $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
        $.ajax({
            type: "Post",
            url: "/User/RejectRequest",
            data: { tomem: b },
            dataType: "json",
            success: function (c) {
                1 == c ? ($(a).attr("disabled", "disabled"), $(a).html("Rejected"), $(a).parent().find("a").attr("disabled", "disabled")) : ($("#confirmation .modal-body h4").text("Sorry, Request has not been Completed. Please try again!"),
                $("#confirmation .modal-footer a").hide(),
                $("#confirmation .modal-footer button").text("Ok"),
                $("#confirmation").modal("show")
            )
            }, beforeSend: function () {
                $("#loadingreg").css("display", "block");
            }, complete: function () {
                $("#loadingreg").css("display", "none");
            }, error: function (a, b, d) {
                $("#confirmation .modal-body h4").text("Error while retrieving data!. Please reload the page!");
                $("#confirmation .modal-footer a").hide();
                $("#confirmation .modal-footer button").text("Ok");
                $("#confirmation").modal("show");
            }
        });
    });
}

function AcceptRequest(b, a) {
    confirmBox("Do you want to accept this friend request !");
    $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
        
        $.ajax({
            type: "Post",
            url: "/User/AcceptRequest",
            data: { tomem: b },
            dataType: "json",
            success: function (b) {
                1 == b ? ($(a).attr("disabled", "disabled"), $(a).html("Friends"), $(a).parent().find("a").attr("disabled", "disabled")) : ($("#confirmation .modal-body h4").text("Sorry, Request has not been Completed. Please try again!"),
                $("#confirmation .modal-footer a").hide(),
                $("#confirmation .modal-footer button").text("Ok"),
                $("#confirmation").modal("show"));
                window.location.href = window.location.href;
            }, beforeSend: function () {
                $("#loadingreg").css("display", "block");                
            },
            complete: function () { $("#loadingreg").css("display", "none");  },
            error: function (a, b, d) {
                $("#confirmation .modal-body h4").text("Error while retrieving data!. Please reload the page!");
                $("#confirmation .modal-footer a").hide();
                $("#confirmation .modal-footer button").text("Ok");
                $("#confirmation").modal("show");                
            }
        });        
    });
}

function GetData() {
    var b = $("#searchfriend").val();
    //alert(12);
    $.ajax({
        type: "GET", url: "/User/GetFreinds", data: { pageindex: pageIndex, pagesize: pageSize, tagprefix: b }, dataType: "json", success: function (a) {
            if (null != a) {
                for (var b = 0; b < a.length; b++) {                    
                    $(".mutualFriends").append("<li><span class='imgBox'><img src='" + (null == a[b].Mem_photo ? "/Content/images/default-profile.png" : a[b].Mem_photo) + "' /></span><span class='detailBox'><label>" + a[b].Mem_Name + " " + a[b].Mem_LName + "</label><label><a href='#'>" + a[b].Mautualfrnd + " Mutual Friends</a></label><label>" + (a[b].status == '1' ? "<label class='btn btn-primary'>Friend</label></span></li>" : a[b].status == '4' && a[b].Mem_ID != a[b].Mem_id2 ? "<label class='text-center btn btn-primary'>Pending</label></span></li>" : [b].Mem_id2 == [b].Mem_ID && a[b].status == '4' ? "<a id='btnaccept'  onclick='AcceptRequest(" + a[b].frndListId + ",this)' class='btn btn-primary'>Accept</a><a id='btnreject'  onclick='RejectRequest('" + a[b].frndListId + "',this)' class='btn btn-primary'>Reject</a></span></li>" : "<a  onclick='SendRequest(" + a[b].Mem_ID + ",this)' class='btn btn-primary'> + Friend</a></label></span></li>")); pageIndex++;
                }
            }
        }, beforeSend: function () {
            $("#loadingreg").css("display", "block")
        }, complete: function () {
            $("#loadingreg").css("display", "none")
        }, error: function (a, b, e) {
            $("#confirmation .modal-body h4").text("Error while retrieving data!. Please reload the page!");
            $("#confirmation .modal-footer a").hide();
            $("#confirmation .modal-footer button").text("Ok");
            $("#confirmation").modal("show");
        }
    })
}


function SendRequest(b, a) {
    //alert(b);
    confirmBox("Do you want to send friend request!");
    $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
        $.ajax({
            type: "Post", url: "/User/SendRequest",
            data: { tomem: b },
            dataType: "json",
            success: function (b) {
                if (true == b) {
                    $(a).attr("disabled", "disabled");
                    $(a).html("Request Sent");
                    location.reload();
                } else {
                    $("#confirmation .modal-body h4").text("Sorry, Request has not been Completed. Please try again!");
                    $("#confirmation .modal-footer a").hide();
                    $("#confirmation .modal-footer button").text("Ok");
                    $("#confirmation").modal("show");
                }
            }, beforeSend: function () { $("#loadingreg").css("display", "block") },
            complete: function () { $("#loadingreg").css("display", "none") },
            error: function (a, b, d) {
                $("#confirmation .modal-body h4").text("Error while retrieving data!. Please reload the page!");
                $("#confirmation .modal-footer a").hide();
                $("#confirmation .modal-footer button").text("Ok");
                $("#confirmation").modal("show");
            }
        });
    });
    
};


$(document).ready(function () {
    var userId=$("#userId").val();
    if(userId!=""){        
            $.ajax({
                type: "Post",
                url: "/User/getNotificationCount",
                data: {},
                dataType: "text",
                success: function (data) {
                    $("#totPenNotification").text(data)
                },
                Error: function (data) {

                }
            });        
        }
});








