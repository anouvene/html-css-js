$(document).ready(function() {
   var carouselAmbiance = $(".carrousel");
   $('.masque_carrousel').css('width','619px');
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
				$('.masque_carrousel').css('width','609px');
				var myId = item.attr("lang");
				var myId_split = myId.split('_');
				var myLink = $('.btn_'+myId_split[1]);
				myLink.toggleClass('btn_'+myId_split[1]+'_over');
			},
			afterEnd: function(item) {
				$('.masque_carrousel').css('width','619px');
				var myId = item.attr("lang");
				var myId_split = myId.split('_');
				var myLink = $('.btn_'+myId_split[1]);
				myLink.toggleClass('btn_'+myId_split[1]+'_over');
			}
		});
   }  
});