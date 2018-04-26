
/* LES IMAGES SUPPLEMENTAIRES ==> PHOTO */
$(document).ready(function(){
	try{
		var divPHOTO_idx=1;
		var cachePHOTO=[];
		$("#paginPHOTO_prev").addClass("defilementG_PHOTO_off");
		$("#paginPHOTO_next").removeClass("defilementD_PHOTO_off");
		$.scrollTo.defaults.axis='xy';
		$('#divPHOTO').scrollTo(0);
		$.scrollTo(0);
		var $scrollingPHOTO=$('#divPHOTO');
		
		$("#paginPHOTO_prev").click(function(){
			this.blur();
			if(divPHOTO_idx<=2){
				$(".defilementG_PHOTO").css('z-index','0');
				$("#paginPHOTO_next").removeClass("defilementD_PHOTO_off");
				$("#paginPHOTO_prev").addClass("defilementG_PHOTO_off");
			}else{
				$("#paginPHOTO_next").removeClass("defilementD_PHOTO_off");
			}
			if(divPHOTO_idx<=$("#divPHOTO .photobit").size()-3){
				$("#paginPHOTO_next").removeClass("defilementD_PHOTO_off");
				$(".defilementD_PHOTO").css('z-index','10');
			}
			if(divPHOTO_idx<=1){
				$(".defilementD_PHOTO").css('z-index','10');
				$(".defilementG_PHOTO").css('z-index','0');
				return false;
			}
			$scrollingPHOTO.stop().scrollTo($('#PHOTOproduit'+(--divPHOTO_idx)),200);
			return false;
		});
		$("#paginPHOTO_next").click(function(){
			this.blur();
			if(divPHOTO_idx>=1){
				$(".defilementD_PHOTO").css('z-index','0');
				$("#paginPHOTO_prev").removeClass("defilementG_PHOTO_off");
			}
			if(divPHOTO_idx>=$("#divPHOTO .photobit").size()-2){
				$("#paginPHOTO_next").addClass("defilementD_PHOTO_off");
				$(".defilementG_PHOTO").css('z-index','10');
			}
			else{
				$("#paginPHOTO_next").removeClass("defilementD_PHOTO_off");
			}
			if(divPHOTO_idx>($("#divPHOTO .photobit").size()-2)){
				$(".defilementG_PHOTO").css('z-index','10');
				$(".defilementD_PHOTO").css('z-index','0');
				return false;
			}
			$scrollingPHOTO.stop().scrollTo($('#PHOTOproduit'+(++divPHOTO_idx)),200);
			return false;
		});
		
	}
	catch(e){}
});

/* LES COUPS DE COEUR ==> CDC */
$(document).ready(function(){
	try{
		var divCDC_idx=1;
		var cacheCDC=[];
		$("#paginCDC_prev").addClass("defilementG_CDC_off");
		$("#paginCDC_next").removeClass("defilementD_CDC_off");
		$.scrollTo.defaults.axis='x';
		$('#divCDC').scrollTo(0);
		$.scrollTo(0);
		var $scrollingCDC=$('#divCDC');
		$("#paginCDC_prev").click(function(){
			this.blur();
			if(divCDC_idx<=2){
				$("#paginCDC_next").removeClass("defilementD_CDC_off");
				$("#paginCDC_prev").addClass("defilementG_CDC_off");
			}else
				$("#paginCDC_next").removeClass("defilementD_CDC_off");
			if(divCDC_idx<=$("#divCDC .toparticle").size()-4)
				$("#paginCDC_next").removeClass("defilementD_CDC_off");
			if(divCDC_idx<=1)
				return false;
			$scrollingCDC.stop().scrollTo($('#CDCproduit'+(--divCDC_idx)),200);
			return false;
		});
		$("#paginCDC_next").click(function(){
			this.blur();
			if(divCDC_idx>=1)
				$("#paginCDC_prev").removeClass("defilementG_CDC_off");
			if(divCDC_idx>=$("#divCDC .toparticle").size()-3)
				$("#paginCDC_next").addClass("defilementD_CDC_off");
			else
				$("#paginCDC_next").removeClass("defilementD_CDC_off");
			if(divCDC_idx>($("#divCDC .toparticle").size()-3))
				return false;
			$scrollingCDC.stop().scrollTo($('#CDCproduit'+(++divCDC_idx)),200);
			return false;
		});
	}
	catch(e){}
});

/* LES PROMOTIONS ==> PR */
$(document).ready(function(){
	try{
		var divPR_idx=1;
		var cachePR=[];
		$("#paginPR_prev").addClass("defilementG_PR_off");
		$("#paginPR_next").removeClass("defilementD_PR_off");
		$.scrollTo.defaults.axis='x';
		$('#divPR').scrollTo(0);
		$.scrollTo(0);
		var $scrollingPR=$('#divPR');
		$("#paginPR_prev").click(function(){
			this.blur();
			if(divPR_idx<=2){
				$("#paginPR_next").removeClass("defilementD_PR_off");
				$("#paginPR_prev").addClass("defilementG_PR_off");
			}else
				$("#paginPR_next").removeClass("defilementD_PR_off");
			if(divPR_idx<=$("#divPR .toparticle").size()-4)
				$("#paginPR_next").removeClass("defilementD_PR_off");
			if(divPR_idx<=1)
				return false;
			$scrollingPR.stop().scrollTo($('#PRproduit'+(--divPR_idx)),200);
			return false;
		});
		$("#paginPR_next").click(function(){
			this.blur();
			if(divPR_idx>=1)
				$("#paginPR_prev").removeClass("defilementG_PR_off");
			if(divPR_idx>=$("#divPR .toparticle").size()-3)
				$("#paginPR_next").addClass("defilementD_PR_off");
			else
				$("#paginPR_next").removeClass("defilementD_PR_off");
			if(divPR_idx>($("#divPR .toparticle").size()-3))
				return false;
			$scrollingPR.stop().scrollTo($('#PRproduit'+(++divPR_idx)),200);
			return false;
		});
	}
	catch(e){}
});

/* LES TOPS VENTES ==> VE */
$(document).ready(function(){
	try{
		var divVE_idx=1;
		var cacheVE=[];
		$("#paginVE_prev").addClass("defilementG_VE_off");
		$("#paginVE_next").removeClass("defilementD_VE_off");
		$.scrollTo.defaults.axis='x';
		$('#divVE').scrollTo(0);
		$.scrollTo(0);
		var $scrollingVE=$('#divVE');
		$("#paginVE_prev").click(function(){
			this.blur();
			if(divVE_idx<=2){
				$("#paginVE_next").removeClass("defilementD_VE_off");
				$("#paginVE_prev").addClass("defilementG_VE_off");
			}else
				$("#paginVE_next").removeClass("defilementD_VE_off");
			if(divVE_idx<=$("#divVE .toparticle").size()-4)
				$("#paginVE_next").removeClass("defilementD_VE_off");
			if(divVE_idx<=1)
				return false;
			$scrollingVE.stop().scrollTo($('#VEproduit'+(--divVE_idx)),200);
			return false;
		});
		$("#paginVE_next").click(function(){
			this.blur();
			if(divVE_idx>=1)
				$("#paginVE_prev").removeClass("defilementG_VE_off");
			if(divVE_idx>=$("#divVE .toparticle").size()-3)
				$("#paginVE_next").addClass("defilementD_VE_off");
			else
				$("#paginVE_next").removeClass("defilementD_VE_off");
			if(divVE_idx>($("#divVE .toparticle").size()-3))
				return false;
			$scrollingVE.stop().scrollTo($('#VEproduit'+(++divVE_idx)),200);
			return false;
		});
	}
	catch(e){}
});

/* LES NOUVEAUTES ==> NOUV */
$(document).ready(function(){
	try{
		var divNOUV_idx=1;
		var cacheNOUV=[];
		$("#paginNOUV_prev").addClass("defilementG_NOUV_off");
		$("#paginNOUV_next").removeClass("defilementD_NOUV_off");
		$.scrollTo.defaults.axis='x';
		$('#divNOUV').scrollTo(0);
		$.scrollTo(0);
		var $scrollingNOUV=$('#divNOUV');
		$("#paginNOUV_prev").click(function(){
			this.blur();
			if(divNOUV_idx<=2){
				$("#paginNOUV_next").removeClass("defilementD_NOUV_off");
				$("#paginNOUV_prev").addClass("defilementG_NOUV_off");
			}else
				$("#paginNOUV_next").removeClass("defilementD_NOUV_off");
			if(divNOUV_idx<=$("#divNOUV .toparticle").size()-4)
				$("#paginNOUV_next").removeClass("defilementD_NOUV_off");
			if(divNOUV_idx<=1)
				return false;
			$scrollingNOUV.stop().scrollTo($('#NOUVproduit'+(--divNOUV_idx)),200);
			return false;
		});
		$("#paginNOUV_next").click(function(){
			this.blur();
			if(divNOUV_idx>=1)
				$("#paginNOUV_prev").removeClass("defilementG_NOUV_off");
			if(divNOUV_idx>=$("#divNOUV .toparticle").size()-3)
				$("#paginNOUV_next").addClass("defilementD_NOUV_off");
			else
				$("#paginNOUV_next").removeClass("defilementD_NOUV_off");
			if(divNOUV_idx>($("#divNOUV .toparticle").size()-3))
				return false;
			$scrollingNOUV.stop().scrollTo($('#NOUVproduit'+(++divNOUV_idx)),200);
			return false;
		});
	}
	catch(e){}
});

/* LES MARQUES ==> MQ */
$(document).ready(function(){
	try{
		var divMQ_idx=1;
		var cacheMQ=[];
		$("#paginMQ_prev").addClass("defilementG_MQ_off");
		$("#paginMQ_next").removeClass("defilementD_MQ_off");
		$.scrollTo.defaults.axis='x';
		$('#divMQ').scrollTo(0);
		$.scrollTo(0);
		var $scrollingMQ=$('#divMQ');
		$("#paginMQ_prev").click(function(){
			this.blur();
			if(divMQ_idx<=2){
				$("#paginMQ_next").removeClass("defilementD_MQ_off");
				$("#paginMQ_prev").addClass("defilementG_MQ_off");
			}else
				$("#paginMQ_next").removeClass("defilementD_MQ_off");
			if(divMQ_idx<=$("#divMQ .topmarque").size()-4)
				$("#paginMQ_next").removeClass("defilementD_MQ_off");
			if(divMQ_idx<=1)
				return false;
			$scrollingMQ.stop().scrollTo($('#MQproduit'+(--divMQ_idx)),200);
			return false;
		});
		$("#paginMQ_next").click(function(){
			this.blur();
			if(divMQ_idx>=1)
				$("#paginMQ_prev").removeClass("defilementG_MQ_off");
			if(divMQ_idx>=$("#divMQ .topmarque").size()-3)
				$("#paginMQ_next").addClass("defilementD_MQ_off");
			else
				$("#paginMQ_next").removeClass("defilementD_MQ_off");
			if(divMQ_idx>($("#divMQ .topmarque").size()-3))
				return false;
			$scrollingMQ.stop().scrollTo($('#MQproduit'+(++divMQ_idx)),200);
			return false;
		});
	}
	catch(e){}
});



