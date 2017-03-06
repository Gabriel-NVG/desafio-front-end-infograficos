$(function() {

    //BEGIN - Hover do submenu da navbar
    $(".navbarSubmenu").parent().hover(function() {
        $(this).find("ul").slideDown(100);
    }, function() {
        $(this).find("ul").slideUp(100);
    });
    //END - Hover do submenu da navbar

});
