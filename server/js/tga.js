/*
 * @Author: Mr.桐先生 
 * @Date: 2018-05-31 10:48:58 
 * @Last Modified by: Mr.桐先生
 * @Last Modified time: 2018-06-06 09:16:15
 */
$(document).ready(function () {
    //鼠标移入移除隐藏显示
    $('.top_small').on('mouseenter', function () {
        $(this).find('img').css('display', 'none');
        $('.rank ,.protect').css('display', 'none');
        $('.top_big').find('img').css('display', 'block');
    });
    $('.top_big').on('mouseleave', function () {
        $('.top_small').find('img').css('display', 'block');
        $('.rank ,.protect').css('display', 'block');
        $(this).find('img').css('display', 'none');
    });
    //滚动隐藏
    $(document).on('scroll', function () {
        var $docuHeight = $(this).scrollTop();
        if ($docuHeight > 200) {
            $('.float-r').css('display', 'block');
        } else {
            $('.float-r').css('display', 'none');
        }
    });
    //回到顶部
    $('#back-top').on('click', function () {
        $("html,body").animate({
            scrollTop: 0
        }, 400);
    });
    //鼠标移入右边微信logo显示
    $('.side-wx').on('mouseenter', function () {
        $(this).css('background-color', '#3079d3');
        $(this).find('span').css('color', '#fff');
        $('.icon-wx').css('background-position', ' -256px -20px');
        $('.wx-img').css('display', 'block');
    });
    //鼠标移入右边微信logo隐藏
    $('.side-wx').on('mouseleave', function () {
        $(this).css('background-color', '#273544');
        $(this).find('span').css('color', '#8294aa');
        $('.icon-wx').css('background-position', ' -196px -20px');
        $('.wx-img').css('display', 'none');
    });
    //鼠标放到方块添加on属性显示对应的图片
    $('.roll-nav>a').on('mouseenter', function () {
        var $listA = $(this).index();
        $(this).addClass('on').siblings('a').removeClass('on');
        $('#sideShow').stop(true, false).animate({
            left: $listA * -690
        }, 400);
        //鼠标移入先清除定时器
        clearInterval($timeIdT);
        var Abtn = $listA;
        //从当前图片开始进行轮播
        $timeIdT = setInterval(function () {
            Abtn++;
            if (Abtn > 3) {
                Abtn = 0;
            }
            $('.roll-nav>a').eq(Abtn).addClass('on').siblings('a').removeClass('on');
            $listA++;
            if ($listA == 5) {
                $('#sideShow').css('left', 0);
                $listA = 1;
            }
            $('#sideShow').animate({
                left: $listA * -690
            }, 400);

        }, 4000);
    });
    //实现自动轮播
    var $num = 0;
    var $count = 0;
    var $timeIdT = setInterval(function () {
        var $listS = $('#sideShow li');
        var $allA = $('.roll-nav>a');
        $num++;
        $count++;
        if ($count == $allA.length) {
            $allA.eq(0).addClass('on');
            $count = 0;
        }
        //遍历a加上on属性
        $allA.eq($count).addClass('on').siblings('a').removeClass('on');
        //判断当到达最后一张时迅速回到第一张,让位置变为0
        if ($num == $listS.length) {
            $('#sideShow').css('left', '0px');
            $num = 1;
        }
        //让图片滑动
        $('#sideShow').animate({
            left: $num * -690
        }, 400);
    }, 4000);
    //鼠标移入官方新闻添加底部边框改变字体颜色
    $('.news-nav li a').on('mouseenter', function () {
        $(this).css('color', '#3079d3').parent('li').siblings('li').find('a').css('color', '#839cbb');
        $(this).addClass('nav-bott').parent('li').siblings('li').find('a').removeClass('nav-bott');
    });

    //移入不同的标题显示各自的内容
    $('.nav-bott').on('mouseenter', function () {
        $('.news-officical').css('display', 'block').siblings('ul').css('display', 'none');
    });
    $('.battle').on('mouseenter', function () {
        $('.news-battle').css('display', 'block').siblings('ul').css('display', 'none');
    });
    // 鼠标移入视频遮罩变成透明度为0
    $('.video .cover').on('mouseenter', function () {
        $(this).find('.mask').css('opacity', 0);
        $(this).find('i').css('background-position', '-108px -20px');
        $(this).stop().animate({
            'marginTop': '-10px'
        }, 300);
        $(this).siblings('.video-name').css('color', '#3079d3');
    });
    $('.video .cover').on('mouseleave', function () {
        $(this).find('.mask').css('opacity', 0.3);
        $(this).find('i').css('background-position', '-20px -20px');
        $(this).stop().animate({
            'marginTop': 0
        }, 300);
        $(this).siblings('.video-name').css('color', '#839cbb');
    });
    // TGA大事记轮播图
    var timeIdM = null;
    var $add = 0;
    timeIdM = setInterval(function () {
        var $bigNewsL = $('.bigNews-inner div');
        $add++;
        if ($add == $bigNewsL.length) {
            $('.bigNews-inner').css('left', 0);
            $add = 1;
        }
        $('.bigNews-inner').stop().animate({
            'left': $add * -1060
        }, 400);
    }, 4000);

    //时间线鼠标事件
    $(".bigNews-nav .icon-dot").on('mouseenter', function () {
        $(this).css('background-position', '-120px -134px').parent('li').siblings('li').find('.icon-dot').css('background-position', '-208px -134px');
        $(this).siblings('span').css('color', '#5ca5ff').parent('li').siblings('li').find('span').css('color', '#506b87');
        var $indexE = $(this).parent('li').index();
        $('.bigNews-inner').stop(true, false).animate({
            'left': $indexE * -1060
        }, 400);
        clearInterval(timeIdM);
    });
    $(".bigNews-nav .icon-dot").on('mouseleave', function () {
        var $indexL = $(this).parent('li').index();
        timeIdM = setInterval(function () {
            $indexL++;
            if ($indexL == $('.bigNews-nav ul li').length + 1) {
                $('.bigNews-inner').css('left', 0);
                $indexL = 1;
            }
            $('.bigNews-inner').stop().animate({
                'left': $indexL * -1060
            }, 400);
        }, 4000);
    });
    //精彩瞬间图片鼠标事件
    $('#nice-moment .imgbox').on('mouseenter', function () {
        var $imgHeight = $(this).find('img').height();
        $(this).find('.imgbox-txt').stop().animate({
            'height': $imgHeight
        }, 400);
        //鼠标移入图片放大
        $(this).find('img').css({
            'transform': 'scale(1.2)',
            'transition': 'all 0.8s'
        });
    });
    $('#nice-moment .imgbox').on('mouseleave', function () {
        var $imgHeight = $(this).find('img').height();
        $(this).find('.imgbox-txt').stop().animate({
            'height': 0
        }, 400);
        $(this).find('img').css({
            'transform': 'scale(1)',
            'transition': 'all 0.8s'
        });
    });
    //游戏排行
    $('.rank').on('mouseenter', function () {
        $(this).find('.rank-game').css('display', 'block');
    });
    $('.rank').on('mouseleave', function () {
        $(this).find('.rank-game').css('display', 'none');
    });
});