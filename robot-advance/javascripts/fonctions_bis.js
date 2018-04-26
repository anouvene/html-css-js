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
			$(this).find('.monpanier_content').css('background','url(template-monpanier_bg2.png) no-repeat');
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
							if($.trim($(this).find('.ssmenu').html())!=""){
								$(this).css('background','url(template-ongletBit_over_m.png) repeat-x 0 5px').find('.ongletBit_g,.ongletBit_d').show();
								$(this).find('.ongletBit_content').children('a').css({'color':'#fff','background':'none'});
								//IE7
								if($.browser.msie && $.browser.version<8){
									ssmenu_encours.css('top','27px');
								}
								// On affiche le sous menu associé
								/*timer = window.setTimeout(function(){slideDownSousmenu(ssmenu_encours)}, options.timer);*/
								ssmenu_encours.show();
							}
							break;
						default :
							break;
					}	
					
				}).mouseleave(function(){
					ssmenu_encours = $(this).find(ssmenu);
					switch(conteneur_menu){
						case 'onglets' :
							$(this).css('background','none').find('.ongletBit_g,.ongletBit_d').hide();
							$(this).find('.ongletBit_content').children('a').css({'color':'#1a1a1a','background':'url(template-onglet_sep.jpg) no-repeat right 17px'});
							//cacherSousMenu(ssmenu_encours);//Appel à la fonction cacher
							ssmenu_encours.hide();
							break;
						default :
							break;
					}	
					
				});
			});
		});
	}
})(jQuery);
/*FIN PLUGGIN POUR LES ONGLETS ************************************/

/****************************************/
/*Zoom image*/
/****************************************/

//Fonction calcul position d'un élement relatif à son parent
(function($){
	$.fn.extend({
	   findPos : function() {
		   obj = $(this).get(0);
		   var curleft = obj.offsetLeft || 0;
		   var curtop = obj.offsetTop || 0;
		   while (obj = obj.offsetParent) {
				curleft += obj.offsetLeft
				curtop += obj.offsetTop
		   }
		   return {x:curleft,y:curtop};
	   }
	});
})(jQuery);

//Lancement des zooms
(function($){
	$.fn.afficherZoom = function(divEnCours, divCible, top) {
		$('.zoomImage').fadeOut('fast');//Désactiver rapidement tous les zooms
		var divFinale = '#'+divCible+divEnCours;
		var divZoom = $(divFinale).find('.zoomImage');
		if(divZoom.css("display") == 'none' && $.trim(divZoom.html())!=""){
			switch (top) {
				case 'articles':
					divZoom.fadeIn();
					$(divFinale).find('.etiquette a').mouseleave(function(){//On quitte le zoom en cours
						divZoom.fadeOut('fast');
					});			
					break;
				case 'articlesconseilles':
					divZoom.fadeIn();
					$(divFinale).find('.etiquette a').mouseleave(function(){//On quitte le zoom en cours
						divZoom.fadeOut('fast');
					});
					break;
				case 'selection':
					divZoom.fadeIn();
					$(divFinale).find('.etiquette a').mouseleave(function(){//On quitte le zoom en cours
						divZoom.fadeOut('fast');
					});			
					break;					
				default:
					divZoom.css("display", "none");
					break;
			}
		}
	}
})(jQuery);


//FIN DU ZOOM -----------------------------------------


//LES UTILITAIRES POUR L'ENSEMBLE DES PAGES
$(document).ready(function(){
	//Remplacer "GO TENDANCE" par "Accueil" AU DEBUT DE LA BARRE DE NAVIGATION
	$('.navigation>h2:first-child>a').text('Accueil').css("text-transform","none");
	
	///////////PAGE ACCUEIL///////////
	//Les articles du carrousel
	$('.carrousel').find('.carrouselArticles').each(function(){
		$(this).find('.carrouselArticleBit:even').css('float','left')
		$(this).find('.carrouselArticleBit:odd').css('float','right')
	});
	
	
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
		$(this).find('.etiquette a').mouseenter(function(){
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
		var artId_encours = $(this).attr("id");
		var tabTemp = artId_encours.split('_');
		var id_encours = tabTemp[1];
		$(this).find('.etiquette a').mouseenter(function(){
			$(this).afficherZoom(id_encours,'articleconseilBit_','articlesconseilles');
		});
	});

	//Pour les lignes panier
	$("tr.lignepanierbit:last td, tr.lignepanierbit_bis:last td").css("border-bottom","none");
	
});


//Vider un  champ texte de formulaire
(function($){
	$.fn.viderFormulaire = function(options){
		var defaults = {
			val_champ : ''
		};
		var options = $.extend( defaults, options );
		var champ = $(this);
		return champ.each(function(){
			if($(this).val()==options.val_champ){
				$(this).val('');
			}
		});
	}
})(jQuery);
$(document).ready(function(){
	var options_mail = { val_champ : "Mon mail ..." }
	$(".input_news").click(function(){
		$(this).viderFormulaire(options_mail);
	});
	
	var options_rech = { val_champ : "Recherche ..." }
	$(".input_rech").click(function(){
		$(this).viderFormulaire(options_rech);
	});
});


//Maintenir le bouton j'aime à cause de l'ajax
(function($){
	$.fn.partager=function(){
		return this.each(function(){
			var $jaime = $(".addthis_toolbox").clone();
			$jaime.show().appendTo(".jaime");
		});
	}
})(jQuery);
$(document).ready(function() {
	$(".jaime").partager();
});


//Photos supplementaires
(function($){
	$.fn.selectionnerPhoto=function(){
		var photos = $(this);
		return photos.each(function(){
			$(this).find('.photoBit').each(function(){					   
				$(this).mouseover(function(){
					$(this).addClass("photoBit_selected");
					$(this).siblings(".photoBit").removeClass("photoBit_selected");
				});
			});
		});
	}
})(jQuery);
$(document).ready(function(){
	$(".photos").selectionnerPhoto();
});

//Utile pour reinitialiser le thickbox "Livraison" et "Guide de tailles"
(function($){
	$.fn.reinitPrety=function(){	  
		if($('#contenuArticle').length!=0) initPrety();	
		return this;
	}
})(jQuery);
$(document).ready(function(){
	$('#contenuArticle').reinitPrety();
});


//Gestion des caractéristiques "pointures et tailles ... etc" page produit
(function($){
	$.fn.changerLaCaract=function(){
		var $liste_options = $(this);//pointeur global de listes d'options
		var artid = $('#artid').val();
		
		return $liste_options.find('.produit_caractBit').each(function(){//Parcourir chaque conteneur parent de chaque liste
			var caractId = $(this).find('input[name=caracteristique]').val();//identifiant de la liste
			var $liste_clone;//conteneur d'options en remplacement du select
			
			//Ancienne liste avec le select
			$(this).find("select#lst_"+caractId).each(function(){//Parcourir chaque ancienne liste du conteneur parent
				
				//Debut transformation de la liste et ses options par des divs
				$liste_clone = $("<div class='articleCaracteristique' name='lst_"+caractId+"' id='lst_"+caractId+"' value=''><div class='clear'></div></div>");
				var $option_clone;
				var choixId;
				var leschoix;
				var option_selected;
				$(this).find('option').each(function(){
					choixId = $(this).val();
					choixVal = $(this).text();
					option_selected = $(this).attr('selected');//l'option sélectionnée par défaut
					if(option_selected=='selected'){
						$liste_clone.attr('value',$(this).val());
						$(this).parent('select#lst_'+caractId).siblings(".articleCaracteristique_"+caractId).val($(this).val());
					}
					leschoix += "<div class='choixBit' id='"+choixId+"'>"+choixVal+"</div>";								 
				});
				$option_clone = $(leschoix);
				$option_clone.prependTo($liste_clone);
				$liste_clone.appendTo($(this).parents('.produit_caractBit').find('td:eq(1)'));
				$(this).remove();//retirer le select
				//Fin transformation liste
			});
			
			//Nouvelle liste avec un div
			$(this).find("#lst_"+caractId).each(function(){	//Parcourir chaque nouvelle liste du conteneur parent

				if($(this).data('choixBit_data')){//Si l'objet $(".produit") contient des données
					$(this).attr("value",$(this).data('choixBit_data').value);//alors changer la valeur de la liste
					$(this).siblings(".articleCaracteristique_"+caractId).val($(this).data('choixBit_data').value);//Idem pour le input "articleCaracteristique" utile pour poster "la liste"
					$(this).find("#choixBit_"+$(this).data('choixBit_data').id).addClass("choixBit_selected");//changer le css de l'option choisi
					$(this).find("#choixBit_"+$(this).data('choixBit_data').id).siblings(".choixBit").removeClass("choixBit_selected");//changer le css pour toutes les autres options
					
				}										 
				$(this).find(".choixBit").each(function(){//parcourir les options de la nouvelle liste
					if($(this).attr('id') == $liste_clone.attr('value')){
						$(this).addClass('choixBit_selected');
					} 
					/*var option_txt = $(this).find("option").text();
					$(this).attr('id','choixBit_'+option_id).text(option_txt).remove('option');*/
					var option_id = $(this).attr('id');
					var option_val = option_id;
					
					$(this).click(function(){
						$(this).parent("#lst_"+caractId).data('choixBit_data',{id:option_id,value:option_val});//stocker temporairement l'id et la valeur de l'option clique dans l'objet $(".produit")
						$(this).parent('#lst_'+caractId).attr("value",option_val);//équivalent du select sur l'évenement "onchange" de sa valeur 
						$(this).parent('#lst_'+caractId).siblings(".articleCaracteristique_"+caractId).attr("value",option_val);//input "articleCaracteristique" utile pour poster "la liste"
						afficherArticle(artid,'changerCaract');
					});
				});
			
			});
		});
	}
})(jQuery);




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




