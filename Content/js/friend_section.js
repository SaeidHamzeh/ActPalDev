$(document).ready(function () {
    var frndId = "#" + $(".userProfile").attr("data-friendid");
    var logInstatus = $('.Memberlist ' + frndId).attr("class");
    checkLoginStatus(logInstatus);   
});

function checkLoginStatus(logInstatus) {
    setTimeout(function () {
        var frndId = "#" + $(".userProfile").attr("data-friendid");
        var logInstatus = $('.Memberlist ' + frndId).attr("class");
        //alert(logInstatus);
        if (logInstatus == undefined) {
            checkLoginStatus(logInstatus);
        } else {
            $(".currStatus").removeClass().addClass("currStatus " + logInstatus);
        }
    }, 300);
    
}