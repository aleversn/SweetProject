// JavaScript Document
$(document).ready(function(){
	$.each($("[xControl~=checkBox]"),function(i,item){
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
        $(item).attr("class","sinput search");
		$(item).wrap('<div class="sinput search" style="width:'+($(item).width()/1.0+80)+'px; height:'+($(item).height()/1.0+10)+'px;"></div>');
		$(item).after('<p class="search-icon">'+xIcon("Search")+'</p>');
	});
    $.each($("[xControl=comboBox]"),function(i,item){
        $(item).attr("class","combobox-item-container");
        $(item).wrap('<div class="combobox" style="width:'+$(item).width()+'px;"></div>');
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
    $.each($("[xControl=flipView]"),function(i,item){
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
                cur=2;
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
    });
    $.each($("[xControl=scrollSticky]"),function(i,item){
        var top = $(item).offset().top;
        var offset = $(item).attr("xOffset")==null?0:$(item).attr("xOffset");
        var child = item.cloneNode(true);
        var width = $(item).width();
        var left = $(item).offset().left;
        var bk = $(item).attr("style");
        $(child).removeAttr("id");
        $(child).removeAttr("xControl");
        $(child).css("visibility","hidden");
        $.each($(child).find("*"),function(i,item){$(item).removeAttr("id");});
        $(item).before(child);
        $(child).fadeOut(10);
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
    });
    $.each($("[xControl=treeView]"),function(i,item){
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
    });
    $.each($("[xControl=linkView]"),function(i,item){
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
});

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
    Sweetbridge.push({obj:obj,name:name});
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
        if(SweetHashTemplate[item]==undefined)
            SweetHashTemplate[item]=$(item).html();
        else
            $(item).html(SweetHashTemplate[item]);
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

function AjaxGetAsync(url)
{
    var r = null;
    $.ajax({
        type:"get",
        url:url,
        success:function(data){
            r = data;
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