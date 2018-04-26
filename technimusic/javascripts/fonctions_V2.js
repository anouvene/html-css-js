//Pour tablette
var ua   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

//------------------ Détecteur de navigateurs et leurs versions

	var BrowserDetect = 
	{
		init: function () 
		{
			this.browser = this.searchString(this.dataBrowser) || "Other";
			this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
		},
	
		searchString: function (data) 
		{
			for (var i=0 ; i < data.length ; i++)   
			{
				var dataString = data[i].string;
				this.versionSearchString = data[i].subString;
	
				if (dataString.indexOf(data[i].subString) != -1)
				{
					return data[i].identity;
				}
			}
		},
	
		searchVersion: function (dataString) 
		{
			var index = dataString.indexOf(this.versionSearchString);
			if (index == -1) return;
			return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
		},
	
		dataBrowser: 
		[
			{ string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
			{ string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
			{ string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
			{ string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
			{ string: navigator.userAgent, subString: "Opera",   identity: "Opera" },
		]
	
	};
	BrowserDetect.init();
	
	var chrome = false ,
		msie = false , 
		firefox = false , 
		safari = false , 
		opera = false;
		
	var msie6 = false ,
		msie7 = false ,
		msie8 = false ,
		msie9 = false ,
		msie10 = false;
		
	var chrome_version = BrowserDetect.version,
		msie_version = BrowserDetect.version,
		firefox_version = BrowserDetect.version,
		safari_version = BrowserDetect.version,
		opera_version = BrowserDetect.version; 
	
	/*Type de navigateur*/
	switch(BrowserDetect.browser){
		case 'Chrome' :
			chrome = true;
			break;
		case 'Explorer' :
			msie = true;
			break;
		case 'Firefox' :
			firefox = true; 
			break;
		case 'Safari' :
			safari = true; 
		break;
		case 'Opera' : 
			opera = true;
		break;
		default :
			break;
	}


	if (msie) {
		switch(msie_version){
			case 6 :
				 $(function(){ $('body').addClass('ie6'); });
				msie6 = true;
				break;
			case 7 :
				$(function(){ $('body').addClass('ie7'); });
				msie7 = true;
				
				break;
			case 8 :
				$(function(){  $('body').addClass('ie8'); });
				msie8 = true; 
				break;
			case 9 :
				$(function(){ $('body').addClass('ie9'); });
				msie9 = true;
			break;
			case 10 : 
				$(function(){ $('body').addClass('ie10'); });
				msie10 = true;
			break;
			default :
				break;
		}
	}

$(document).ready(function(){
/*Texte shadow*/
	// Textes en relief pour IE7 et 8 (modernizr.custom.js détecte si le navigateur supporte ou non html5 et css3 
	//  et sinon yepnope.js chargera "textshadow.js"
	if (!Modernizr.textshadow && msie) {
		Modernizr.load(
			{
				test: Modernizr.textshadow,//booleen
				nope : 'javascripts/jquery.textshadow.js',//charger le script si test est false
				complete: function () {//traitements divers
					$('.ei-title h2, .ei-title h3, .devenirfan a, .facebook_twitter span').textshadow({ useStyle: true });
					if(msie7&&msie8){
						$('.ei-title').css({'left':'0','top':'0'});
						$('.ei-title h2 .ui-text-shadow-copy').css({'left':'-2px','top':'-2px'});
						$('.ei-title h3 .ui-text-shadow-copy').css({'left':'-3px','top':'-3px'});
						$('.devenirfan a .ui-text-shadow-copy').css({'left':'-2px','top':'5px'});
						$('.facebook_twitter span .ui-text-shadow-copy').css({'left':'-2px','top':'20px'});
					}
				}
			}
		);
	}
	
	if(msie7){
		/*Modernizr.load([
			{
				test: Modernizr.mq('only all'),//"only all" signifie comprends tu les media queries ?
				nope : 'javascripts/respond.min.js'//pour gerer min/max-width sous IE7, 8
			}
		]);*/
		
		/*
		yepnope({
				  test :  Modernizr.mq('only all'),//"only all" signifie comprends tu les media queries ?
				  //yep  : 'normal.js',
				  nope : ['javascripts/respond.min.js']//pour gerer min/max-width sous IE7, 8
				});
		*/
	}
});










//------------------ DEBUT PLUGGIN POUR LES ONGLETS
// initialise plugins
$(document).ready(function(){
	$('.menu_niv0').superfish({
		delay: 150,
		animation: {opacity: 'show', height: 'show' },
		onBeforeShow: function(){//pas de bordure au dernier li niveau2
			$(this).parent('.menubit_niv0').prev().css('background','none');
			$('.ssmenu_niv1').show();
		},
		onHide: function(){
			$(this).parent('.menubit_niv0').prev().removeAttr('style');
		}
	});
	
	//Pour tablette
	/*if(ua){
		$('').bind("touchstart",function() {			
			//fermer menu
			$('').hideSuperfishUl();
		});
	}*/
	
});
//------------------ FIN PLUGGIN POUR LES ONGLETS

//LES UTILITAIRES POUR L'ENSEMBLE DES PAGES
(function($){
	$.fn.inclureUtilitaires = function(){
		if($('.wrapper').length==0){
			//$('#contenupage').css({'width':'980px','height':'auto'});
		}else{//page accueil
			//$('#contenupage').css({'width':'100%','height':'480px'});
		}
		//select style
		$('select').uniform();
		
		//Les articles du menu deroulant
		if($('.menuArticleBit').length>0){
			$('.menuArticleBit:last').css('background','none');
		}
	}
})(jQuery);
$(document).ready(function(){
	$('#skin').inclureUtilitaires();
});

////////PAGE ACCUEIL////////////////
(function($){
	$.fn.indexUtilities = function(){
		//Articles carrousel
		$('.slider_content').each(function(){
			if($(this).find('.carrouselArticleBit').length>0){
				var i = 0;
				$(this).find('.carrouselArticleBit').each(function(){
					++i;
					if(i==4){ i=1; }
					$(this).addClass('carrouselArticleBit_'+i);
				});
			}
		});
		
		//Video
		$('#ei-slider').eislideshow({
			animation			: 'center',
			autoplay			: true,
			pause				:true,
			slideshow_interval	: 3000,
			titlesFactor		: 0
		});
		
		//Les articles ventes flash
		if($("#nbart_flash").val()<4){
			$(".flash_prev, .flash_next").find("a").attr("href","javascript:;");
			$(".flash_prev, .flash_next").find("a").bind({
				mouseenter: function() {
					$(this).css("background-position","0 0");
				},
				mouseleave: function() {
					$(this).removeAttr("style");
				}
			});
		}else{
			var carouselFlash = $(".flash_carrousel");
			if(carouselFlash){
				carouselFlash.jCarouselLite({
					btnPrev: ".flash_prev",
					btnNext: ".flash_next",
					auto:false,
					visible: 4,
					speed:2000,
					mouseWheel: true,
					scroll: 1
				});
			}
		}
		
		/*Promotions*/
		
		if($("#nbart_artpromo").val()<6){
			$(".promo_prev, .promo_next").hide();
			$('.promo_entete').css('margin-bottom','13px');
		}else{
			var carouselPromo = $(".promo_carrousel");
			if(carouselPromo){
				carouselPromo.jCarouselLite({
					btnNext: ".promo_prev",
					btnPrev: ".promo_next",
					vertical:true,
					auto:false,
					visible: 5,
					speed:2000,
					scroll: 1,
					beforeStart : function(item) {
						if(msie7){
							$('.promo_carrousel').find('ul').removeAttr('style').css({'position':'relative', 'list-style':'none',  'z-index':'1', ' height':'1632px', 'top':'-555px'});//Bug positionnement ul sous IE7
						}
					},
					afterEnd : function(item) {
						if(msie7){
							$('.promo_carrousel').find('ul').removeAttr('style').css({'position':'relative', 'list-style':'none',  'z-index':'1', ' height':'1632px', 'top':'-555px'});//Bug positionnement ul sous IE7
						}
					}
				});
			}
			if(msie7){ //Bug positionnement ul sous IE7
				$(function(){ $('.promo_carrousel').find('ul').removeAttr('style').css({'position':'relative', 'list-style':'none',  'z-index':'1', ' height':'1632px', 'top':'-555px'}); });
			}
		}
	}
})(jQuery);

//Récupérer la valeur d'un parametre dans une url (methode Get) avec Jquery
function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

///////////PAGE CATEG///////////////////////////
(function($){
	$.fn.categUtilities = function(){
		if($('.categ_ima').find('img[src*="spacer.gif"]').length>0){
			$('.description_rayons').css({'min-height':'115px'});	
			$('.categ_masque').hide();
			$('.categ_ima').css({'height':'auto'});
		}else{
			$('.categ_desc').css('min-height',$('.categ_masque').outerHeight());
		}
		
		//gestion du float des articles
		if($('.articles').find('.articleBit').length>0){
			var a = 0;
		 	$('.articles').find('.articleBit').each(function(){
				++a;
				if(a==4){ a=1; }
				$(this).addClass('articleBit_'+a);
				//affiche description
				if($.trim($(this).find('.articleBit_desc').html())!=''){
					$(this).hoverIntent(function(){
						$(this).find('.articleBit_desc').stop().fadeIn(100).css('z-index','10');
						
					}, function() {
					  $(this).find('.articleBit_desc').stop().fadeOut(100).css('z-index','0');
					});
				}
			});
		}
	}
})(jQuery);

///////////PAGE ARTICLE///////////
(function($){
	$.fn.articleUtilities = function(){
		//gestion du float des images supplementaires
		/*if($('.photoBit').length>1){
			var p = 0;
		 	$('.photoBit').each(function(){
				++p;
				if(p==5){ p=1; }
				$(this).addClass('photoBit_'+p);
			});
		}*/
		
		//limiter la description à 1 paragraphe
		//$('.produit_desc').find('p:gt(0)').hide();
		
		//Les caracts
		/*if($('.lst_caracts').length>0){
			$('.lst_caracts').each(function(){
				//styler le select des caracteristiques
				$(this).find('a.caractval_lien, a.caractval_lien_epuise').wrap('<li />');
				$(this).find('li').appendTo($(this).find('.lst_caractsContent'));
				
				//derouler le select des caracteristiques
				$(this).superfish({
					onInit:function(){
						$(this).wrapInner('<ul><li></li></ul>');
					},						
					delay: 150,
					speed: 'fast',
					onShow: function(){//$(this)-->$('lst_caractsContent')
						$(this).parents('.lst_caracts').css('z-index','10');
					},
					onHide: function(){//$(this)-->$('lst_caractsContent')
						$(this).parents('.lst_caracts').css('z-index','0');
					}
				});
			});
		}*/
		
		//float des articles conseilles
		if($('.articlesConseil').length>0){
			var c = 0;
		 	$('.articlesConseil').find('.articleBit').each(function(){
				++c;
				if(c==5){ c=1; }
				$(this).addClass('articleBit_'+c);
			});
		}
		
		/*--------CLASSEUR DOSSIERS PAGE ARTICLE--------------*/
		(function($){
			
			$.fn.voirDesc=function(){
				// On met à off tous les onglets
				$('.desc, .tech, .avis').removeClass('on');
				// Dossier actif
				$('.desc').addClass('on');
				$('#description').css('display','block');
								// On display:none le contenu de chaque dossier
				$('#technique, #avis').css('display','none');

			}
		})(jQuery);
		
		(function($){
			$.fn.voirTech=function(){
				// On met à off tous les onglets
				$('.desc, .tech, .avis').removeClass('on');
				// On display:none le contenu de chaque dossier
				$('#description, #avis').css('display','none');
				// Dossier actif
				$('.tech').addClass('on');
				$('#technique').css('display','block');
			}
		})(jQuery);
		
		(function($){
			$.fn.voirAvis=function(){
				// On met à off tous les onglets dossier
				$('.desc, .tech, .avis').removeClass('on');
				// On display:none le contenu de chaque dossier
				$('#description, #technique').css('display','none');
				// Dossier actif
				$('.avis').addClass('on');
				$('#avis').css('display','block');
			}
		})(jQuery);
	}
})(jQuery);

////////PAGES CLIENT////////////////
(function($){
	$.fn.clientUtilities = function(){
		//bannieres instit du footer
		$(".newsletter, .showroom, .livraisonexpress").hide();
		//Gestion du bloc logging
		if($.trim($(".templates_logging").html())==""){
			$("#logging").hide();
		}else{
			$(".inscrit,.inscription,.recoverpass").css({"float":"none","width":"80%","margin":"0 auto 20px auto"});
		}
	}
})(jQuery);

////////PLAN DU SITE DISPOSE SUR PLUSIEURS LIGNES/COLONNES/////////////
(function($){
	$.fn.planUtilities = function(){
		if($('.menuplanBit_boutique').length>0){
			var m = 0;
			$(".menuplanBit_boutique").children('div').not('.titre_planboutique, .clear').each(function(){
				var styleEncours = $(this).attr('style');
				//alert(styleEncours);
				if(styleEncours=='margin-left:0px;' || styleEncours=='margin-left: 0px' || styleEncours=='margin-left: 0px;'){//niv1
					++m;
					if(m==4) m=1;
					$(this).addClass('rayonBit_niv1 rayonBit'+m).removeAttr('style');	
				}else{
					if(styleEncours=='margin-left:10px;' || styleEncours=='margin-left: 10px' || styleEncours=='margin-left: 10px;'){//niv2
						$(this).addClass('rayonBit_niv2').appendTo($(this).prev());	
					}else{
						if(styleEncours=='margin-left:20px;' || styleEncours=='margin-left: 20px' || styleEncours=='margin-left: 20px;'){//niv3
							$(this).addClass('rayonBit_niv3').appendTo($(this).prev());	
						}else{
							if(styleEncours=='margin-left:30px;' || styleEncours=='margin-left: 30px' || styleEncours=='margin-left: 30px;'){//niv4
								$(this).addClass('rayonBit_niv4').appendTo($(this).prev());	
							}
						}
					}
				}
			});
			var $clear= $("<div class='clear'></div>");
			$clear.insertAfter(".rayonBit3");
			//css
			$('.rayonBit_niv1').children('a').wrapInner('<strong class="vert"></strong>')
		}
	}
})(jQuery);

////////PAGE ESPACE PARTENAIRES/////////////
(function($){
	$.fn.partenairesUtilities = function(){		
		//Gestion du float des blocs partenaires
		var nb_liens = $(".lienBit").length;
		if(nb_liens>1){
			var i=0;
			$(".lienBit").each(function(){
				++i;
				if(i==3) i=1;
				$(this).addClass("lienBit"+i);
				$(".lienBit1").appendTo(".liens_g");
				$(".lienBit2").appendTo(".liens_d");
			});
		}
	}
})(jQuery);

