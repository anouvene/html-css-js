/*DEBUT PLUGGIN POUR LES ONGLETS ************************************/
(function($) {
	$.fn.deroulerMenu = function(temps_encours, onglet_encours, menu_encours) {
		// Le timer qui sera réinitialiser si l'on revient sur le menu
		var timer = 0;
		var timer_default = 0;
		var defaults = {
			timer_default : 100
		};
		var timer_option = $.extend(defaults, temps_encours);
		
		//Fonction permettant de montrer un sous-menu
		var afficherMenu = function(menu_courant) {
			//css sur onglet en cours
			var couleur_encours = menu_courant.find('.menu_m').css('background-color');
			menu_courant.parent(onglet_encours).prev().css('background-color',couleur_encours);
			menu_courant.parent(onglet_encours).prev().find('.cercle').css({'background-color':'#fff','border':'solid 1px #fff'});
			menu_courant.parent(onglet_encours).css('background-color',couleur_encours);
			
			
			var couleur_hex = menu_courant.find('.ongletBit_color').val();
			var couleur_rgb = hex2rgb(couleur_hex);
			var rgb_encours = couleur_rgb;
			
			//alert(couleur_hex);
			//console.log(couleur_encours);
			/*var rgb_split1 = couleur_encours.split('rgb(');
			var rgb_split2 = rgb_split1[1];	
			
			var rgb_split=rgb_split2.split(')');
			var rgb_encours=rgb_split[0];*/
			
			/////////////////////////GESTION DU DEGRADE DU MENU DEROULANT//////////////////////////////////////////////
			var userAgent = navigator.userAgent.toLowerCase(),
			browser   = '',
			version   = 0;
			//$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
			
			// Is this a version of IE?
			if ($.browser.msie) {
				userAgent = $.browser.version;
				userAgent = userAgent.substring(0,userAgent.indexOf('.'));	
				version = userAgent;
				browser = "Internet Explorer";
				//IE6-8 +  W3C
				/*if(version<=8){
					menu_courant.find('.degrade').css('filter','progid:DXImageTransform.Microsoft.gradient( startColorstr="#00' +008282+ '", endColorstr="#' +008282+  '",GradientType=1 )');
				}else*/ if(version>=10){//IE10+ 
					menu_courant.find('.degrade').css('background','-ms-linear-gradient(left,  rgba('+rgb_encours+',0) 78%,rgba('+rgb_encours+',0.9) 95%,rgba('+rgb_encours+',1) 100%)').css('background','linear-gradient(to right,  rgba('+rgb_encours+',0) 78%,rgba('+rgb_encours+',0.9) 95%,rgba('+rgb_encours+',1) 100%)');
				}
			}
			
			// Is this a version of Chrome?
			if ($.browser.chrome) {
			  userAgent = userAgent.substring(userAgent.indexOf('chrome/') + 7);
			  userAgent = userAgent.substring(0,userAgent.indexOf('.'));	
			  version = userAgent;
			  // If it is chrome then jQuery thinks it's safari so we have to tell it it isn't
			  $.browser.safari = false;
			  browser = "Chrome";
			  /* Chrome4 + W3C*/
				if(version>=4 && version<10){
					menu_courant.find('.degrade').css('background','-webkit-gradient(linear, left top, right top, color-stop(78%,rgba('+couleur_encours+',0)), color-stop(95%,rgba('+couleur_encours+',0.9)), color-stop(100%,rgba('+couleur_encours+',1)))').css('background','linear-gradient(to right,  rgba('+rgb_encours+',0) 78%,rgba('+rgb_encours+',0.9) 95%,rgba('+rgb_encours+',1) 100%)');
				}else if(version>=10){/* Chrome10+ */
					menu_courant.find('.degrade').css('background','-webkit-linear-gradient(left,  rgba(0,130,130,0) 78%,rgba(0,130,130,0.9) 95%,rgba(0,130,130,1) 100%)').css('background','linear-gradient(to right,  rgba('+rgb_encours+',0) 78%,rgba('+rgb_encours+',0.9) 95%,rgba('+rgb_encours+',1) 100%)');
				}
			}
			
			// Is this a version of Safari?
			if ($.browser.safari) {
				userAgent = userAgent.substring(userAgent.indexOf('safari/') + 7);	
				userAgent = userAgent.substring(0,userAgent.indexOf('.'));
				version = userAgent;	
				browser = "Safari";
				/* Safari4+ W3C*/
				if(version>=4 && version<5){
					menu_courant.find('.degrade').css('background','-webkit-gradient(linear, left top, right top, color-stop(78%,rgba('+couleur_encours+',0)), color-stop(95%,rgba('+couleur_encours+',0.9)), color-stop(100%,rgba('+couleur_encours+',1)))').css('background','linear-gradient(to right,  rgba('+rgb_encours+',0) 78%,rgba('+rgb_encours+',0.9) 95%,rgba('+rgb_encours+',1) 100%)');
				}else if(version>=5){/* Safari5.1+ */
					menu_courant.find('.degrade').css('background','-webkit-linear-gradient(left,  rgba('+rgb_encours+',0) 78%,rgba('+rgb_encours+',0.9) 95%,rgba('+rgb_encours+',1) 100%)').css('background','linear-gradient(to right,  rgba('+rgb_encours+',0) 78%,rgba('+rgb_encours+',0.9) 95%,rgba('+rgb_encours+',1) 100%)');
				}
			}
			
			/*if ($.browser.safari) {
				userAgent = userAgent.substring(userAgent.indexOf('version/') + 8);
				userAgent = userAgent.substring(0, userAgent.indexOf('.'));
				version = userAgent;
				browser = "Safari";
			}*/
			
			// Is this a version of Mozilla?
			if ($.browser.mozilla) {
				//Is it Firefox?
				if (navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
					userAgent = userAgent.substring(userAgent.indexOf('firefox/') + 8);
					userAgent = userAgent.substring(0,userAgent.indexOf('.'));
					version = userAgent;
					browser = "Firefox"
					/* FF3.6+ */
					if(version>=3){
						menu_courant.find('.degrade').css('background','-moz-linear-gradient(left,  rgba('+rgb_encours+',0) 78%, rgba('+rgb_encours+',0.9) 95%, rgba('+couleur_encours+',1) 100%)').css('background','linear-gradient(to right,  rgba('+rgb_encours+',0) 78%,rgba('+rgb_encours+',0.9) 95%,rgba('+rgb_encours+',1) 100%)');
					}
				}
				// If not then it must be another Mozilla
				else {
					browser = "Mozilla (not Firefox)";
					/* W3C */
					menu_courant.find('.degrade').css('background','linear-gradient(to right,  rgba('+rgb_encours+',0) 78%,rgba('+rgb_encours+',0.9) 95%,rgba('+rgb_encours+',1) 100%)');
				}
			}
			
			// Is this a version of Opera?
			if ($.browser.opera) {
				userAgent = userAgent.substring(userAgent.indexOf('version/') + 8);
				userAgent = userAgent.substring(0,userAgent.indexOf('.'));
				version = userAgent;
				browser = "Opera";
				/* Opera 11.10+ */
				if(version>11){
					menu_courant.find('.cercle').css('background','-o-linear-gradient(left,  rgba('+couleur_encours+',0) 78%,rgba('+couleur_encours+',0.9) 95%,rgba('+couleur_encours+',1) 100%)').css('background','linear-gradient(to right,  rgba('+rgb_encours+',0) 78%,rgba('+rgb_encours+',0.9) 95%,rgba('+rgb_encours+',1) 100%)');
				}
			}

			//Limiter les rayons de niv2 à 9
			var tot_rayonniv2=menu_courant.find('.menuniv2_li').length;
			if(tot_rayonniv2>9){
				menu_courant.find('.menuniv2_li:gt(8)').hide();
				menu_courant.find('.menuniv2_voirtout').show();
			}
			//Afficher les rayons de niveau3
			if(menu_courant.is(':hidden')){
				menu_courant.css('display','block').find('.menuniv2_li').each(function(){
					//Limiter les rayons de niv3 à 5
					var tot_rayonniv3=$(this).find('.menuniv3_li').length;
					if(tot_rayonniv3>5){
						$(this).find('.menuniv3_li:gt(4)').hide();
						$(this).find('.menuniv3_voirtout').show();
					}
					//survol et affichage niveau3
					var couleur_niv23 = menu_courant.find('.couleur_ssrayon').val();																	
					$(this).mouseenter(function(){
						$(this).css('background-color',couleur_niv23);
						if($(this).find('.menuniv3').length>0 && $(this).find('.menuniv3').is(':hidden')){
							var couleur_niv3 = $(this).find('.menuniv3').css('background-color');
							$(this).find('.menuniv3').show();
						}
					}).mouseleave(function(){
						$(this).removeAttr('style');
						if($(this).find('.menuniv3').length>0 && $(this).find('.menuniv3').is(':visible')){
							$(this).find('.menuniv3').hide();
						}
					});
				});
				
			}
		};
		
		//Fonction permettant de cacher un sous-menu
		var cacherMenu = function(menu_courant) {
			//var couleur_encours = menu_courant.find('.menu_m').css('background-color');
			menu_courant.parent(onglet_encours).prev().removeAttr('style');
			
			var couleur_hex = menu_courant.find('.ongletBit_color').val();
			
			menu_courant.parent(onglet_encours).prev().find('.cercle').css({'background-color':'#'+couleur_hex,'border':'solid 1px #'+couleur_hex+''});
			menu_courant.parent(onglet_encours).removeAttr('style');
			if(menu_courant.is(':visible')){
				menu_courant.css('display','none');
			}
			window.clearTimeout(timer);
		}
		
		return this.each(function() {
			var $elem_encours = $(this);//Conteneur d'onglets en question
			// Lorsque l'on entre dans le menu on déclenche un timer à retardement d'affichage
			$elem_encours.find(onglet_encours).each( function() {//Parcourir chaque onglet(ongletBit)
				var menu_courant;
				$(this).mouseenter(function() {//survol du menu en cours
					menu_courant = $(this).find(menu_encours);//menu deroulant encours
					// On affiche le sous menu associé
					timer = window.setTimeout(function(){afficherMenu(menu_courant)}, timer_option.timer);
				}).mouseleave(function(){
					menu_courant = $(this).find(menu_encours);//menu deroulant encours
					cacherMenu(menu_courant);
				});
			});
		});
	}
})(jQuery);
$(document).ready(function(){
	var temps_affichage={ timer : 150 }
	$('.onglets').deroulerMenu(temps_affichage,'.ongletBit','.menu');
});
/*FIN PLUGGIN POUR LES ONGLETS ************************************/

//RGB en HEXA
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 function hex(x) {
  return ('0' + parseInt(x).toString(16)).slice(-2);
 }
 return '#'+ hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

//RGB en HEXA
function hex2rgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return r + "," + g + "," + b;
}

//LES UTILITAIRES POUR L'ENSEMBLE DES PAGES
(function($){
	$.fn.inclureUtilitaires = function(){
							   
		//BARRE DE NAVIGATION
		//$('.navigation>h2:first-child>a').text('Accueil');//Remplacer "Le monde des createurs" par "Accueil"
		if($("#contenupage_accueil").length>0){//Pour uniquement page accueil
			$('.navigation').css('display','none');
		}
		

		///////////PAGE INDEX///////////
		//Zoom sur ...
		if($('.selection').find('.articleBit').length>0){
			var z=0;
			$('.selection').find('.articleBit').each(function(){
				++z;
				if(z==4) z=1;
				$(this).addClass('articleBit_'+z);
			});
		}	
		
		
		///////////PAGE CATEGOTIE///////////
		//Pour les articles
		/*if($(".articles").length!=0){
			var a = 0;
			$(".articleBit").each(function(){
				++a;
				if(a==5) a=1;
				$(this).addClass("articleBit_"+a);
			});
		}*/
		
		/*Opacite encart nos categories*/
		var couleur_hex = $('.sscateg_content').attr('id');
		var couleur_rgb = hex2rgb(couleur_hex);
		if(couleur_rgb!=''){
			$('.sscateg_content').css({'background-color':'rgb('+couleur_rgb+')','background-color':'rgba('+couleur_rgb+',0.60)'});
			// Pour IE6 et7
			if ($.browser.msie) {
				userAgent = $.browser.version;
				userAgent = userAgent.substring(0,userAgent.indexOf('.'));	
				version = userAgent;
				browser = "Internet Explorer";
				/* IE6-8 +  W3C */
				if(version<=8){
					$('.sscateg_content').css({'filter':'progid:DXImageTransform.Microsoft.gradient(startColorstr=#80'+couleur_hex+',endColorstr=#80'+couleur_hex+')','zoom':'1','background':'transparent'});
				}
			}
		}
		
		//les sous-rayons
		if($('.sscategBit').length>0){
			var s=0;
			$('.sscategBit').each(function(){
				++s;
				if(s==5) s=1;
				$(this).addClass('sscategBit_'+s);
			});
			
			/*var categG_height = $('.categdesc_content').innerHeight();
			var categM_height = $('.sscateg_content').innerHeight();
			var categD_height = $('.logo2').innerHeight();
			if(categM_height>435){
				var hauteur_ajout = categM_height - 435 ;
				//alert(hauteur_ajout);
				var categG_height2 = $('.categdesc_content').height()+ hauteur_ajout;
				$('.categdesc_content').height(categG_height2);
				
			}*/
		}
			
		
		
		
		///////////Page article///////////
		//Articles conseilles
		if($(".articlesconseilles").length!=0){
			var c=0;
			$('.articleconseilBit').each(function(){
				++c;
				if(c==5) c=1;
				$(this).addClass('articleconseilBit_'+c);
			});
		}
		////////Footer : menu instit////////////////
		if($('.infos').find('li>a[href*="newsletter.htm"]').length>0){
			$('.infos').find('li>a[href*="newsletter.htm"]').parent('li').appendTo('.services ul');
		};
		if($('.infos').find('li>a[href*="telecharger"]').length>0){
			$('.infos').find('li>a[href*="telecharger"]').parent('li').appendTo('.services ul');
		};
				
		////////PAGE PANIER////////////////
		//Pour les lignes panier
		//$("tr.lignepanierbit:last td, .lignepanierbit_bis:last td").css("border-bottom","none");
		$("tr.lignepanierbit").each(function(){
			if($.trim($(this).find($('.lignepanier_marquelogo')).html())==''){
				$(this).find($('.lignepanier_marquelogo')).remove();
				$(this).find($('.lignepanier_lib')).css('padding-top','15px');
			}
		});
		$('.lignepanierbit_bis:even td').css("background-color","#F7F7F7");
		
		////////PAGE ESPACE PARTENAIRES/////////////
		 var nb_liens = $(".lienBit").length;
		if(nb_liens>1){
			var i = 0;
			$(".lienBit").each(function(){
				++i;
				if(i==3) i=1;
				$(this).addClass("lienBit"+i);
			});
			$(".lienBit1").css("float","left");
			$(".lienBit2").css("float","right");

			var $clear= $("<div class='clear'></div>");
			$clear.insertAfter(".lienBit2");
		}
		
		////////PLAN DU SITE DISPOSE SUR PLUSIEURS LIGNES/COLONNES/////////////
		if($('.menuplanBit_boutique').length>0){
			var m = 0;
			$(".menuplanBit_boutique").children('div').not('.titre_planboutique, .clear').each(function(){
				var styleEncours = $(this).attr('style');
				if(styleEncours=='margin-left:0px;' || styleEncours=='margin-left: 0px'){//niv1
					++m;
					if(m==4) m=1;
					$(this).addClass('rayonBit_niv1 rayonBit'+m).removeAttr('style');	
				}else{
					if(styleEncours=='margin-left:10px;' || styleEncours=='margin-left: 10px'){//niv2
						$(this).addClass('rayonBit_niv2').appendTo($(this).prev());	
					}else{
						if(styleEncours=='margin-left:20px;' || styleEncours=='margin-left: 20px'){//niv3
							$(this).addClass('rayonBit_niv3').appendTo($(this).prev());	
						}else{
							if(styleEncours=='margin-left:30px;' || styleEncours=='margin-left: 30px'){//niv4
								$(this).addClass('rayonBit_niv4').appendTo($(this).prev());	
							}
						}
					}
				}
			});
			var $clear= $("<div class='clear'></div>");
			$clear.insertAfter(".rayonBit3");
			//css
			$('.rayonBit_niv1').children('a').wrapInner('<strong class="rouge"></strong>');
			$('.rayonBit_niv2').css('margin','0');
		}
	}
})(jQuery);
$(document).ready(function(){
	$('#contenupage').inclureUtilitaires();
});
