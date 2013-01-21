(function($){
//定义外部接口
$.fn.JPictureRotary = function(options){

//初始化全局变量
var defaults = {
	auto : true, //是否自动轮转
	delay: 3,	//每张图片停留时间
	animationSpeed: "normal", //动画切换速度
	statue_contrls: true, //是否显示园点
	boucles: 0

};

/*
拓展变量
*/
var options = $.extend(defaults, options);

/*
遍历对象节点下的所有元素
*/
this.each(function(){
	
	if($("li", diapo).length > 1){
		/*
	将其包裹在一个div下
	*/
	var diapo = $(this);
	var width = 0;
	var height = 0;
	var current_slide = 0;

	diapo.wrap("<div class='JPictureRotary'></div>");


	/*
	划屏浏览图片
	*/
	diapo.parent().live("swipeleft", function(options)
	{
		prev();
	});

	diapo.parent().live("swiperight", function(options)
	{
		next();
	});



	diapo.parent().bind("click", function(options){
		alert("click!");
	});

	function init(){
		width = $("li:first-child img", diapo).width();
		height = $("li:first-child img", diapo).height();

		diapo.width(width);
		diapo.height(height);
		diapo.parent().width(width);
		diapo.parent().height(height);
		//显示圆角
		diapo.siblings(".JPictureRotary_status").show();
		$("#JPictureRotary_bullet_"+(parseInt($("li", diapo).index($("li:first-child", diapo)))+1), diapo.siblings()).addClass("active");
	}

	/*
	 图片轮转动画
	 */
	 var inter = "";

	 inter = setInterval(function(){displayDiaporama(options)}, (options.delay*1000));

	 $("li", diapo).hide();
	 $("li:first-child", diapo).addClass("active").fadeIn(options.animationSpeed, init);

/*
添加圆角
*/
diapo.after("<div class='JPictureRotary_status'></div>");

$("li", diapo).each(function(){
	i = parseInt($("li", diapo).index($(this))+1);
	$(this).attr("id", "JPictureRotary_image_"+i);
	$(".JPictureRotary_status", diapo.parent()).append("<a id='JPictureRotary_bullet_"+i+"' href='#'>Image "+i+"</a>");
})

$(".JPictureRotary_status", diapo.parent()).css("margin-left", -($(".JPictureRotary_status", diapo.parent()).width()/2));

// $(".JPictureRotary_status a", diapo.parent()).click(function(){
// 	if($("li.active", diapo).attr("id").split("_")[2] != $(this).attr("id").split("_")[2])
// 		nextImage(options, $(this));
// 	return false;
// })

// function randomImage()
// {
// 	rand = Math.floor(Math.random() * nb_slides)+1;
// 	id = $("li.active", diapo).attr("id").split("_")[2];

// 	while(rand == id)
// 	{
// 		rand = Math.floor(Math.random() * nb_slides)+1;
// 	}

// 	nextImage(options, $("li#JPictureRotary_image_"+rand, diapo));
// }

function nextImage(options, elt)
{
	clearInterval(inter);

	$("li.active", diapo).fadeOut(options.animationSpeed).removeClass("active");
	$(".JPictureRotary_status a", diapo.parent()).removeClass("active");

	id = elt.attr("id").split("_")[2];
	$("li#JPictureRotary_image_"+id, diapo).addClass("active").fadeIn(options.animationSpeed);

	$("#JPictureRotary_bullet_"+id, diapo.siblings()).addClass("active");
	
	if(options.boucles == 0 || (options.boucles > 0 && (diapo.data("current_slide")/diapo.children().length) < options.boucles ))
		inter = setInterval(function(){displayDiaporama(options)}, (options.delay*1000));
	else
		$(".pause", diapo.siblings()).remove();

}

function displayDiaporama(options)
{
	current_slide++;
	diapo.data("current_slide", current_slide);
	next();
}

function next()
{


	if(!$("li.active", diapo).is(":last-child"))
		elt =  $("li.active", diapo).next();
	else
		elt =  $("li:first-child", diapo);

	nextImage(options, elt);
}

function prev()
{
	if(!$("li.active", diapo).is(":first-child"))
		elt =  $("li.active", diapo).prev();
	else
		elt =  $("li:last-child", diapo);
	nextImage(options, elt);
}

}
});
return this;

};
})(jQuery);