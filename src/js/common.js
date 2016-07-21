//  ==========
//  = 公共js =
//  ==========
$(function() {
    /*左侧导航菜单二级菜单切换*/
    $('.submenu>a').click(function(e) {
        e.preventDefault();

        var submenu = $(this).siblings('ul');
        var li = $(this).parent('li');

        if (submenu.is(':visible')) {
            submenu.slideUp();
        } else {
            submenu.slideDown().parent('li').siblings().find('ul').slideUp();
        }
    });

    // 使用文件嵌入公共左侧菜单栏，故使用jq控制当前菜单项高亮
    /*思路：获取当前页面地址和左侧菜单栏地址比较，包含则给对应的菜单项高亮显示！*/
    var currentLocation = window.location.href, //当前页面地址
        sidebarLi = $('#sidebar>ul li a'), //依次获取dom元素、a元素数量
        sidebarLiSize = sidebarLi.size(),
        sidebarLihref = ''; //每个a子项对应的href
    // console.log(window.location.href);
    // console.log(sidebarLi.size());
    //循环匹配地址，对应则高亮
    for (var i = 0; i < sidebarLiSize; i++) {
        sidebarLihref = $(sidebarLi[i]).attr('href');
         console.log(sidebarLihref);
        if (currentLocation.indexOf(sidebarLihref) >= 0) {
            // console.log(0);
            $(sidebarLi[i]).parent('li').addClass('active').siblings('li').removeClass('active');
            return; //找到就结束循环退出
        }
    };



});
