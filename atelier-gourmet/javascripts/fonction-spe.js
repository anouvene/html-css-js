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
			[".btn_1",
			 ".btn_2",
			 ".btn_3",
			 ".btn_4",
			 ".btn_5"
			],
			
			btnPrev: ".btn_prev",
			btnNext: ".btn_next",
			beforeStart: function(item) {
				var myId = item.attr("id");
				var myLink = $('.btn_'+myId);
				myLink.toggleClass('btn_'+myId+'_over');
			},
			afterEnd: function(item) {
				var myId = item.attr("id");
				var myLink = $('.btn_'+myId);
				myLink.toggleClass('btn_'+myId+'_over');
			}
		});
		
		/*
		if($.browser.msie && $.browser.version == '7.0'){
		}else{
			if($.browser.msie && $.browser.version == '8.0'){
			}
		}*/
   }  
});