$(document).ready(function () {
    $(".editTopicContent").click(function () {
        $(".GroupTopicContent").addClass("active");
        $(".GroupTopicContent").find("h3").attr("contenteditable", true);
        $(".GroupTopicContent .description").attr("contenteditable", true);
        $(".updatePostBtn,.cancelTopicContent").addClass("show");
    });

    $(".cancelTopicContent").click(function () {
        $(".GroupTopicContent").removeClass("active");
        $(".GroupTopicContent").find("h3").attr("contenteditable", false);
        $(".GroupTopicContent").find(".description").attr("contenteditable", false);
        $(".updatePostBtn,.cancelTopicContent").removeClass("show");
    });

    //========Group Section
    $(".updateServicesContent").click(function () {
        $("#loadingreg").addClass("show");
        var topicId = $(".GroupTopicContent").find("input[name='topicId']").val();
        var title = $(".GroupTopicContent").find("h3").html();
        var desc = $(".GroupTopicContent").find(".description").html();
        var data = "{'topicId':" + topicId + ",'topicName':'" + title + "','description':'" + desc + "' }";

        $.ajax({
            type: "POST",
            url: "/community/_updateGroupTopic", // the URL of the controller action method
            data: data, // optional data
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result == "1") {
                    $(".cancelTopicContent").click();
                    $("#modelsuccessful").modal("show");
                }
                $("#loadingreg").removeClass("show");
            },
            Error: function (err) {
                alert(err);
            }
        });
    });

    $(".updateTopicContent").click(function () {
        $("#loadingreg").addClass("show");
        var topicId = $(".GroupTopicContent").find("input[name='topicId']").val();
        var title = $(".GroupTopicContent").find("h3").html();
        var desc = $(".GroupTopicContent").find(".description").html();

        var data = "{'topicId':" + topicId + ",'topicName':'" + title + "','description':'" + desc + "' }";

        $.ajax({
            type: "POST",
            url: "/community/_updateGroupTopic", // the URL of the controller action method
            data: data, // optional data
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result == "1") {
                    $(".cancelTopicContent").click();
                    $("#modelsuccessful").modal("show");
                }
                $("#loadingreg").removeClass("show");
            },
            Error: function (err) {
                alert(err);
            }
        });
    });

    //========Talent Section
    $(".updateTalentPostContent").click(function () {
        $("#loadingreg").addClass("show");
        var talentId = $(".GroupTopicContent").find("input[name='talentId']").val();
        var desc = $(".GroupTopicContent").find(".description").html();

        var data = "{'talentPostId':" + talentId + ",'description':'" + desc + "' }";

        $.ajax({
            type: "POST",
            url: "/my_talent/_updateTalentPost", // the URL of the controller action method
            data: data, // optional data
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                if (result == "1") {
                    $(".cancelTopicContent").click();
                } else {
                    alert(err);
                }
                $("#loadingreg").removeClass("show");
            },
            Error: function (err) {
                alert(err);
            }
        });
    });
       
    
});