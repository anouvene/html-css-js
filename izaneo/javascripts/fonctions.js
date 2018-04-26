/*--------PANIER DEROULANT--------------*/
//Fonction dérouler avec un effet d'apparition progressive
/*(function($){
	$.fn.EffetApparition = function() {//fonction à étendre à un objet jquery
		$.fn.extend({//définition de la méthode dérouler
			derouler: function() {
				var monObjet = $('#panier');
				monObjet.slideDown();
			}
		});
		return this.each(function() { 
			$('#panier').derouler();//retourne la méthode dérouler
		});
	}
})(jQuery)*/

(function($){
	$.fn.montrerPanier = function(){
		var $monpanier=$(this);
		$monpanier.mouseenter(function(){
			$(this).find('.monpanier_content').css('background','url(images/monpanier_bg2.png) no-repeat');
			$(this).find('#panier').slideDown();
		}).mouseleave(function(){
			$(this).find('.monpanier_content').css('background','');
			$(this).find('#panier').slideUp('fast');
		});
	}
})(jQuery);
/*--------FIN PANIER DEROULANT--------------*/

/*DEBUT PLUGGIN POUR LES ONGLETS ************************************/
(function($) {
	$.fn.deroulerMenu = function(options, menu, ssmenu, conteneur_menu) {
		// Le timer qui sera réinitialiser si l'on revient sur le menu
		var timer = 0;
		var defaults = {
			timer : 500
		};
		var options = $.extend( defaults, options );
		
		//Fonction permettant de montrer un sous-menu
		var slideDownSousmenu = function(ssmenu_encours) {
			$(ssmenu_encours).slideDown('fast');
		};
		
		//Fonction permettant de cacher un sous-menu
		var cacherSousMenu = function(ssmenu_encours) {
			$(ssmenu_encours).slideUp('fast');
			window.clearTimeout(timer);
		}

		return this.each(function() {
			$elem_encours = $(this);//Conteneur du menu en question
			// Lorsque l'on entre dans le menu on déclenche un timer à retardement d'affichage
			$elem_encours.find(menu).each( function() {//Parcourir chaque menu(ongletBit)
				var ssmenu_encours;
				$(this).mouseenter(function() {//survol du menu en cours
					ssmenu_encours = $(this).find(ssmenu);//ssmenu encours
					switch(conteneur_menu){
						case 'onglets' :
							var couleur_onglet = ssmenu_encours.css('background-color');
							$(this).css('background','none 0 0 '+couleur_onglet);
							$(this).find('.onglet_puce').css('background-color','#fff');
							
							if($.trim($(this).find('.ssmenu').html())!=""){
								//Bien disposer les sous-rayons
								var indice = 0;
								$('.ssmenu_ssrayonBit').each(function(){
									++indice;
									if(indice==4) indice = 1;
									$(this).addClass('ssmenu_ssrayonBit_'+indice);
								});
								// On affiche le sous menu associé
								timer = window.setTimeout(function(){slideDownSousmenu(ssmenu_encours)}, options.timer);
							}
							break;
						default :
							break;
					}	
					
				}).mouseleave(function(){
					ssmenu_encours = $(this).find(ssmenu);
					switch(conteneur_menu){
						case 'onglets' :
							var couleur_onglet = ssmenu_encours.css('background-color');
							$(this).css('background','');
							$(this).find('.onglet_puce').css('background-color',couleur_onglet);
							cacherSousMenu(ssmenu_encours);
							break;
						default :
							break;
					}	
					
				});
			});
		});
	}
})(jQuery);
$(document).ready(function(){
	var options={ timer : 150 }
	$('.onglets').deroulerMenu('options','.menu','.ssmenu','onglets');
});
/*FIN PLUGGIN POUR LES ONGLETS ************************************/



//LES UTILITAIRES POUR L'ENSEMBLE DES PAGES
$(document).ready(function(){
	//BARRE DE NAVIGATION
	$('.navigation>h2:first-child>a').text('Accueil').css("text-transform","none");//Remplacer "Izaneo" par "Accueil"
	if($("#navigation_index").length==0){//cacher la barre sur la page accueil
		$(".navigation").css("display","block");
		$('#skin').remove();
		$('#page').css({'background':"url('images/page_bg.jpg') no-repeat center top #D6E9F7",'min-width':'1550px','width':'auto'});
	}else{
		$("#header").addClass("header_index").css('background',"url('images/header_bg.png') no-repeat");//header différent sur la page accueil  
		$("#contenupage").css({"background":"url('images/cadre_h.png') no-repeat","height":"25px","min-height":"25px"});//idem pour le contenu de la page
		
	}
	///////////PAGE ACCUEIL///////////
	
	
	///////////PAGE CATEGOTIE///////////	
	//Si pas d'image qui précède la description, alors supprimer le div qui le contient
	if($(".categ_ima img[src*='spacer']").length!=0){
		$(".categ_ima").remove();
	}
	
	//Bien disposer les articles page catégorie, recherche etc. ...
	var indice = 0;
	$(".articleBit").each(function(){
		++indice;
		if(indice==5) indice = 1;
		$(this).addClass("articleBit_"+indice);
		//ZOOM
		var divEnCoursId = $(this).attr("id");
		var tabTemp = divEnCoursId.split('_');
		var idEnCours = tabTemp[1];
		$(this).find('.articleBit_ima').mouseenter(function(){
			$(this).afficherZoom(idEnCours,'articleBit_','articles');
		});
	});
	$(".articleBit:last .articleBit_ima").css("border","none");
	
	///////////PAGE ARTICLE///////////	
	//Bien disposer les photos supplémentaires page article ...
	var p = 0;
	$('.photoBit').each(function(){
		++p;
		if(p==4) p=3;
		$(this).addClass('photoBit_'+p);
	});
	
	//Bien disposer les articles conseillés ...
	var k = 0;
	$(".articleconseilBit").each(function(){
		++k;
		if(k==6) k = 1;
		$(this).addClass("articleconseilBit_"+k);
		//ZOOM
		var divEnCoursId = $(this).attr("id");
		var tabTemp = divEnCoursId.split('_');
		var idEnCours = tabTemp[1];
		$(this).find('.articleconseilBit_ima').mouseenter(function(){
			$(this).afficherZoom(idEnCours,'articleconseilBit_','articlesconseilles');
		});
	});

	
	//Pour les lignes panier
	$("tr.lignepanierbit:last td, tr.lignepanierbit_bis:last td").css("border-bottom","none");
	
});

//Encart de recherche rapide :
(function($){
	$.fn.rechercher = function(){
		if($('.input_rech').val()=='Recherche rapide'){
			$('.input_rech').val('');
		}
		$('form[name=formu_rech]').submit();
	}
})(jQuery);



(function($){
	$.fn.partager = function(){
		$facebooktwitter = $(this);
		return $facebooktwitter.each(function(){
			$(this).mouseenter(function(){
				$(this).stop().animate(
					{ width:'121px', height:'117px'},
					300
				);
			}).mouseleave(function(){
				$(this).stop().animate(
					{ width:'28px', height:'117px'},
					300
				);
			});
		});
	}
})(jQuery);
$(document).ready(function(){
	$(".facebook_twitter_FR").partager();
});

//Hauteur du contenu en fonction de la hauteur dynamique de la fenetre du navigateur
/*$(document).ready(function(){
	var fen_h = $(window).height()/2;
	var fen_h2;
	$("#contenupage").css({'min-height':fen_h,'height':'auto'});
	$(window).resize(function(){ 
		fen_h2 = $(window).height()/2;				  	
		$("#contenupage").css({'min-height':fen_h2,'height':'auto'}); 
		return false;
	});
});*/




