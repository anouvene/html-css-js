
//Gestion des caractéristiques "pointures et tailles ... etc" page produit
(function($){
	$.fn.changerLaCaract=function(){
		var $liste_options = $(this);//pointeur global de listes d'options(".produit_caracts")
		var artid = $('#artid').val();
		
		return $liste_options.each(function(){//Début du conteneur de liste
			//////////////Parcourir les tables de caractéristiques contenant un select									
			$(this).find('.table_caracts').each(function(){												
				var caractId = $(this).find('input[name=caracteristique]').val();//identifiant de la liste
				var $liste_clone;//conteneur d'options en remplacement du select
				
				//////////Début clonage du select de caractéristiques par des divs
				$(this).find("select#lst_"+caractId).each(function(){//Parcourir chaque ancienne liste du conteneur parent
					$liste_clone = $("<div class='articleCaracteristique' name='lst_"+caractId+"' id='lst_"+caractId+"' value='' style='display:none'></div>");//conteneur
					var $option_clone;// les choix
					var choixId;
					var leschoix;
					var option_selected;
					$(this).find('option').each(function(){
						choixId = $(this).val();
						choixVal = $(this).text();
						option_selected = $(this).attr('selected');//l'option sélectionnée par défaut
						if(option_selected=='selected'){
							$liste_clone.attr('value',$(this).val());
							//Initialiser la valeur d'option choisie pour le input ".articleCaracteristique_option_id"
							$(this).parent('select#lst_'+caractId).siblings('input.articleCaracteristique_'+caractId).val($(this).val());
						}
						leschoix += "<div class='choixBit' id='"+choixId+"'>"+choixVal+"</div>";								 
					});
					$option_clone = $(leschoix);//les choix ainsi crées
					$option_clone.prependTo($liste_clone);//puis insérer les choix dans un conteneur
					$liste_clone.appendTo($(this).parents('.table_caracts').find('td:eq(1)'));//insérer ds un td la nouvelle liste ainsi crée
					$(this).remove();//supprimer le select
				});
				//Fin clonage select
				
				//déplacer la liste 'articleCaracteristique' correspondante dans son conteneur "choixcaracts"
				$(this).find('.articleCaracteristique').appendTo($(this).find('.choixcaracts'));
			});
			///////////Fin parcours des tables de caractéristiques
			
			///////////NOUVEAU TRAITEMENT DES TABLES DE CARACTERISTIQUES CONTENANT UN SELECT///////////////////////////////
			$(this).find('.table_caracts').each(function(){	//Parcourir les tables de caractéristiques contenant une liste déroulante
				var caractId = $(this).find('input[name=caracteristique]').val();//identifiant de la liste
				$(this).find("#lst_"+caractId).each(function(){	//Parcourir chaque nouvelle liste
					//Traitement des options
					$(this).find('.choixBit').each(function(){
						//initialisation des options									
						if($(this).attr('id') == $(this).parent('#lst_'+caractId).attr('value')){
							$(this).addClass('choixBit_selected');//option en cours
							if($(this).hasClass('choixBit_selected')){
								$(this).parents('.choixcaracts').children('span').text($(this).text());
							}
						}
						//action click sur une option
						var option_id = $(this).attr('id');
						var option_val = option_id;
						$(this).click(function(){//lors d'un clic sur l'option choisie
							$(this).parents('.choixcaracts').children('span').text($(this).text());
							$(this).parent("#lst_"+caractId).data('choixBit_data',{id:option_id,value:option_val});//la liste parent sauvegarde temporairement l'id et la valeur de l'option cliquee pour une utilisation ultérieure
							$(this).parent('#lst_'+caractId).attr("value",option_val);//la liste va prendre une nvelle valeur de l'option choisie
							$(this).parents('.choixcaracts').siblings('.articleCaracteristique_'+caractId).val(option_val);//input "articleCaracteristique" utile pour poster "la liste"
							afficherArticle(artid,'changerCaract');//traitement ajax
						});
					});
					
					//initialisation des options lors d'un changement d'une option avec l'ajax
					if($(this).data('choixBit_data')){//Si l'objet liste contient des données
						$(this).attr("value",$(this).data('choixBit_data').value);//alors changer la valeur de la liste
						//Initialiser la valeur d'option choisie pour le input".articleCaracteristique_option_id"
						$(this).parent('#lst_'+caractId).siblings(".articleCaracteristique_"+caractId).val($(this).data('choixBit_data').value);//Idem pour le input "articleCaracteristique" utile pour poster "la liste"
						$(this).find("#choixBit_"+$(this).data('choixBit_data').id).addClass("choixBit_selected");//changer le css de l'option choisi
						$(this).find("#choixBit_"+$(this).data('choixBit_data').id).siblings(".choixBit").removeClass("choixBit_selected");//changer le css pour toutes les autres options
					}										 
				});
			});//FIN DU TRAITEMENT
		});//Fin du conteneur de liste
	}
})(jQuery);



/*DEBUT PLUGGIN POUR LES ONGLETS ************************************/
(function($) {
	$.fn.deroulerMenu = function(options, menu, ssmenu, conteneur_menu) {
		var $elem_encours = $(this);//Conteneur du menu en question
		// Le timer qui sera réinitialiser si l'on revient sur le menu
		var timer = 0;
		var defaults = {
			timer : 1
		};
		var options = $.extend( defaults, options );
		
		//Fonction permettant de montrer un sous-menu
		var montrerSousmenu = function(ssmenu_encours) {
			switch(conteneur_menu){
				case 'case_onglets' :
					var posX_ssmenu_encours = ssmenu_encours.parent('.ongletBit').position();
					//nouveau css sur l'onglet en cours
					ssmenu_encours.parents('.ongletBit').addClass('ongletBit_over');
					ssmenu_encours.css({'display':'block'});
					//pour  faire joli: cacher le trait gris qui separe l'onglet et lewidth menu deroulant
					ssmenu_encours.siblings('.cache_bordure').css({'display':'block','width':ssmenu_encours.parent('.ongletBit').outerWidth()+'px','left':posX_ssmenu_encours.left+'px'});
					break;
				case 'case_langues' :
					ssmenu_encours.slideDown('fast');
					ssmenu_encours.children('li').each(function(){
						$(this).bind('click',function(){
							//$(this).toggleClass('entered');
							$('.choix').html($(this).text());
							/*var tempLangue=$(this).attr('id');
							var tempLangue=tempLangue.split('_');
							$('#langueId').val(tempCateg[1]);*/
						});
					});
					break;
				case 'case_touteslescategs' :
					$('.touteslescategs').addClass('touteslescategs_over');
					ssmenu_encours.slideDown('fast');
					ssmenu_encours.children('li').each(function(){
						$(this).bind('click',function(){
							//$(this).toggleClass('entered');
							$('.categ_selected').text($(this).text());
							var tempCateg=$(this).attr('id');
							var tempCateg=tempCateg.split('_');
							$('#rayonid').val(tempCateg[1]);
						});
					});
					break;
				case 'case_choixcaracts' :
					$('.choixcaracts').removeAttr('style');//init
					//nouveau css sur l'onglet en cours
					ssmenu_encours.parent('.choixcaracts').css({'border-bottom':'none','height':'19px','z-index':'10'});
					ssmenu_encours.slideDown('fast');
					ssmenu_encours.find('.choixBit').each(function(){
						$(this).hover(
							function(){ $(this).css('background-color','#FEF3F7'); },
							function(){ $(this).css('background-color','#FFF'); }
						);
					});
					break;
				default :
					break;
			}
		};
		
		//Fonction permettant de cacher un sous-menu
		var cacherSousMenu = function(ssmenu_encours) {
			switch(conteneur_menu){
				case 'case_onglets' :
					ssmenu_encours.parents('.ongletBit').removeClass('ongletBit_over');
					ssmenu_encours.fadeOut('fast');
					ssmenu_encours.siblings('.cache_bordure').css({'display':'none'});
					break;
				case 'case_langues' :
					ssmenu_encours.slideUp('fast');
					break;
				case 'case_touteslescategs' :
					ssmenu_encours.slideUp('fast',function(){ $('.touteslescategs').removeClass('touteslescategs_over'); });
					
					break;
				case 'case_choixcaracts' :
					ssmenu_encours.slideUp('fast');
					break;
				default :
					break;
			}
			window.clearTimeout(timer);
		}
		
		return $elem_encours.each(function() {
			// Lorsque l'on entre dans le menu on déclenche un timer à retardement d'affichage
			$(this).find(menu).each( function() {//Parcourir chaque menu(ongletBit)
				$(this).mouseenter(function() {//survol du menu en cours
					var ssmenu_encours = $(this).find(ssmenu);//ssmenu encours
					if($.trim(ssmenu_encours.html())!=''){
						// On affiche le sous menu associé
						timer = window.setTimeout(function(){montrerSousmenu(ssmenu_encours)}, options.timer);
					}
				}).mouseleave(function(){
					var ssmenu_encours = $(this).find(ssmenu);
					switch(conteneur_menu){
						case 'case_onglets' :
							break;
						case 'case_langues' :
							break;
						case 'case_touteslescategs' :
							//$(this).removeAttr('style');
							break;
						case 'case_choixcaracts' :
							//nouveau css sur l'onglet en cours
							$(this).css({'border':'solid 1px #E51553','height':'18px','z-index':'10'});
							//$(this).find('.choixcaracts').removeAttr('style');
							break;
						default :
							break;
					}
					cacherSousMenu(ssmenu_encours);	
				});
			});
		});
	}
})(jQuery);
$(document).ready(function(){
	$('.ongletBit_sep:last').remove();
	var options={ timer : 1}
	$('.onglets').deroulerMenu(options,'.menu','.ssmenu','case_onglets');
	$('.langues').deroulerMenu(options,'.menu_langues','.ul_langues','case_langues');
	$('.recherche').deroulerMenu(options,'.touteslescategs','.ul_categs','case_touteslescategs');
	//$('.produit_caractBit').deroulerMenu(options,'.choixcaracts','.articleCaracteristique','case_choixcaracts');
});
/*FIN PLUGGIN POUR LES ONGLETS ************************************/



//LES UTILITAIRES POUR L'ENSEMBLE DES PAGES
(function($){
	$.fn.inclureUtilitaires = function(){
							   
		//BARRE DE NAVIGATION
		$('.navigation>h2:first-child>a').text('Accueil');//Remplacer "Robot Advance" par "Accueil"
		if($("#page_accueil").length>0){//Pour uniquement page accueil
			$(".navigation").empty().css({'height':'15px','border':'none','margin':'0'});
		}
		
		//Disposer des sous-rayons du menu déroulant par groupe de 4
		$('.ongletBit').each(function(){
			var indice=0;
			$(this).find('.li_niv1Bit').each(function(){
				++indice;
				if(indice==5) indice=1;
				$(this).addClass('li_niv1Bit'+indice);
				//niveau3
				$(this).find('.li_niv2Bit:gt(4)').remove();
				$(this).find('.li_plusdechoix').show();
			});
		});
		var $clear = $("<li class='clear'></li>");
		$clear.insertAfter('.li_niv1Bit4');
		
		//Disposer des sous-rayons du menu déroulant par groupe de 4
		var a=0;
		$('.articlemenuBit').each(function(){
			++a;
			if(a==2) a=1;
			$(this).addClass('articlemenuBit_'+a);
		});

		//Pour les liens instits
		if($(".menuinstit_sep").length!=0){
			var m = 0;
			$(".menuinstitBit").each(function(){
				++m;
				if(m==4) m=1;
				$(this).addClass("menuinstitBit_"+m);
			});
			var $clear_li = $("<li class='clear'></li>");
			$clear_li.insertAfter('.menuinstitBit_3');
		}
		
		///////////PAGE CATEGOTIE///////////
		//Pour les articles
		if($(".articles").length!=0){
			var k = 0;
			$(".articleBit").each(function(){
				++k;
				if(k==4) k=1;
				$(this).addClass("articleBit_"+k);
			});
		}
		
		///////////PAGE article///////////
		//pagination
		if($(".produitprec").length==0){
			$(".produitretour").css("text-align","left");
			$(".produitsuiv").css("border","none");
		}
		
		
		//Pagination produit
		if($('.produitprec').length==0 && $('.produitsuiv').length==0){
			$('.retrouraurayon').css({'background':'none 0 0', 'padding-left':'6px'});
		}else{
			if($('.produitprec').length>0 && $('.produitsuiv').length==0){
				$('.retrouraurayon').css({'float':'right','background':'none 0 0', 'padding':'0 6px 0 0'});
				$('.produitprec').css({'background':'none 0 0', 'padding-left':'6px'});
			}else{
				if($('.produitprec').length==0 && $('.article_suiv').length>0){
					$('.retrouraurayon').css({'background':'none 0 0', 'padding-left':'6px'});
					$('.article_suiv').css({'float':'right','background':'none 0 0', 'padding':'0 6px 0 0'});
				}
			}
		}
		//Images supplementaires
		if($(".produit_photos").length!=0){				   
			var tot_photoBit = $("#tot_photoBit").val();
			if(tot_photoBit<4){
				$(".defilementG_PHOTO, .defilementD_PHOTO").empty();
			}
		}else{
			$('.produit_partage').css('top','425px');//modif css des boutons addthis
			$('.produit_zoom').css('background','none 0 0');
		}
		
		////////PAGE PANIER////////////////
		//Pour les lignes panier
		$("tr.lignepanierbit:last td, .lignepanierbit_bis:last td").css("border-bottom","none");
		
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
						}
					}
				}
			});
			var $clear= $("<div class='clear'></div>");
			$clear.insertAfter(".rayonBit3");
			//css
			$('.rayonBit_niv1').children('a').wrapInner('<strong class="rose"></strong>')
		}
	}
})(jQuery);
$(document).ready(function(){
	$('#contenupage').inclureUtilitaires();
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

//Utile pour reinitialiser le thickbox "Guide de tailles"
(function($){
	$.fn.reinitPrety=function(){	  
		initPrety();	
		return this;
	}
})(jQuery);
$(document).ready(function(){
	if($('#contenuArticle').length!=0){
		$('#contenuArticle').reinitPrety();
	}
});

//Encart de recherche rapide et newsletter:
(function($){
	$.fn.rechercher = function(){
		$('.btn_okrech').click(function(){
			if($('.input_rech').val()=='Recherche rapide sur le site' && $('#rayonid').val()!=''){
				$('.input_rech').val('');
			}
			$('form[name=formu_rech]').submit();
		});
	}
})(jQuery);
$(document).ready(function(){
	$('.recherche').rechercher();
});


/****************************************/
/*Popup zoom image + infos tailles*/
/****************************************/
(function($){
	$.fn.zoomerArticle = function(){
		var $elem=$(this);//bit désigné
		return $elem.each(function(){
			$(this).find('.articleBit_ima').hover(
				function(){
					$(this).parent('.articleBit').css('z-index','10');
					if($(this).find('.zoomBit').css("display") == 'none') {
						$(this).find('.zoomBit').fadeIn('fast');
					}	
				},
				function(){
					$(this).parent('.articleBit').css('z-index','0');
					if($(this).find('.zoomBit').css("display") == 'block') {
						$(this).find('.zoomBit').fadeOut('fast');
					}
				}
			);
		});
	}
})(jQuery);
$(document).ready(function(){
	$('.articleBit').zoomerArticle();
});

/*--------CLASSEUR DOSSIERS PAGE PRODUIT--------------*/

function voirDossier1(){
	$(document).ready(function() {
		// On met à off tous les onglets dossier
		$('#dossier1, #dossier2, #dossier3').removeClass('dossier_open');
		 
		// On display:none le contenu de chaque dossier
		$('#dossier_content1, #dossier_content2, #dossier_content3').css('display','none');
		
		// On ouvre dossier1
		$('#dossier1').addClass('dossier_open');
		$('#dossier_content1').fadeIn('slow');
	});
}

function voirDossier2(){
	$(document).ready(function() {
		// On met à off tous les onglets dossier
		$('#dossier1, #dossier2, #dossier3').removeClass('dossier_open');
		 
		// On display:none le contenu de chaque dossier
		$('#dossier_content1, #dossier_content2, #dossier_content3').css('display','none');
		
		// On ouvre dossier1
		$('#dossier2').addClass('dossier_open');
		$('#dossier_content2').fadeIn('slow');
	});
}

function voirDossier3(){
	$(document).ready(function() {
		// On met à off tous les onglets dossier
		$('#dossier1, #dossier2, #dossier3').removeClass('dossier_open');
		 
		// On display:none le contenu de chaque dossier
		$('#dossier_content1, #dossier_content2, #dossier_content3').css('display','none');
		
		// On ouvre dossier1
		$('#dossier3').addClass('dossier_open');
		$('#dossier_content3').fadeIn('slow',function(){
			//Les articles complementaires
			var $carouselSelection = $(".selection_carrousel");
			if($carouselSelection){
				$carouselSelection.jCarouselLite({
					btnNext: ".btn_pageprec",
					btnPrev: ".btn_pagesuiv",
					auto:false,
					visible: 4,
					speed:2000,
					scroll: 1
				});
			}	
		});
	});
}

