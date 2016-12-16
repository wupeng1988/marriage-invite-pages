$(function(){
/************window.resize*********************************************************************/
    //$(window).resize(function(){
    //    GC.w = document.documentElement.clientWidth;
    //    GC.h = document.documentElement.clientHeight;
    //    $('.page').css({width:GC.w,height:GC.h});
    //    $('.page1 .content').css({width:GC.w,height:GC.h});
    //});

    var timeout,isCanMove = false;
    function initDate(){
        //var time = getTime();
        //var str = +":"+time.second+"   "+time.week;
        //$('.page1 .date .time').html(time.hour+':'+time.minutes);
        //$('.page1 .date .week').html(time.month+'月'+time.day+'日'+'  '+time.week);
        //timeout = setTimeout(initDate,1000);
    }
    function getWeek(w){
        var week = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        return week[w];
    }
    function format(data){
        var result = ('00'+data).substr(((data+"").length == 1) ? 1 : 2);
        return result;
    }

    function page1Play(){
        //alert("in page1Play");
        var li = $('.page1 .message li');
        //for( var i = 0 ; i < li.length; i++ ){
            //(function(index){
                //alert(1111111);
                setTimeout(function(){
                    //alert(2222);
                    li.eq(0).addClass('page1LiAnimate').removeClass('hidden');
                    //alert(li[0].className+"    ,   "+li.eq(0).css('opacity'));
                    $('.tips')[0].currentTime = 0;
                    $('.tips')[0].play();
                    init.isCanMove = true;
                    //alert(init.isCanMove);
                },500);
           // })(0);
        //}
    }

    init.initDate = initDate;  // 设置时间循环
    init.page1Play = page1Play;  // 消息显示与消息声音提示

/*********page1 滑动来解锁***********************************************************************/
    var isTouchmove = false,
        startX = 0,
        pStartX = 0,
        pageSwipe = $('.page1 .content').get(0);
    pageSwipe.addEventListener('touchstart',function(event){
        event.preventDefault();
        var touch = event.targetTouches[0];
        startX = touch.pageX;
    },false);
    pageSwipe.addEventListener('touchmove',function(event){
        event.preventDefault();
        var touch = event.targetTouches[0];
        pStartX += touch.pageX - startX;
        startX = touch.pageX;
        $(this).css('left',pStartX);
        if( parseInt($(this).css('left')) > 0 ){
            isTouchmove = true;
        }else{
            isTouchmove = false;
        }
    },false);
    pageSwipe.addEventListener('touchend',function(){
        //alert(init.isCanMove);
        if( isTouchmove ){
            if( 1 ){
                clearTimeout(timeout);
                //if( $('.page1 .unlock')[0].readyState == 4 ){
                    $('.page1 .unlock')[0].play();
                //}
                $('.page1').addClass('hidden');
                showMessage();
            }else{
                $(this).css('left',0);
            }
        }else{
            $(this).css('left',0);
        }
        pStartX = 0;
        startX = 0;
        isTouchmove = false;
    },false);

/**********page2**************************************************************************/
    // 获取早两个小时的时间
    function getEarlyTime(){
        var time = getTime(),
            str = '';
        str += getFirstTime(time.hour - 2);
        if( (time.hour - 2) > 12 ){
            str += format((time.hour - 2 - 12)) + ':';
        }else{
            str += format(time.hour - 2)+':';
        }
        str += format(Math.floor(time.minutes / 3));
        return str;   //昨天 晚上10:23
    }
    // 获取当前时间
    function getCurrentTime(){
        var time = getTime(),
            str = '';
        str += getFirstTime(time.hour);
        if( time.hour > 12 ){
            str += format((time.hour - 12)) + ':';
        }else{
            str += format(time.hour)+':';
        }
        str += format(time.minutes);
        return str;   //昨天 晚上10:23
    }
    // 判断当前时间 所处阶段
    function getFirstTime(hour){
        if( hour < 0 ) {
            return '昨天 晚上';
        }else if( hour >= 0 && hour < 6 ){
            return '凌晨';
        }else if( hour >= 6 && hour < 10 ){
            return '上午';
        }else if( hour >= 10 && hour < 14 ){
            return '中午';
        }else if( hour >= 14 && hour < 18 ){
            return '下午';
        }else if( hour >= 18 && hour < 24 ){
            return '晚上';
        }
    }
    // 获取当前时间
    function getTime(){
        var date = new Date();
        var time = {
            'year':date.getFullYear(),
            'month':date.getMonth() + 1,
            'day':date.getDate(),
            'hour':format(date.getHours()),
            'minutes':format(date.getMinutes()),
            'second':format(date.getSeconds()),
            'week':getWeek(date.getDay())
        };
        return time;
    }
    // 依次显示信息
    function showMessage(){
        var li = $('.page2 .con .content li');
        $('.page2').removeClass('hidden');
        //li.eq(0).find('.mTime').html(getEarlyTime());
        //li.eq(2).find('.mTime').html(getCurrentTime());
        $('.page2 .con .content').removeClass('hidden');
        var totalHeight = 0,
            maxHigh = (GC.h / 1039) * 962,
            scrollTotop = 0;
        for( var j = 0 ; j < 3; j++ ){
            totalHeight += li.eq(j).height();
        }

        for( var i = 2; i < li.length;i++ ){
            (function(ind){
                setTimeout(function(){
                    li.eq(ind+1).addClass('liStart').removeClass('hidden');//.addClass('liAnimate');

                    var h = li.eq(ind+1).height();
                    totalHeight += h;

                    if( totalHeight > maxHigh - 10 ){
                        scrollTotop = totalHeight - maxHigh + 10;
                        setTimeout(function(){
                            $('.page2 .con .content').animate({'top':-scrollTotop+'px'},150);
                            $('.page2 .con .content').css('height',(maxHigh + scrollTotop) / 20 +'rem');
                        },(ind == 1) ? 0 : 350);

                    }
                    if( ind <= 2){
                        return;
                    }else{
                        li.eq(ind).removeClass('liStart').addClass('liAnimate');  // 每条消息出现的动画时间为 0.3s
                    }
                    if( ind == (li.length - 1) ){  // 当播放到最后一条消息时
                        setTimeout(showPage3,2500);   // 等待1650ms ，显示下一个页面
                    }
                    //if( $('.tips')[0].readyState == 4 ){
                        $('.tips')[0].currentTime = 0;
                        $('.tips')[0].play();
                    //}
                },(        (ind > 2 ) ? (ind-2) * 1200 : ((ind == 2) ? 800 : 0 )      )     );   // 每条消息播放等待时间分别比上一条消息的多 800ms
            })(i);
        }
    }
/******来电页面 page3 显示*****************************************************************************/
var minu = 0, sec = 0,voiceTime,isCanAnswer = false,isHangup = false;
    function showPage3(){
        // page3 渐显，时间为 1s  1s后隐藏page2  播放page3的音乐（即：来电铃声）
        $('.page3').removeClass('hidden');
        //setTimeout(function(){
            $('.page2').addClass('hidden');
            //if( $('.page3 .call')[0].readyState == 4 ){
                $('.page3 .call')[0].play();   // 来电铃声播放
            //}
            isCanAnswer = true;
        //},1000);
        //$('.page3').removeClass('hidden').addClass('toBig');//.animate({'width':GC.w / 20 + 'rem','height':GC.h / 20+'rem'},5000);
    }
    // 接听按钮点击
    $('.page3 .answer .answerBtn')[0].addEventListener('touchstart',function(){
        if( !isCanAnswer ){
            return;
        }
        $('.page3 .call')[0].pause();   // 来电铃声关闭

        $('.page3 .answer .answerLight').addClass('hidden');
        $(this).closest('.answer').addClass('moveToCenter');
        $('.page3 .hangup').animate({'opacity':0},500);
        setTimeout(function(){  // 500ms 后隐藏page3 显示page4
            $('.page3 .answer .answerBtn').addClass('toHangup');
            $('.page3').addClass('hidden');
            $('.page4').removeClass('hidden');
            //  初始化时间，并播放语音
            minu = 0;
            sec = 0;
            isHangup = true;
            //if( $('.page4 .hangupBtn audio')[0].readyState == 4 ){
                $('.page4 .hangupBtn audio')[0].play();
            //}
            ctrlVoiceTime();
        },500);
    },false);
/******通话页面 page4 显示*****************************************************************************/
    // 控制 通话 时间
    //advance = false, // 是否播放文案页
    var duduTime;   // 嘟嘟声音时间控制
    function ctrlVoiceTime(){
        $('.page4 .time').html(format(minu)+':'+format(sec));
        sec += 1;
        if( sec >= 60 ){
            sec = 0;
            minu += 1;
        }
        voiceTime = setTimeout(ctrlVoiceTime,1000);
        if( (minu * 60 + sec) > 8 ){  // 设定通话时间最大为8秒，五秒后清除通话时间的定时器，并暂停语音，播放嘟嘟声音
            clearTimeout(voiceTime);
            $('.page4 .hangupBtn audio')[0].pause();
            //if( $('.page4 .dudu')[0].readyState == 4 ){
                $('.page4 .dudu')[0].play();
            //}
            //advance = true;
            duduTime = setTimeout(function(){   // 嘟嘟声音为4秒，4秒后显示文案页
            	showMain();
            },4000);
        }
    }
    // 通话中 点击挂断按钮
    $('.page4 .hangupBtn').tap(function(){
        if( !isHangup ){
            return;
        }
        // 清除控制时间定时器  暂停语音  暂停嘟嘟声音 清除嘟嘟声音定时器
        clearTimeout(voiceTime);
        clearTimeout(duduTime);
        $('.page4 .hangupBtn audio')[0].pause();
        $('.page4 .dudu')[0].pause();
        //if( ( minu * 60 + sec ) > 7 ){
        //    advance = true;
        //}
        showMain();
    });

    function showMain(){
    	
        // 清除控制时间定时器  暂停语音  暂停嘟嘟声音 清除嘟嘟声音定时器
        clearTimeout(duduTime);
        clearTimeout(voiceTime);
        $('.page4 .hangupBtn audio')[0].pause();
        $('.page4 .dudu')[0].pause();

        //if( advance ){
            // 显示文案页 播放文案页的背景音乐
        $('.page4').addClass('hidden');
		
		$("#phone_cover").fadeOut("slow").addClass('hidden');
		$("#s_main").fadeIn("slow").removeClass('hidden');
		new ImgManager().init();
		document.getElementById("audio_main_bg").play();
    }
});

