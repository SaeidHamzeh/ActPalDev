$(document).ready(function () {

    /*==========Registration Validation Start==========*/

    $("#business form#form1").submit(function () {
        var flag = 0;
        $("#business form#form1 .businessForm").find(".errorMsg").remove();
        $("#business form#form1 .businessForm input, #business form#form1 .businessForm select, #business form#form1 .businessForm textarea").each(function () {
            if ($(this).val().trim() == "" && $(this).attr("name") != undefined && $(this).attr("data-optional") != "optional") {
                $(this).parent().append("<span class='errorMsg'>This field is required!</span>");
                $(this).val("");
                flag = 1;
            } else {
                if ($(this).attr("name") == "ServiceProvider_Email") {
                    if ($("input[name='ServiceProvider_ID']").val() == 0) {
                        if (!checkEmail($(this).val())) {
                            $(this).parent().append("<span class='errorMsg'>Please Enter Valid Email Id!</span>");
                        } else {
                            generateUserName($(this).val());
                        }
                    }
                }

                if ($(this).attr("id") == "confirmPass") {
                    if ($("#confirmPass").val() != $("input[name='ServiceProvider_Password']").val()) {
                        $(this).parent().append("<span class='errorMsg'>Confirm password is not matched with password!</span>");
                    } else {
                        $(this).parent().find(".errorMsg").remove();
                    }
                }

                if ($(this).attr("id") == "userName") {
                    if (checkUserNameValid($("#userName").val())) {
                        return false;
                    }
                }

                if ($(this).attr("id") == "ServPassword") {
                    $("#passwordValidation span text").each(function () {
                        if ($(this).hasClass("invalid")) {
                            flag = 1;
                            $("#ServPassword").parent().find(".errorMsg").remove();
                            $("#ServPassword").parent().append("<span class='errorMsg'>Password is not valid!</span>");
                            $("#ServPassword").trigger("focus");
                            $("#passwordValidation").addClass("active");
                        }
                    });
                    if (flag != 1) {
                        $("#passwordValidation").removeClass("active");
                        if (_passCheckWithMember($("#ServPassword").val())) {
                            flag = 1;
                        }
                    }
                }
            }
        });

        if (flag == 1) {
            return false;
        }
    });

    $("body").on("blur change", "#business form#form1 .businessForm input, #business form#form1 .businessForm select, #business form#form1 .businessForm textarea", function () {
        var flag = 0;
        $(this).parent().find(".errorMsg").remove();
        if ($(this).val().trim() == "" && $(this).attr("data-optional") != "optional") {
            $(this).parent().append("<span class='errorMsg'>This field is required!</span>");
            $(this).val("");
            flag = 1;
        } else {
            $(this).parent().find(".errorMsg").remove();
            if ($("input[name='ServiceProvider_ID']").val() == 0) {
                if ($(this).attr("name") == "ServiceProvider_Email") {
                    if (!checkEmail($(this).val())) {
                        $(this).parent().append("<span class='errorMsg'>Please Enter Valid Email Id!</span>");
                        flag = 1;
                    } else {
                        generateUserName($(this).val());
                    }
                }
            }

            if ($(this).attr("id") == "confirmPass") {
                if ($("#confirmPass").val() != $("input[name='ServiceProvider_Password']").val()) {
                    $(this).parent().append("<span class='errorMsg'>Confirm password is not matched with password!</span>");
                } else {
                    $(this).parent().find(".errorMsg").remove();
                }
            }

            if ($(this).attr("id") == "userName") {
                if (checkUserNameValid($("#userName").val())) {
                    flag = 1;
                }
            }

            if ($(this).attr("id") == "ServPassword") {
                $("#passwordValidation span text").each(function () {
                    if ($(this).hasClass("invalid")) {
                        flag = 1;
                        $("#ServPassword").parent().find(".errorMsg").remove();
                        $("#ServPassword").parent().append("<span class='errorMsg'>Password is not valid!</span>");
                        $("#ServPassword").trigger("focus");
                        $("#passwordValidation").addClass("active");
                    }

                });
                if (flag != 1) {
                    $("#passwordValidation").removeClass("active");
                    if (_passCheckWithMember($("#ServPassword").val())) {
                        flag = 1;
                    }
                }
            }
        }

        if (flag == 1) {
            return false;
        }
    });

    $("body").on("change", "#business form#form1 select", function () {
        $("#form1 input[type='submit']").attr("disabled", false);

        if ($(this).find("option:selected").text() == "Other") {
            $(this).parent().next().addClass("active");
        } else {
            $(this).parent().next().removeClass("active");
        }
    });

    $("body").on("keyup", "#business form#form1 .businessForm input", function () {
        $("#form1 input[type='submit']").attr("disabled", false);
    });

    $('#successMessageBtn').trigger("click");   
});


function checkEmail(email) {
    //var email = document.getElementById('txtEmail');

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
        return false;
    } else {
        return true;
    }
}


function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    //alert(charCode);
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode < 95 || charCode > 105)) {
        return false;
    }
    return true;
}

function generateUserName(email) {
    
    var userName = email.split("@");
    var data = "{'userName':'" + userName[0] + "','Email':'" + email + "','UserType':'SP'}";
    $.ajax({
        type: "POST",
        url: "/CascadingDropDown/_checkUserNameExist", // the URL of the controller action method
        data: data, // optional data
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            
            if (result == "0") {
                $("input[name='ServiceProvider_Email']").parent().find(".errorMsg").remove();
                $("input[name='ServiceProvider_Email']").parent().append("<span class='errorMsg'>This email already in database!</span>");
                $("#business form#form1 .businessForm input[type='submit']").attr("disabled", true);
                return false
            }
            else if (result != "-1") {
                if ($("#business form#form1 #userName").val() == "") {
                    $("#business form#form1 #userName").val(result);
                }
                $("#business form#form1 .businessForm input[type='submit']").attr("disabled", false);
            } else {
                alert("Something is wrong!");
            }
        },
        error: function (req, status, error) {
            //alert(123);
            // do something with error
        }
    });
}

function checkUserNameValid(userName) {
    var email = $("input[name='ServiceProvider_Email']").val();
    var data = "{'userName':'" + userName + "','Email':'" + email + "','UserType':'SP'}";

    $.ajax({
        type: "POST",
        url: "/CascadingDropDown/_checkUserNameExist", // the URL of the controller action method
        data: data, // optional data
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result == "0") {
                $("input[name='ServiceProvider_Email']").parent().find(".errorMsg").remove();
                $("input[name='ServiceProvider_Email']").parent().append("<span class='errorMsg'>This email already in database!</span>");
                $("#business form#form1 .businessForm input[type='submit']").attr("disabled", true);
                return false
            }
            else if (result != "-1") {
                if (result != $("#business form#form1 #userName").val()) {
                    $("#business form#form1 #userName").parent().find(".errorMsg").remove();
                    $("#business form#form1 #userName").val(userName);
                    $("#business form#form1 #userName").parent().append("<span class='errorMsg blackColor'>Already Exist. You can use it: <strong>" + result + "</strong></span>");
                    $("#business form#form1 .businessForm input[type='submit']").attr("disabled", false);
                    return true;
                }
            } else {
                //alert("Something is wrong!");
            }
        },
        error: function (req, status, error) {
            //alert(123);
            // do something with error
        }
    });
}

function _passCheckWithMember(password) {

    var data = "{'password':'" + password + "'}";
    $.ajax({
        type: "POST",
        url: "/CascadingDropDown/_passCheckWithMember", // the URL of the controller action method
        data: data, // optional data
        dataType: "text",
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result == "0") {
                $("input[name='ServiceProvider_Password']").parent().find(".errorMsg").remove();
                $("input[name='ServiceProvider_Password']").parent().append("<span class='errorMsg'>Password can't be same with member!</span>");
                $("#business form#form1 .businessForm input[type='submit']").attr("disabled", true);
                return true;
            }
        },
        error: function (req, status, error) {
            //alert(123);
            // do something with error
        }
    });
}