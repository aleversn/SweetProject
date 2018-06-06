// JavaScript Document
$(function(){
    UIRefresh(true);
});
//请在document加载完毕后执行此函数//
function UIRefresh(init=false){
	$.each($("[xControl~=checkBox]"),function(i,item){
        if(xUIRefreshController(init,item)==0)
            return 0;
		$(item).append('<p class="checkBox" style="font-family: Segoe MDL2; cursor: pointer;">&#xE003;</p>');
        $(item).append('<p style="margin-left: 5px;">'+$(item).attr("xContent")+'</p>');
        $(item).attr("class","checkBox")
		$(item).bind('click',function(){
			if($(item).data("isChecked")==null)
			{
				$($(item).children("p").get(0)).html("&#xE005;");
				$(item).data("isChecked",1);
			}
			else
			{
				$($(item).children("p").get(0)).html("&#xE003;");
				$(item).removeData("isChecked");
			}
        });
	});
	$.each($("[xControl~=searchBox]"),function(i,item){
        if(xUIRefreshController(init,item)==0)
            return 0;
        $(item).attr("class","sinput search");
		$(item).wrap('<div class="sinput search" style="'+$(item).attr("style")+'"></div>');
        $(item).after('<p class="search-icon">'+xIcon("Search")+'</p>');
	});
    $.each($("[xControl~=comboBox]"),function(i,item){
        if(xUIRefreshController(init,item)==0)
            return 0;
        $(item).attr("class","combobox-item-container");
        $(item).wrap('<div class="combobox" style="'+$(item).attr("style")+'"></div>');
        $(item).removeAttr("style");
        $(item).after('<p style="padding: 5px; font-family: Segoe MDL2; font-size: 12px; color: rgba(36,36,36,0.5);">&#xE70D;</p>');
        $(item).after('<p style="width: 100%; padding: 5px;">Now</p>');
        $(item).next("p").html($($(item).children("option").get(0)).html());
        $(item).data("value",$($(item).children("option").get(0)).attr("value"));
        $(item).children("option").click(function(){
            $(item).next("p").html($(this).html());
            $(item).data("value",$(this).attr("value"));
            var index = $(this).index();
            $(item).animate({top:-30*index+"px"},200);
            $(item).fadeOut(10);
        });
        $(document).bind("click",function(e){
            try
            {
                if($(e.target).prop("class").indexOf("combobox")<0&&$(e.target).parent().prop("class").indexOf("combobox")<0)
                    $(".combobox-item-container").fadeOut(10);
            }
            catch(ex)
            {
                $(".combobox-item-container").fadeOut(10);
            }
        });
        $(item).parent().click(function(){
            if($(item).css("display")=="none")
                $(item).fadeIn(10);
            else
                $(item).fadeOut(10);
        });
        $(item).fadeOut(10);
    });
    $.each($("[xControl~=flipView]"),function(i,item){
        if(xUIRefreshController(init,item)==0)
            return 0;
        $(item).attr("class","flipview");
        $(item).append('<div class="pad" style="width: 300%; height: 100%; display: flex; align-items: center;"></div>');
        $(item).append('<p class="controlbtn" style="left:0px; top:42.5%;">&#xE0E2;</p>');
        $(item).append('<p class="controlbtn" style="right:0px; top:42.5%;">&#xE0E3;</p>');
        $($(item).children(".controlbtn").get(0)).click(function(){slideUp()});
        $($(item).children(".controlbtn").get(1)).click(function(){slideDown()});
        var pad = $(item).children(".pad").get(0);
        //---------------------Custom----------------------------------------------------//
        var duration = $(item).attr("xDuration")==null?10000:$(item).attr("xDuration");
        var speed = $(item).attr("xSpeed")==null?1500:$(item).attr("xSpeed");
        //-------------------------------------------------------------------------------//
        $.each($(item).children("img"),function(i,img){
            $(img).width($(item).width()+'px');
            $(pad).append($(img));
        });
        var t = null;
        $(window).resize(function(){
            clearInterval(t);
            t = setInterval(function(){resize();clearInterval(t);},300);
        });
        var num = $(pad).children("img").length;
        var cur = 0;
        var timer = setInterval(function(){
            if(cur<num-1)
                cur++;
            else
                cur=0;
            $(pad).animate({
                margin:"0px 0px 0px -"+$(item).width()*cur+"px"
            },speed);
        },duration);
        resize();
        function resize()
        {
            var minImg = $(item).find("img").get(0);
            $.each($(item).find("img"),function(i,img){
                $(img).width($(item).width()+'px');
                if($(minImg).height()>$(img).height())
                    minImg = img;
                if($(img).height()<$(item).height())
                {
                    if($(item).data("xxxHeight")==null)
                        $(item).data("xxxHeight",$(item).height());
                    $(item).css("height",$(img).height()+"px");
                }
            });
            if($(minImg).height()>$(item).height())
                $(item).css("height",$(item).data("xxxHeight")+"px");
            slide();
        }
        function slide()
        {
            clearInterval(timer);
            $(pad).animate({
                margin:"0px 0px 0px -"+$(item).width()*cur+"px"
            },"easeOutQuint");
            // $(pad).css("margin","0px 0px 0px -"+$(item).width()*cur+"px");
            timer = setInterval(function(){
                if(cur<num-1)
                    cur++;
                else
                    cur=0;
                $(pad).animate({
                    margin:"0px 0px 0px -"+$(item).width()*cur+"px"
                },speed);
            },duration);
        }
        function slideUp()
        {
            clearInterval(timer);
            if(cur>0)
                cur--;
            else
                cur=num-1;
            $(pad).animate({
                margin:"0px 0px 0px -"+$(item).width()*cur+"px"
            },"easeOutQuint");
            timer = setInterval(function(){
                if(cur<num-1)
                    cur++;
                else
                    cur=0;
                $(pad).animate({
                    margin:"0px 0px 0px -"+$(item).width()*cur+"px"
                },speed);
            },duration);
        }
        function slideDown()
        {
            clearInterval(timer);
            if(cur<num-1)
                cur++;
            else
                cur=0;
            $(pad).animate({
                margin:"0px 0px 0px -"+$(item).width()*cur+"px"
            },"easeOutQuint");
            timer = setInterval(function(){
                if(cur<num-1)
                    cur++;
                else
                    cur=0;
                $(pad).animate({
                    margin:"0px 0px 0px -"+$(item).width()*cur+"px"
                },speed);
            },duration);
        }
        //---------------预备事件-readyEvents--------------//
        if($(item).attr("xReady")!=null)
            eval($(item).attr("xReady")+"(item)");
    });
    $.each($("[xControl~=scrollSticky]"),function(i,item){
        if(xUIRefreshController(init,item)==0)
            return 0;
        var top = $(item).offset().top;
        var offset = $(item).attr("xOffset")==null?0:$(item).attr("xOffset");
        var child = item.cloneNode(true);
        var width = $(item).outerWidth();
        var left = $(item).offset().left;
        var bk = $(item).attr("style");
        $(child).removeAttr("id");
        $(child).removeAttr("xControl");
        $(child).css("visibility","hidden");
        $.each($(child).find("*"),function(i,item){$(item).remove();});
        $(item).before(child);
        $(child).css("display","none");
        $(document).scroll(function(){
            if(window.scrollY>top-offset)
            {
                $(child).css("display","");
                $(item).css("position","fixed");
                $(item).css("width",width+"px");
                $(item).css("left",$(child).offset().left+"px");
                $(item).css("top",offset+"px");
                $(item).css("z-index","999");
            }
            else
            {
                $(child).css("display","none");
                $(item).removeAttr("style");
                $(item).attr("style",bk);
            }
        });
        $(window).resize(function(){
            width = $(child).outerWidth();
            $(item).css("width",width+"px");
        });
    });
    //需使用非异步Ajax加载且必须在document.ready事件之后(您可以放到window.onload()事件中或直接添加到<script>标签中)//
    //若使用异步Ajax请在加载完成后执行UIRefresh()并且添加属性xHost为true//
    $.each($("[xControl~=treeView]"),function(i,item){
        if(xUIRefreshController(init,item)==0)
            return 0;
        $(item).html("<p></p>");
        var treeViewItemSonClass="treeview-item-son";
        var treeViewItemSonChooseClass="treeview-item-son-choose";
        if($(item).attr("xItemStyle")!=null)
            treeViewItemSonClass = $(item).attr("xItemStyle");
        if($(item).attr("xItemChooseStyle")!=null)
            treeViewItemSonChooseClass = $(item).attr("xItemChooseStyle");
        var data = eval($(item).attr("xJson"));
        sTreeView(item,data,treeViewItemSonClass,treeViewItemSonChooseClass);
        $.each($(item).find("p"),function(i,p){
            $(p).click(function(){
                if($(p).parent().children("div").get(0)==null)
                {
                    $.each($(item).find("p"),function(i,pt){
                        if($(pt).parent().children("div").get(0)==null)
                        {
                            $(pt).parent().children("div").hide();
                            $(pt).parent().removeData("isShowed");
                            $(pt).attr("class",treeViewItemSonClass);
                        }
                    });
                    $(p).parent().children("div").slideDown();
                    $(p).parent().data("isShowed",1);
                    $(p).attr("class",treeViewItemSonChooseClass);
                }
            });
            if($(p).parent().children("div").get(0)!=null)
            {
                $(p).css('font-family','Segoe MDL2,微软雅黑');
                $(p).data("html",$(p).html());
                $(p).css("padding-left","5px");
                $(p).html("&#xE0E3; "+$(p).data("html"));
                $(p).click(function(){
                    if($(p).data("xsxsxsxsxsxsxsxs")==null)
                    {
                        $(p).html("&#xE0E5; "+$(p).data("html"));
                        $(p).data("xsxsxsxsxsxsxsxs",1);
                    }
                    else
                    {
                        $(p).html("&#xE0E3; "+$(p).data("html"));
                        $(p).removeData("xsxsxsxsxsxsxsxs")
                    }
                });
            }
        });
        //---------------预备事件-readyEvents--------------//
        if($(item).attr("xReady")!=null)
            eval($(item).attr("xReady")+"(item)");
    });
    $.each($("[xControl~=linkView]"),function(i,item){
        if(xUIRefreshController(init,item)==0)
            return 0;
        $(item).html("<a></a>");
        var treeViewItemSonClass="treeview-item-son";
        var treeViewItemSonChooseClass="treeview-item-son-choose";
        if($(item).attr("xItemStyle")!=null)
            treeViewItemSonClass = $(item).attr("xItemStyle");
        if($(item).attr("xItemChooseStyle")!=null)
            treeViewItemSonChooseClass = $(item).attr("xItemChooseStyle");
        var data = eval($(item).attr("xJson"));
        sTreeView(item,data);
        $.each($(item).find("a"),function(i,a){$(a).attr("href",$(a).data("value"));});
    });
    $.each($("[xControl~=flyOut]"),function(i,item){
        if(xUIRefreshController(init,item)==0)
            return 0;
        var flyOutCustomStyle="flyout";
        var flyOutItemStyle="";
        var towards = 3;
        if($(item).attr("xCustomStyle")!=null)
            flyOutCustomStyle = $(item).attr("xCustomStyle");
        if($(item).attr("xItemStyle")!=null)
            flyOutItemStyle = $(item).attr("xItemStyle");
        if($(item).attr("xTowards")!=null)
            towards = TowardsToNum($(item).attr("xTowards"));
        $(item).attr("class",flyOutCustomStyle);
        $(item).children("span").attr("class",flyOutItemStyle);
        $(item).css("display","none");
        var Attacher = $($(item).attr("xAttach")).get(0);
        var guid = Guid();
        $(Attacher).data("xAttachId",guid);
        $(document).bind("click",function(e){
            var target = $(e.target);
            if((target!=item)&&($(target).data("xAttachId")!=$(Attacher).data("xAttachId")))
            {
                $(item).fadeOut(50);
            }
        });
        $(Attacher).click(function(){
            $(item).css("display","flex");
            if(towards==0)
            {
                $(item).css("left",$(Attacher).offset().left-$(item).outerWidth()+"px");
                $(item).css("top",$(Attacher).offset().top+"px");
            }
            if(towards==1)
            {
                $(item).css("left",$(Attacher).offset().left+($(Attacher).outerWidth()-$(item).outerWidth())/2+"px");
                $(item).css("top",$(Attacher).offset().top-$(item).outerHeight()+"px");
            }
            if(towards==2)
            {
                $(item).css("left",$(Attacher).offset().left+$(Attacher).outerWidth()+"px");
                $(item).css("top",$(Attacher).offset().top+"px");
            }
            if(towards==3)
            {
                $(item).css("left",$(Attacher).offset().left+($(Attacher).outerWidth()-$(item).outerWidth())/2+"px");
                $(item).css("top",$(Attacher).offset().top+$(0).outerHeight()+"px");
            }
            $(item).slideDown();
        });
        function TowardsToNum(c="0")
        {
            if(c.toLowerCase()=="left"||c=="0")
                return 0;
            else if(c.toLowerCase()=="top"||c=="1")
                return 1;
            else if(c.toLowerCase()=="right"||c=="2")
                return 2;
            else if(c.toLowerCase()=="bottom"||c=="3")
                return 3;
            else
                return 0;
        }
    });
    $.each($("[xControl~=rightMenu]"),function(i,item){
        if(xUIRefreshController(init,item)==0)
            return 0;
        var flyOutCustomStyle="flyout";
        var flyOutItemStyle="";
        if($(item).attr("xCustomStyle")!=null)
            flyOutCustomStyle = $(item).attr("xCustomStyle");
        if($(item).attr("xItemStyle")!=null)
            flyOutItemStyle = $(item).attr("xItemStyle");
        $(item).attr("class",flyOutCustomStyle);
        $(item).children("span").attr("class",flyOutItemStyle);
        $(item).css("display","none");
        //--------------------------------------//
        var Attacher = $($(item).attr("xAttach"));
        //--------------------------------------//
        var guid = Guid();
        $(Attacher).data("xAttachRightId",guid);
        $(document).bind("click",function(e){
            var target = $(e.target);
            if((target!=item)&&($(target).data("xAttachRightId")!=$(Attacher).data("xAttachRightId")))
            {
                $(item).fadeOut(50);
            }
        });
        $(Attacher).mouseup(function(e){
            if(e.which!=3)
                return 0;
            $(item).css("display","flex");
            if(GetMousePosition().x+$(item).outerWidth()>window.screen.availWidth)
                $(item).css("left",GetMousePosition().x-$(item).outerWidth()+"px");
            else
                $(item).css("left",GetMousePosition().x+"px");
            $(item).css("top",GetMousePosition().y+"px");
            $(item).slideDown();
            //返回当前吸附对象 return current attacher//
            $(item).data("NowAttacher",e.target);
        });
    });
}

function xUIRefreshController(init,item)
{
    //初始化将刷新所有非模板控件//在此阶段非模板控件无法强制刷新//
    if(init==true&&$(item).parents("[xControl~=template]").length>0)
        return 0;
    //非初始化状态//
    if(init==false)
    {
        //非模板控件//
        if($(item).parents("[xControl~=template]").length<=0)
        {
            if($(item).attr("xHost")=="true")
                return 1;
            else
                return 0;
        }
        else //模板控件//默认为一次刷新//
        {
            if($(item).data("xControlOnceRefreshUsedUp")==null)
            {
                $(item).data("xControlOnceRefreshUsedUp",1);
                return 1;
            }
            else
            {
                if($(item).attr("xHost")=="true")
                    return 1;
                else
                    return 0;
            }
        }
    }
}

function TreeViewRefresh(item)
{
    $(item).html("<p></p>");
        var treeViewItemSonClass="treeview-item-son";
        var treeViewItemSonChooseClass="treeview-item-son-choose";
        if($(item).attr("xItemStyle")!=null)
            treeViewItemSonClass = $(item).attr("xItemStyle");
        if($(item).attr("xItemChooseStyle")!=null)
            treeViewItemSonChooseClass = $(item).attr("xItemChooseStyle");
        var data = eval($(item).attr("xJson"));
        sTreeView(item,data,treeViewItemSonClass,treeViewItemSonChooseClass);
        $.each($(item).find("p"),function(i,p){
            $(p).click(function(){
                if($(p).parent().children("div").get(0)==null)
                {
                    $.each($(item).find("p"),function(i,pt){
                        if($(pt).parent().children("div").get(0)==null)
                        {
                            $(pt).parent().children("div").hide();
                            $(pt).parent().removeData("isShowed");
                            $(pt).attr("class",treeViewItemSonClass);
                        }
                    });
                    $(p).parent().children("div").slideDown();
                    $(p).parent().data("isShowed",1);
                    $(p).attr("class",treeViewItemSonChooseClass);
                }
            });
            if($(p).parent().children("div").get(0)!=null)
            {
                $(p).css('font-family','Segoe MDL2,微软雅黑');
                $(p).data("html",$(p).html());
                $(p).css("padding-left","5px");
                $(p).html("&#xE0E3; "+$(p).data("html"));
                $(p).click(function(){
                    if($(p).data("xsxsxsxsxsxsxsxs")==null)
                    {
                        $(p).html("&#xE0E5; "+$(p).data("html"));
                        $(p).data("xsxsxsxsxsxsxsxs",1);
                    }
                    else
                    {
                        $(p).html("&#xE0E3; "+$(p).data("html"));
                        $(p).removeData("xsxsxsxsxsxsxsxs")
                    }
                });
            }
        });
        //---------------预备事件-readyEvents--------------//
        if($(item).attr("xReady")!=null)
            eval($(item).attr("xReady")+"(item)");
}

var Sweetbridge = new Array();
var SweetHashTemplate = new Array();
$(document).ready(function(){
    bridgeAdd([{"name":"lpc","age":"21"},{"name":"wsj","age":"22"},{"name":"wife","age":"21"}],"Sample");
    xDataInit();
    xDataGetUrlInit();
});

function xIcon(name)
{
	switch(name)
	{
		case "Search":
			return "&#xE721;";
	}
}

function bridgeAdd(obj,name)
{
    if(name==""||obj==null)
        return 0;
    if(SweetHashTemplate[name] == true)
    {
        for(s in Sweetbridge)
        {
            if(Sweetbridge[s].name==name)
                Sweetbridge[s].obj = obj;
        }
    }
    else
    {
        Sweetbridge.push({obj:obj,name:name});
        SweetHashTemplate[name] = true;
    }
}

function xDataInit()
{
    for(s in Sweetbridge)
    {
        $.each($("[xData="+Sweetbridge[s].name+"]"),function(i,item){
            if($(item).data("xDataGetUrlUsedUp")==null)
            {
                var guid = Guid();
                SweetHashTemplate[guid]=$(item).html();
                $(item).data("xDataGetUrlUsedUp",guid);
            }
            else
                $(item).html(SweetHashTemplate[$(item).data("xDataGetUrlUsedUp")]);
            var model = $(item).children("[xControl=template]").get(0);
            var data = Sweetbridge[s].obj;
            var neighbor = $(model).prev("*").get(0)==null?true:$(model).prev("*").get(0);
            $(model).remove();
            for(var obj in data)
            {
                var t = model.cloneNode(true);
                for(var jo in data[obj])
                {
                    if($(t).attr("xValue")==jo)
                    {
                        $(t).data("value",data[obj][jo]);
                    }
                    if($(t).html=='{x:Binding '+jo+'}')
                    {
                        $(t).html(data[obj][jo]);
                        break;
                    }
                    $.each($(t).find("*"),function(i,el){
                        if($(el).html()=='{x:Binding '+jo+'}')
                        {
                            $(el).html(data[obj][jo]);
                        }
                        if($(el).attr("xValue")==jo)
                        {
                            $(el).data("value",data[obj][jo]);
                        }
                    });
                }
                if(neighbor==true)
                {
                    $(item).append(t);
                }
                else
                {
                    $(neighbor).after(t);
                    neighbor = t;
                }
            }
        });
    }
}

function xDataGetUrlInit()
{
    $.each($("div"),function(i,item){
        if($(item).attr("xDataGetUrl")!=null)
        {
            if($(item).data("xDataGetUrlUsedUp")==null)
            {
                var guid = Guid();
                SweetHashTemplate[guid]=$(item).html();
                $(item).data("xDataGetUrlUsedUp",guid);
            }
            else
                $(item).html(SweetHashTemplate[$(item).data("xDataGetUrlUsedUp")]);
            var model = $(item).children("[xControl=template]").get(0);
            var ori_json = AjaxGet($(item).attr("xDataGetUrl"));
            if($(item).attr("xJsonParse")==true)
                ori_json = JSON.parse(ori_json);
            var data = new Array();
            $.each(ori_json,function(i,item){
                data.push(item);
            });
            var neighbor = $(model).prev("*").get(0)==null?true:$(model).prev("*").get(0);
            $(model).remove();
            for(var obj in data)
            {
                var t = model.cloneNode(true);
                for(var jo in data[obj])
                {
                    if($(t).attr("xValue")==jo)
                    {
                        $(t).data("value",data[obj][jo]);
                    }
                    if($(t).html=='{x:Binding '+jo+'}')
                    {
                        $(t).html(data[obj][jo]);
                        break;
                    }
                    $.each($(t).find("*"),function(i,el){
                    if($(el).html()=='{x:Binding '+jo+'}')
                    {
                        $(el).html(data[obj][jo]);
                    }
                        if($(el).attr("xValue")==jo)
                        {
                            $(el).data("value",data[obj][jo]);
                        }
                    });
                }
                if(neighbor==true)
                {
                    $(item).append(t);
                }
                else
                {
                    $(neighbor).after(t);
                    neighbor = t;
                }
            }
        }
    });
}

function xDataGetUrlAsyncInit()
{
    $.each($("div"),function(i,item){
        if($(item).attr("xDataGetUrlAsync")!=null)
        {
            if($(item).data("xDataGetUrlUsedUp")==null)
            {
                var guid = Guid();
                SweetHashTemplate[guid]=$(item).html();
                $(item).data("xDataGetUrlUsedUp",guid);
            }
            else
                $(item).html(SweetHashTemplate[$(item).data("xDataGetUrlUsedUp")]);
            var model = $(item).children("[xControl=template]").get(0);
            $.ajax({
                type:"get",
                url:$(item).attr("xDataGetUrlAsync"),
                success:function(data){
                    xDataGetUrlAsync(item,data);
                }
            });
        }
    });
}

function xDataGetUrlAsync(item,ori_json)
{
    if($(item).attr("xDataGetUrlAsync")!=null)
    {
        if($(item).data("xDataGetUrlUsedUp")==null)
        {
            var guid = Guid();
            SweetHashTemplate[guid]=$(item).html();
            $(item).data("xDataGetUrlUsedUp",guid);
        }
        else
            $(item).html(SweetHashTemplate[$(item).data("xDataGetUrlUsedUp")]);
        var model = $(item).children("[xControl=template]").get(0);
        if($(item).attr("xJsonParse")==true)
            ori_json = JSON.parse(ori_json);
        var data = new Array();
        $.each(ori_json,function(i,item){
            data.push(item);
        });
        var neighbor = $(model).prev("*").get(0)==null?true:$(model).prev("*").get(0);
        $(model).remove();
        for(var obj in data)
        {
            var t = model.cloneNode(true);
            for(var jo in data[obj])
            {
                if($(t).attr("xValue")==jo)
                {
                    $(t).data("value",data[obj][jo]);
                }
                if($(t).html=='{x:Binding '+jo+'}')
                {
                    $(t).html(data[obj][jo]);
                    break;
                }
                $.each($(t).find("*"),function(i,el){
                if($(el).html()=='{x:Binding '+jo+'}')
                {
                    $(el).html(data[obj][jo]);
                }
                    if($(el).attr("xValue")==jo)
                    {
                        $(el).data("value",data[obj][jo]);
                    }
                });
            }
            if(neighbor==true)
            {
                $(item).append(t);
            }
            else
            {
                $(neighbor).after(t);
                neighbor = t;
            }
        }
    }
}

function xDataContinous(item)
{
    var tDiv = document.createElement("div");
    if($(item).data("xDataGetUrlUsedUp")==null)
    {
        return 0;
    }
    else
        $(tDiv).html(SweetHashTemplate[$(item).data("xDataGetUrlUsedUp")]);
    var model = $(tDiv).children("[xControl=template]").get(0);
    var data = Sweetbridge[s].obj;
    var neighbor = $(item).children("[xControl=template]:last");
    for(var obj in data)
    {
        var t = model.cloneNode(true);
        for(var jo in data[obj])
        {
            if($(t).attr("xValue")==jo)
            {
                $(t).data("value",data[obj][jo]);
            }
            if($(t).html=='{x:Binding '+jo+'}')
            {
                $(t).html(data[obj][jo]);
                break;
            }
            $.each($(t).find("*"),function(i,el){
                if($(el).html()=='{x:Binding '+jo+'}')
                {
                    $(el).html(data[obj][jo]);
                }
                if($(el).attr("xValue")==jo)
                {
                    $(el).data("value",data[obj][jo]);
                }
            });
        }
        if(neighbor==true)
        {
            $(item).append(t);
        }
        else
        {
            $(neighbor).after(t);
            neighbor = t;
        }
    }
}

function xDataGetUrlContinous(item)
{
    if($(item).attr("xDataGetUrl")!=null)
    {
        var tDiv = document.createElement("div");
        if($(item).data("xDataGetUrlUsedUp")==null)
        {
            return 0;
        }
        else
            $(tDiv).html(SweetHashTemplate[$(item).data("xDataGetUrlUsedUp")]);
        var model = $(tDiv).children("[xControl=template]").get(0);
        var ori_json = AjaxGet($(item).attr("xDataGetUrl"));
        if($(item).attr("xJsonParse")==true)
            ori_json = JSON.parse(ori_json);
        var data = new Array();
        $.each(ori_json,function(i,item){
            data.push(item);
        });
        var neighbor = $(item).children("[xControl=template]:last");
        for(var obj in data)
        {
            var t = model.cloneNode(true);
            for(var jo in data[obj])
            {
                if($(t).attr("xValue")==jo)
                {
                    $(t).data("value",data[obj][jo]);
                }
                if($(t).html=='{x:Binding '+jo+'}')
                {
                    $(t).html(data[obj][jo]);
                    break;
                }
                $.each($(t).find("*"),function(i,el){
                if($(el).html()=='{x:Binding '+jo+'}')
                {
                    $(el).html(data[obj][jo]);
                }
                    if($(el).attr("xValue")==jo)
                    {
                        $(el).data("value",data[obj][jo]);
                    }
                });
            }
            if(neighbor==true)
            {
                $(item).append(t);
            }
            else
            {
                $(neighbor).after(t);
                neighbor = t;
            }
        }
    }
    else
    {
        return 1;
    }
}

function xDataGetUrlAsyncContinous(item)
{
    var tDiv = document.createElement("div");
    if($(item).attr("xDataGetUrlAsync")!=null)
    {
        if($(item).data("xDataGetUrlUsedUp")==null)
        {
            return 0;
        }
        else
            $(tDiv).html(SweetHashTemplate[$(item).data("xDataGetUrlUsedUp")]);
        $.ajax({
            type:"get",
            url:$(item).attr("xDataGetUrlAsync"),
            success:function(data){
                xDataGetUrlAsyncForContinous(item,data,tDiv);
            }
        });
    }
    else
        return 1;
}

function xDataGetUrlAsyncForContinous(item,ori_json,tDiv)
{
    if($(item).attr("xDataGetUrlAsync")!=null)
    {
        var model = $(tDiv).children("[xControl=template]").get(0);
        if($(item).attr("xJsonParse")==true)
            ori_json = JSON.parse(ori_json);
        var data = new Array();
        $.each(ori_json,function(i,item){
            data.push(item);
        });
        var neighbor = $(item).children("[xControl=template]:last");
        for(var obj in data)
        {
            var t = model.cloneNode(true);
            for(var jo in data[obj])
            {
                if($(t).attr("xValue")==jo)
                {
                    $(t).data("value",data[obj][jo]);
                }
                if($(t).html=='{x:Binding '+jo+'}')
                {
                    $(t).html(data[obj][jo]);
                    break;
                }
                $.each($(t).find("*"),function(i,el){
                if($(el).html()=='{x:Binding '+jo+'}')
                {
                    $(el).html(data[obj][jo]);
                }
                    if($(el).attr("xValue")==jo)
                    {
                        $(el).data("value",data[obj][jo]);

                    }
                });
            }
            if(neighbor==true)
            {
                $(item).append(t);
            }
            else
            {
                $(neighbor).after(t);
                neighbor = t;
            }
        }
    }
}

function AjaxGet(url)
{
    var r = null;
    $.ajax({
        type:"get",
        url:url,
        async:false,
        success:function(data){
            r = data;
        }
    });
    return r;
}

function AjaxGetAsync(url,func=null,useArg=false)
{
    var r = null;
    $.ajax({
        type:"get",
        url:url,
        success:function(data){
            r = data;
            if(func!=null)
            {
                if(useArg==true)
                    func(data);
                else
                    func();
            }
        }
    });
    return r;
}

function sTreeView(e,bindingJson,treeViewItemSonClass="treeview-item-son",treeViewItemSonChooseClass="treeview-item-son-choose")
{
    var model = $(e).children("*").get(0);
    $(model).remove();
    sTreeViewInit(bindingJson,e);
    function sTreeViewInit(child,father,level=0)
    {
        $.each(child,function(i,item){
            var unit = model.cloneNode(true);
            var wrapper = document.createElement("div");
            $(unit).html(item.name);
            $(unit).attr("class",treeViewItemSonClass);
            $(unit).data("value",item.value);
            $(wrapper).append(unit);
            $(wrapper).attr("class","treeview-item");
            $(wrapper).css("padding-left",level*15+'px');
            if(item.children!=null)
                sTreeViewInit(item.children,wrapper,level+1);
            $(father).append(wrapper);

            $(unit).click(function(){
                if($(wrapper).data("isShowed")==null)
                {
                    $(wrapper).children("div").slideDown();
                    $(wrapper).data("isShowed",1);
                    $(unit).attr("class",treeViewItemSonChooseClass);
                }
                else
                {
                    $(wrapper).children("div").hide();
                    $(wrapper).removeData("isShowed");
                    $(unit).attr("class",treeViewItemSonClass);
                }
            });
            if(level!=0)
                $(wrapper).hide();
        });
    }
}

function Guid() {
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
     }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function Retop(e=null)
{
    if(e==null)
    {
        $("html,body").animate({
            scrollTop:"0px"
        },{duration: 500,easing: "swing"});
    }
    else
    {
        $(e).animate({
            scrollTop:"0px"
        },{duration: 500,easing: "swing"});
    }
}

function warning(e,c)
{
	var x=$(e).prop('class');
	var xc=$(e).text();
	var xcolor=$(e).css('color');
	$(e).attr('class',x+' warning-text');
	$(e).css('color','rgba(200,50,59,1)');
	$(e).html(c);
	setTimeout(function(){
		$(e).attr('class',x);
		$(e).css('color',xcolor);
		$(e).html(xc);
	},3000);
}

function barWarning(s=-1,c="警告信息")
{
    var timer = null;
    var icon = "&#xEB90;";
	var background_o = "rgba(173,38,45,0.8)";
	if(s==1)
		{
            background_o = "rgba(234,159,1,0.8)";
            icon = "&#xE783;";
		}
	else if(s==0)
		{
            background_o = "rgba(25,180,110,0.8)";
            icon = "&#xEC61;";
		}
	var x = document.createElement("div");
	$(x).append("<div style='position: fixed; left: 0; top: 0; width: 100%; height: 30px; background: "+background_o+"; text-align: center; display: none; justify-content:center; align-items:center; z-index:2002;'><span style='font-family: 微软雅黑; font-size:12px; color: rgba(242,242,242,0.8); display: flex; justify-content:center; align-items:center; z-index:999;'><span style='margin-top:3px; margin-right:5px; font-family:Segoe MDL2;'>"+icon+"</span> "+c+"</span></div>");
	$("body").append(x);
    $(x).find("div").slideDown();
    $(x).find("div").css("display","flex");
	timer = setInterval(function(){
		var stimer = null;
		$(x).find("div").fadeOut();
		stimer = setInterval(function(){
			$(x).empty();
			clearInterval(stimer);
		},1000);
		clearInterval(timer);
	},3000);
}

//s//-1-错误//0-成功//1-警告//2-默认//
//title//信息框标题//
//content//信息框内容//
//theme//信息框主题//light-亮色调//dark-暗色调//
function sInfoBox(s=2,content="",title="提示",theme="light")
{
    var themeColor = theme=="dark"?" dark":"";
    if($("#s_info_box").length<=0)
    {
        $(document.body).append('<div id="s_info_box" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; background: rgba(255,255,255,0.5); -webkit-backdrop-filter:blur(15px); display: flex; justify-content: center; align-items: center;"><div class="sinfo-box" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; z-index:2001;"><div class="title-bar"><i id="s_info_icon" style="color: rgba(255,255,255,1); text-align: center;">&#xE783;</i><span id="s_info_title" style="margin-left: 5px; font-family: 微软雅黑; font-size: 13px; color: rgba(255,255,255,1); text-align: center;">提示</span></div><span id="s_info_content" style="width: 100%; margin-top: 15px; font-family: 微软雅黑; font-size: 15px; text-indent: 5px; text-align: left;">Content</span><button class="sbutton black glass" style="width: 150px; margin: 15px;" onClick="$(\'#s_info_box\').fadeOut();">关闭</button></div></div>');
    }
	$("#s_info_box").css('display','flex');
    if(themeColor==" dark")
        $("#s_info_box").css("background","rgba(0,0,0,0.6)");
	if(s==1)
    {
        $($("#s_info_box").children("div").get(0)).attr("class","sinfo-box brown"+themeColor);
        $('#s_info_icon').html('&#xEC61;');
        $("#s_info_box").find("button").attr("class","sbutton brown glass");
    }
	else if(s==0)
    {
        $($("#s_info_box").children("div").get(0)).attr("class","sinfo-box green"+themeColor);
        $('#s_info_icon').html('&#xEC61;');
        $("#s_info_box").find("button").attr("class","sbutton green glass");
    }
	else if(s==-1)
    {
        $($("#s_info_box").children("div").get(0)).attr("class","sinfo-box red"+themeColor);
        $('#s_info_icon').html('&#xEB90;');
        $("#s_info_box").find("button").attr("class","sbutton red glass");
    }
    else if(s==2)
    {
        $($("#s_info_box").children("div").get(0)).attr("class","sinfo-box"+themeColor);
        $('#s_info_icon').html('&#xE946;');
        if(themeColor==" dark")
            $("#s_info_box").find("button").attr("class","sbutton dark");
    }
    $("#s_info_title").html(title);
	$("#s_info_content").html(content);
}

//content-信息框内容//
//f-执行确定操作函数//
//t1-确定按钮标题//
//t2-取消按钮标题//
//title-信息框标题//
//theme-主题//red//green//brown//red dark//green dark//brown dark//dark//
function sJudgeBox(content,f,t1='确认',t2='取消',title="信息",theme="")
{
    if($("#s_judge_box").length<=0)
    {
        $(document.body).append('<div id="s_judge_box" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; background: rgba(255,255,255,0.5); -webkit-backdrop-filter:blur(15px); display: flex; justify-content: center; align-items: center;"><div class="sinfo-box" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center; z-index:2001;"><div class="title-bar"><i id="s_judge_icon" style="color: rgba(255,255,255,1); text-align: center;">&#xE783;</i><span id="s_judge_title" style="margin-left: 5px; font-family: 微软雅黑; font-size: 13px; color: rgba(255,255,255,1); text-align: center;">提示</span></div><span id="s_judge_content" style="width: 100%; margin-top: 15px; font-family: 微软雅黑; font-size: 15px; text-indent: 5px; text-align: left;">Content</span><div style="width: 100%; margin-top: 15px; padding: 5px; box-sizing: border-box; display: flex; justify-content: space-between;"><button id="s_judge_confirm" class="sbutton blue" style="width: 100%; margin-right: 2.5px;">确认</button><button id="s_judge_cancel" class="sbutton black" style="width: 100%; margin-left: 2.5px;">取消</button></div></div></div>');
    }
    if(theme.indexOf("dark")>=0)
        $("#s_judge_box").css("background","rgba(0,0,0,0.6)");
	$("#s_judge_box").css('display','flex');
    $($("#s_judge_box").children("div").get(0)).attr("class","sinfo-box "+theme);
    $($("#s_judge_box").find("button").get(0)).attr("class","sbutton "+theme.split(' ')[0]);
	$("#s_judge_confirm").html(t1);
	$("#s_judge_cancel").html(t2);
    $("#s_judge_title").html(title);
	$("#s_judge_content").html(content);
		
	$("#s_judge_confirm").unbind();
	$("#s_judge_confirm").click(function(){
		f();
		$('#s_judge_box').fadeOut();
	});
	$("#s_judge_cancel").click(function(){
		$('#s_judge_box').fadeOut();
	});
}

//多扳机触发器//
function sTrigger(func=null,attach,sum=2)
{
    $(attach).click(function(){
        if($(attach).data("sTrigger_status_el")==null)
            $(attach).data("sTrigger_status_el",1);
        else
        {
            if($(attach).data("sTrigger_status_el")<sum-1)
                $(attach).data("sTrigger_status_el",$(attach).data("sTrigger_status_el")+1);
            else
                $(attach).data("sTrigger_status_el",0);
        }
        func($(attach).data("sTrigger_status_el"));
    });
    var r = $(attach).data("sTrigger_status_el");
    r == null?0:r;
    return r;
}

var sMousePosition = {x:0,y:0};
var sMousePositionWithOutScroller = {x:0,y:0};
$(document).mousemove(function(e){sMousePosition.x=e.pageX;sMousePosition.y=e.pageY;
                                sMousePositionWithOutScroller.x=e.originalEvent.x;
                                sMousePositionWithOutScroller.y=e.originalEvent.y;});
function GetMousePosition()
{
    return sMousePosition;
}

function GetMousePositionVisual()
{
    return sMousePositionWithOutScroller;
}