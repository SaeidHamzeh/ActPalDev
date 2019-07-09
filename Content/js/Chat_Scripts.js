$(function () {
    clearInterval(refreshId);
    // Declare a proxy to reference the hub.
    var chatHub = $.connection.chatHub;
    $.connection.hub.logging = true;
    registerClientMethods(chatHub);
    // Start Hub
    $.connection.hub.start().done(function () {
        registerEvents(chatHub)

        //===========Send Comment of Groups Topic=========
        $("body").on("click", ".sendComment", function () {
            var userName = $("#hdnuser").val();
            var senderId = $("#hdnuserid").val();
            var topicId = $(".commentsBox").attr("id");
            var imgUrl = $(".profilepic").attr("src");
            var CommId = $("input[name='commentId']").val();
            var CommType = $("input[name='topicType']").val()

            var dt = new Date();
            var weekday = new Array(7);
            weekday[0] = "Sun";
            weekday[1] = "Mon";
            weekday[2] = "Tue";
            weekday[3] = "Wed";
            weekday[4] = "Thu";
            weekday[5] = "Fri";
            weekday[6] = "Sat";

            var time = weekday[dt.getDay()] + ", " + dt.getHours() + ":" + dt.getMinutes();
            var curDate = weekday[dt.getDay()] + ", " + dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();

            var message = "";
            var tabId = 1;//$(this).parent().attr("id");

            message = $(this).parent().find(".messageInput").val().replace(/\n/g, "<br/>");
            if (message != "") {
                chatHub.server.getCommentByUser(CommId, senderId, userName, imgUrl, topicId, message, CommType)
                $(this).parent().find("textarea").val("");
                $(this).parent().find("input[name='commentId']").val(0);
                $(".editCancel").removeClass("active");
            }
        });

        $("body").on("click", ".deleteComment", function () {
            var curr = $(this);
            
            confirmBox("Do You Want Delete This Comment!");
            $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
                var commentIdDel = curr.attr("data-commentid");
                var MemId = $("#userId").val();                
                chatHub.server.deleteCommentByMem(commentIdDel, MemId);
                $("#confirmBox").modal("hide");
            });
        });

        $("#groupTopicComment textarea").on("keyup", function (e) {
            if (e.which == 13) {
                if (e.ctrlKey) {
                    $(this).val($(this).val() + "\n");
                } else {
                    var lastInd = $(this).val().lastIndexOf("\n");
                    $(this).val($(this).val().substring(0, lastInd));
                    $(this).parent().find(".sendComment").click();
                }
            }
        });

        //===========Send Comment of Talent Post=========
        $("body").on("click", ".sendTalentPostComment", function () {
            var userName = $("#userName").val();
            var senderId = $("#userId").val();
            var talentPostId = $(this).attr("data-id");
            var imgUrl = $(".profilepic").attr("src");
            var CommId = $("input[name='commentId']").val();
            var dt = new Date();
            var weekday = new Array(7);
            weekday[0] = "Sun";
            weekday[1] = "Mon";
            weekday[2] = "Tue";
            weekday[3] = "Wed";
            weekday[4] = "Thu";
            weekday[5] = "Fri";
            weekday[6] = "Sat";

            var time = weekday[dt.getDay()] + ", " + dt.getHours() + ":" + dt.getMinutes();
            var curDate = weekday[dt.getDay()] + ", " + dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();

            var message = "";
            //var tabId = 1;//$(this).parent().attr("id");

            message = $(this).parent().find(".messageInput").val().replace(/\n/g, "<br/>");
            //alert(message);
            if (message != "") {
                chatHub.server.getTalentPostCommentByUser(CommId, senderId, userName, imgUrl, talentPostId, message)
                $(this).parent().find("textarea").val("");
                $(this).parent().find("input[name='commentId']").val(0);
                $(".editCancel").removeClass("active");
            }
        });

        $("body").on("click", ".deleteComment", function () {
            var curr = $(this);
            var postType = $(this).attr("data-post");
            confirmBox("Do You Want Delete This Comment!");
            $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
                var commentIdDel = curr.attr("data-commentid");
                var MemId = $("#userId").val();
                if (postType == "group") {
                    chatHub.server.deleteCommentByMem(commentIdDel, MemId);
                } else if (postType == "talent") {
                    chatHub.server.deleteTalentPostCommentByMem(commentIdDel, MemId);
                }
                $("#confirmBox").modal("hide");
            });
        });

        $("body").on("click", ".updateTalentPostContent", function () {
            var talentPostId = $("input[name='talentId']").val();
            var upDescription = $(".description").html();
            
            chatHub.server._updateAllPlaceTalentPost(talentPostId, upDescription);
        });

        $("#talentPostComment textarea").on("keyup", function (e) {
            if (e.which == 13) {
                if (e.ctrlKey) {
                    $(this).val($(this).val() + "\n");
                } else {
                    var lastInd = $(this).val().lastIndexOf("\n");
                    $(this).val($(this).val().substring(0, lastInd));
                    $(this).parent().find(".sendTalentPostComment").click();
                }
            }
        });
    });
});

// ------------------------------------------------------------------Variable ----------------------------------------------------------------------//
var loadMesgCount = 10;
var topPosition = 0;
var refreshId = null;

function scrollTop(ctrId) {
    var height = $('#' + ctrId).find('#divMessage')[0].scrollHeight;
    $('#' + ctrId).find('#divMessage').scrollTop(height);
}

// ------------------------------------------------------------------Start All Chat ----------------------------------------------------------------------//

function registerEvents(chatHub) {
    var username = $('#hdnuser').val();
    var userid = $('#hdnuserid').val();
    var usermail = $('#hdnemail').val();
    var loginStatus = $(".userProfile .statusBox .allStatus li.active").attr("data-status");

    $('#hdnemail').val(usermail);
    chatHub.server.connect(username, usermail, userid);

    $("#txtMessage").keypress(function (e) {
        if (e.which == 13) {
            $('#btnSendMsg').click();
        }
    });

    $('#btnSendMsg').click(function () {
        var msg = $("#txtMessage").val();
        if (msg.length > 0) {
            var userName = $('#hdUserName').val();
            chatHub.server.sendMessageToAll(userName, msg);
            $("#txtMessage").val('');
        }
    });

}

function registerClientMethods(chatHub) {
    
    //update live Group Topic Comment all places
    chatHub.client.updateCommentInAllPlaces = function (CommId, topicId, userName, imgUrl, message, option) {
        //alert(message.indexOf("<img src="));
        var commBoxId = "comm_" + CommId;
        var idLength = $("#" + commBoxId).length;
        //===Option is 1 means add edit and delete option....if option 0 means it's for other users
        if (idLength == 0 && option == 1) {
            if (message.indexOf("<img src='") > -1 || message.indexOf("<video") > -1 || message.indexOf("<a download") > -1) {
                $("body").find(".commentsBox#" + topicId).append("<div class='sentMessage' id='" + commBoxId + "'><div class='userImage'><img src='" + imgUrl + "' alt='' /></div><div class='messageContent'><p><strong>" + userName + ":</strong> <span class='commentText'>" + message + "</span></p></div><ul class='userInfoTabs pull-right optionsList'>"
                        + "<li><a>....</a><ul class='sub-menu'>"
                                + "<li class='deleteComment' data-commentid='" + CommId + "'>Delete</li></ul></li></ul>");
            } else {
                $("body").find(".commentsBox#" + topicId).append("<div class='sentMessage' id='" + commBoxId + "'><div class='userImage'><img src='" + imgUrl + "' alt='' /></div><div class='messageContent'><p><strong>" + userName + ":</strong> <span class='commentText'>" + message + "</span></p></div><ul class='userInfoTabs pull-right optionsList'>"
                        + "<li><a>....</a><ul class='sub-menu'><li class='editComment' data-commentid='" + CommId + "'>Edit</li>"
                                + "<li class='deleteComment' data-commentid='" + CommId + "'>Delete</li></ul></li></ul>");
            }

        } else if (idLength == 0 && option == 0) {
            $("body").find(".commentsBox#" + topicId).append("<div class='sentMessage' id='" + commBoxId + "'><div class='userImage'><img src='" + imgUrl + "' alt='' /></div><div class='messageContent'><p><strong>" + userName + ":</strong> <span class='commentText'>" + message + "</span></p></div><ul class='userInfoTabs pull-right optionsList'>");
        } else {
            $("body").find("#" + commBoxId).find(".messageContent").html("<p><strong>" + userName + "</strong>: <span class='commentText'>" + message + "</span></p>");
        }
    };

    chatHub.client.deleteCommentFromAll = function (commentIdDel) {
        $("body").find("#comm_" + commentIdDel).remove();
    }

    //update live Talent Post Comment all places
    chatHub.client.updateTalentPostCommentInAllPlaces = function (CommId, talentPostId, userName, imgUrl, message, option) {
        
        var commBoxId = "comm_" + CommId;
        var idLength = $("#" + commBoxId).length;
        //===Option is 1 means add edit and delete option....if option 0 means it's for other users
        if (idLength == 0 && option == 1) {
            if (message.indexOf("<img src='") > -1 || message.indexOf("<video") > -1 || message.indexOf("<a download") > -1) {
                $("body").find(".commentsBox#" + talentPostId).append("<div class='sentMessage' id='" + commBoxId + "'><div class='postOwnerImage'><img src='" + imgUrl + "' alt='' /></div><div class='memberDetail'>" + userName + "</div><div class='messageContent'><p><span class='commentText'>" + message + "</span></p></div><div class='userInfoTabs pull-right optionList'>"
                        + "<span class='optionIcon dropdown-toggle' data-toggle='dropdown'><i class='fa fa-ellipsis-v' aria-hidden='true'></i></span><ul class='dropdown-menu'>"
                                + "<li class='deleteComment' data-post='talent' data-commentid='" + CommId + "'>Delete</li></ul></div>");
            } else {
                $("body").find(".commentsBox#" + talentPostId).append("<div class='sentMessage' id='" + commBoxId + "'><div class='postOwnerImage'><img src='" + imgUrl + "' alt='' /></div><div class='memberDetail'>" + userName + "</div><div class='messageContent'><p><span class='commentText'>" + message + "</span></p></div><div class='userInfoTabs pull-right optionList'>"
                        + "<span class='optionIcon dropdown-toggle' data-toggle='dropdown'><i class='fa fa-ellipsis-v' aria-hidden='true'></i></span><ul class='dropdown-menu'><li class='editComment' data-commentid='" + CommId + "'>Edit</li>"
                                + "<li class='deleteComment' data-post='talent' data-commentid='" + CommId + "'>Delete</li></ul></div>");
            }

        } else if (idLength == 0 && option == 0) {
            $("body").find(".commentsBox#" + talentPostId).append("<div class='sentMessage' id='" + commBoxId + "'><div class='postOwnerImage'><img src='" + imgUrl + "' alt='' /></div><div class='memberDetail'>" + userName + "</div><div class='messageContent'><p><span class='commentText'>" + message + "</span></p></div><ul class='userInfoTabs pull-right optionsList'>");
        } else {
            $("body").find("#" + commBoxId).find(".messageContent").html("<p><strong>" + userName + "</strong>: <span class='commentText'>" + message + "</span></p>");
        }
    };

    chatHub.client._updateAllPlaceTalentPost = function (talentPostId, upDescription) {
        $("body").find("#TalentPost_" + talentPostId).find(".description").html(upDescription);
    }

    chatHub.client.deleteCommentFromAll = function (commentIdDel) {
        $("body").find("#comm_" + commentIdDel).remove();
    }



    // Calls when user successfully logged in
    chatHub.client.onConnected = function (id, userName, allUsers, messages) {
        $('#hdId').val(id);
        $('#hdUserName').val(userName);
        // Add All Users
        $('.Memberlist').empty();
        for (i = 0; i < allUsers.length; i++) {
            AddUser(chatHub, allUsers[i].Mem_ID, allUsers[i].Mem_Name, allUsers[i].Mem_Email, allUsers[i].Mem_Pic, allUsers[i].ConnectionID, allUsers[i].CountUnreadMsg, allUsers[i].LoginStatus)
        }
    }

    // On New User Connected
    chatHub.client.onNewUserConnected = function (id, name, email) {

        $('.Memberlist').each(function () {
            $(this).find('li').each(function () {
                var current = $(this);
                if (current.attr("id") == id) {
                    var str = current.attr("data-status");
                    if (str == "1" || str == "0") {
                        current.attr('class', 'online');
                    } else if (str == "2") {
                        current.attr('class', 'online away');
                    } else if (str == "3") {
                        current.attr('class', 'online doNotDisturb');
                    } else if (str == "4") {
                        current.attr('class', 'online offline');
                    }
                }
            });
        });

    }

    // On User Disconnected
    chatHub.client.onUserDisconnected = function (id, userName) {
        $('.Memberlist').each(function () {
            $(this).find('li').each(function () {
                var current = $(this);
                if (current.attr("id") == id) {
                    current.removeClass("online");
                }
            });
        });
    }

    // On User Disconnected Existing
    chatHub.client.onUserDisconnectedExisting = function (id, userName) {
        //$('#' + id).remove();
        //var ctrId = 'private_' + id;
        //$('#' + ctrId).remove();
    }

    chatHub.client.messageReceived = function (userName, message) {
        // AddMessage(userName, message);
    }

    chatHub.client.sendPrivateMessage = function (windowId, fromUserName, message, userEmail, email, status, fromUserId, fromuser_pic, Login_Status, ConnectionID) {
        var ctrId = 'private_' + windowId;

        if (status == 'Click') {
            if ($('#' + ctrId).length == 0) {
                //alert(Login_Status);
                createPrivateChatWindow(chatHub, windowId, ctrId, fromUserName, userEmail, email, Login_Status, ConnectionID);
                chatHub.server.getPrivateMessage(userEmail, email, loadMesgCount).done(function (msg) {
                    for (i = 0; i < msg.length; i++) {
                        if (msg[i].email == $('#hdnemail').val()) {
                            $('#' + ctrId).find('#divMessage').append("<p class='currentUser'>" + msg[i].message + '</p>');
                        }
                        else {
                            $('#' + ctrId).find('#divMessage').append("<p class='anotherPersong'>" + msg[i].message + '</p>');
                            $("<span class='userImg-icon'><img src='" + (msg[i].userpic == null ? "/Content/images/default-profile.png" : msg[i].userpic) + "' /></span>").insertAfter('#' + ctrId + ' #divMessage .anotherPersong .date');
                        }
                        // set scrollbar
                        scrollTop(ctrId);
                    }
                });
            }
            else {
                //alert(email + " || " + $('#hdnemail').val());
                if (email == $('#hdnemail').val()) {
                    $('#' + ctrId).find('#divMessage').append("<p class='anotherPersong'>" + message + '</p>');
                    $("<span class='userImg-icon'><img src='" + (fromuser_pic == null ? "/Content/images/default-profile.png" : fromuser_pic) + "' /></span>").insertAfter('#' + ctrId + ' #divMessage .anotherPersong .date');
                }
                else {
                    $('#' + ctrId).find('#divMessage').append("<p class='currentUser'>" + message + '</p>');
                }
                // set scrollbar
                scrollTop(ctrId);
            }
        }

        if (status == 'Type') {
            if (fromUserId == windowId)
                $('#' + ctrId).find('#msgTypeingName').text('typing...');
        }
        else { $('#' + ctrId).find('#msgTypeingName').text(''); }
    }
}

// Add User
function AddUser(chatHub, id, name, email, pic, connectionID, countUnreadmsg, LoginStatus) {
    var userId = $('#hdId').val();
    var userEmail = $('#hdnemail').val();
    // alert(email + " || " + userEmail);
    var code = "";
    var friendListing = $("<li><a id='Mem_" + id + "' data-id='" + id + "'><span><img src='" + pic + "' /></span>" + name + "<i class='fa fa-remove'></i></a></li>");
    code = $("<li data-status='" + LoginStatus + "' id='" + id + "' " + (connectionID == "" || LoginStatus == 0 ? "class='offline'" : LoginStatus == 1 ? "class='online available'" : LoginStatus == 2 ? "class='online away'" : LoginStatus == 3 ? "class='online dontDisturb'" : LoginStatus == 4 ? "class='online offline'" : "class='online'") + " data-id='" + id + "' ><a href='javascript:void(0)'><span><img src='" + pic + "' /></span>" + name + " <div class='badge'>" + (countUnreadmsg == 0 ? "" : countUnreadmsg) + "</div></a></li>");
    $(code).click(function () {
        var id = $(this).attr('id');
        if (userEmail != email) {
            OpenPrivateChatWindow(chatHub, id, name, userEmail, email, LoginStatus, connectionID);
        }
    });

    $(".friendList .FriendListBox").append(friendListing);
    $(".Memberlist").append(code);
}

// Add Message
function AddMessage(userName, message) {
    $('#divChatWindow').append('<div class="message"><span class="userName">' + userName + '</span>: ' + message + '</div>');

    var height = $('#divChatWindow')[0].scrollHeight;
    $('#divChatWindow').scrollTop(height);
}
// ------------------------------------------------------------------End All Chat ----------------------------------------------------------------------//


// ------------------------------------------------------------------Start Private Chat ----------------------------------------------------------------------//
function OpenPrivateChatWindow(chatHub, id, userName, userEmail, email, LoginStatus, connectionID) {
    if (document.getElementById("chatBoxSec").childElementCount < 3) {
        var ctrId = 'private_' + id;
        if ($('#' + ctrId).length > 0) return;

        createPrivateChatWindow(chatHub, id, ctrId, userName, userEmail, email, LoginStatus, connectionID);

        chatHub.server.getPrivateMessage(userEmail, email, loadMesgCount).done(function (msg) {
            for (i = 0; i < msg.length; i++) {
                if (msg[i].email == $('#hdnemail').val()) {
                    $('#' + ctrId).find('#divMessage').append("<p class='currentUser'>" + msg[i].message + '</p>');
                }
                else {
                    $('#' + ctrId).find('#divMessage').append("<p class='anotherPersong'>" + msg[i].message + '</p>');
                    $("<span class='userImg-icon'><img src='" + (msg[i].userpic == null ? "/Content/images/default-profile.png" : msg[i].userpic) + "' /></span>").insertAfter('#' + ctrId + ' #divMessage .anotherPersong .date');
                }
                // set scrollbar
                scrollTop(ctrId);
            }
        });

        $('.Memberlist').each(function () {
            $(this).find('li').each(function () {
                var current = $(this);
                if (current.attr("id") == id) {
                    current.find('.badge').html('');
                }
            });
        });
    }
}


function createPrivateChatWindow(chatHub, userId, ctrId, userName, userEmail, email, status, connectionID) {
    //alert(status + " " + connectionID);
    var className = "statusBar";
    if (connectionID == "") {
        className = 'offline statusBar';
    }
    else if (status == "1" || status == "0") {
        className = 'online available statusBar';
    } else if (status == "2") {
        className = 'online away statusBar';
    } else if (status == "3") {
        className = 'online doNotDisturb statusBar';
    } else if (status == "4") {
        className = 'online offline statusBar';
    }
    var div = "<div id=" + ctrId + " class='ui-widget-content draggable chatBox' rel='0'><span class='selText' id='msgTypeingName' rel='0'></span><h4 class='" + className + "'>" + userName + " <span class='pull-right'><img src='/Content/images/attachment.png' class='fileSharing' id='" + ctrId + 100 + "' /><input type='file' class='hide' onChange='fileSharing(this)' /> <i id='imgDelete' class='glyphicon glyphicon-remove-circle closeCurrChat'></i></span></h4>" +
       '<div id="divMessage" class="chatContent">' +
       "</div>" +
       "<div class='typingBox buttonBar'>" +
           '<textarea id="txtPrivateMessage" rows="2" class="form-control messageBox" placeholder="Message"></textarea></div>' +
    '<div class="fileUploading">File Uploading</div><input id="btnSendMessage" class="submitButton button" type="button" value="Send"   />' +
       "<div class='sharing'>" +
       "</div>" +
       '<div id="scrollLength"></div>' +
   "</div></div>";

    var $div = $(div);
    $('.chatBoxes').append($div);
    // ------------------------------------------------------------------ Scroll Load Data ----------------------------------------------------------------------//

    var scrollLength = 2;
    $div.find('.chatContent').scroll(function () {
        if ($(this).scrollTop() == 0) {
            if ($('#' + ctrId).find('#scrollLength').val() != '') {
                var c = parseInt($('#' + ctrId).find('#scrollLength').val(), 10);
                scrollLength = c + 1;
            }
            $('#' + ctrId).find('#scrollLength').val(scrollLength);
            var count = $('#' + ctrId).find('#scrollLength').val();

            chatHub.server.getScrollingChatData(userEmail, email, loadMesgCount, count).done(function (msg) {
                for (i = 0; i < msg.length; i++) {
                    var firstMsg = $('#' + ctrId).find('#divMessage').find('.anotherPersong:first');
                    // Where the page is currently:
                    var curOffset = firstMsg.offset().top - $('#' + ctrId).find('#divMessage').scrollTop();
                    // Prepend
                    if (msg[i].email == $('#hdnemail').val()) {
                        $('#' + ctrId).find('#divMessage').prepend("<p class='currentUser'>" + msg[i].message + '</p>');
                    }
                    else {
                        $('#' + ctrId).find('#divMessage').prepend("<p class='anotherPersong'><span><img src='" + (msg[i].userpic == null ? "/Content/images/default-profile.png" : msg[i].userpic) + "' /></span>" + msg[i].message + '</p>');
                    }
                    // Offset to previous first message minus original offset/scroll
                    $('#' + ctrId).find('#divMessage').scrollTop(firstMsg.offset().top - curOffset);
                }
            });
        }
    });

    // DELETE BUTTON IMAGE
    $div.find('#imgDelete').click(function () {
        $('#' + ctrId).remove();
    });

    // Send Button event
    $div.find("#btnSendMessage").click(function () {
        $textBox = $div.find("#txtPrivateMessage");
        var dt = new Date();
        var weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

        var curTime = weekday[dt.getDay()] + " " + dt.getHours() + ":" + dt.getMinutes();
        var curDate = weekday[dt.getDay()] + ", " + dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
        var msg = $textBox.val();

        if ($(this).parent().find("#divMessage p.currentUser:last-child span.date").attr("data-date") == "" || $(this).parent().find("#divMessage p:last-child span.date").attr("data-date") != curDate.toString()) {
            msg = "<span data-date='" + curDate + "' class='date'>" + curDate + "</span><span class='massege'>" + msg + "</span><br /><span class='time'>" + curTime + "</span>";
        } else {
            msg = "<span data-date='" + curDate + "' class='date'></span><span class='massege'>" + msg + "</span><br /><span class='time'>" + curTime + "</span>";
        }

        if (msg.length > 0) {
            chatHub.server.sendPrivateMessage(userId, msg, 'Click');
            $textBox.val('');
        }
    });

    // Text Box event
    $div.find("#txtPrivateMessage").keyup(function (e) {
        // alert('text key up');
        if (e.which == 13) {
            $div.find("#btnSendMessage").click();
        }

        // Typing
        $textBox = $div.find("#txtPrivateMessage");
        var msg = $textBox.val();
        if (msg.length > 0) {
            chatHub.server.sendPrivateMessage(userId, msg, 'Type');
        }
        else {
            chatHub.server.sendPrivateMessage(userId, msg, 'Empty');
        }

        clearInterval(refreshId);
        checkTyping(chatHub, userId, msg, $div, 5000);
    });
    // AddDivToContainer($div);
}

function checkTyping(chatHub, userId, msg, $div, time) {
    refreshId = setInterval(function () {
        // Typing
        $textBox = $div.find("#txtPrivateMessage");
        var msg = $textBox.val();
        if (msg.length == 0) {
            chatHub.server.sendPrivateMessage(userId, msg, 'Empty');
        }
    }, time);
}

function AddDivToContainer($div) {
    $('#divContainer').prepend($div);
    $div.draggable({
        handle: ".header",
        stop: function () {
        }
    });
}
// ------------------------------------------------------------------End Private Chat ----------------------------------------------------------------------//


//------------File sharing---------
function fileSharing(ev) {
    var fileUpload = $(ev).get(0);
    var files = fileUpload.files;
    var test = new FormData();
    //alert(123);
    // if (files.length > 0) {
    for (var i = 0; i < files.length; i++) {
        test.append(files[i].name, files[i]);
    }
    confirmBox("Do You Want Send This File!");
    $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) {
        if ($(ev).val() != "") {
            var msg, userId;
            $(ev).parents('.chatBox').find(".fileUploading").addClass("active");
            $.ajax({
                url: "../..//Utility/fileUpload.ashx",
                type: "POST",
                contentType: false,
                processData: false,
                data: test,
                // dataType: "json",
                success: function (result) {
                    if (result != "") {
                        msg = "<a href='" + result + "' download><i class='fa fa-download' aria-hidden='true'></i> Attached File</a>";
                        $(ev).parents('.chatBox').find(".fileUploading").removeClass("active");
                        $(ev).parents('.chatBox').find("#txtPrivateMessage").val(msg);
                        $(ev).parents('.chatBox').find(".submitButton#btnSendMessage").click();
                        $(ev).replaceWith("<input type='file' class='hide' onchange='fileSharing(this)' />");
                    }
                },
                error: function (err) {
                    alert(err.statusText + " Something is wrong Please check file type");
                }
            });
        }
        else {
            confirmBox("Do You Want To Submit Without File!");
            $("#confirmBox").modal("show").on('click', '#confirmResponse', function (e) { });

        }
    });
    // $(".fileSharing").replaceWith($(".fileSharing").clone(true));

}