$(document).ready(function() {
   var carouselAmbiance = $(".carrousel");
   if(carouselAmbiance) {
	   carouselAmbiance.jCarouselLite({
			visible: 1,
			auto:8000,
			speed:2000,
			//0 signifie qu'on démare au premier
			start:0,
			//nb de bouton avec des numéro
			nbBoutonsCarousel:5,
			btnGo:
			[".btn .btn_1",
			 ".btn .btn_2",
			 ".btn .btn_3",
			 ".btn .btn_4",
			 ".btn .btn_5"
			],
			
			//btnPrev: ".btn_prev",
			//btnNext: ".btn_next",
			beforeStart: function(item) {
				var myId = item.attr("id");
				var myLink = $('.btn .btn_'+myId);
				myLink.toggleClass('btn_'+myId+'_over');
			},
			afterEnd: function(item) {
				var myId = item.attr("id");
				var myLink = $('.btn .btn_'+myId);
				myLink.toggleClass('btn_'+myId+'_over');
			}
		});
		
		/*carouselAmbiance.css('left','5px');
		if($.browser.msie && $.browser.version == '7.0'){
			carouselAmbiance.css({'left':'1px','top':'3px'});
		}else{
			if($.browser.msie && $.browser.version == '8.0'){
				carouselAmbiance.css({'left':'6px','top':'2px'});
			}
		}*/
   }  
});