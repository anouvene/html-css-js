//RGB en HEXA
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 function hex(x) {
  return ('0' + parseInt(x).toString(16)).slice(-2);
 }
  return '#'+ hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

/*--------PANIER DEROULANT--------------*/
(function($){
	$.fn.montrerPanier = function(){
		$(this).mouseenter(function(){
			if($('#panier').is(':hidden')){
				$('#panier').slideDown('fast',function(){
					if($('.panierBit').length>3){
						$('.panier_content').css('margin-bottom','10px');
					}						  
				});
			}
		}).mouseleave(function(){
			$('#panier').slideUp('fast'); 
		});
	}
})(jQuery);
/*--------FIN PANIER DEROULANT--------------*/

//------------------ DEBUT PLUGGIN POUR LES ONGLETS
(function($) {
	$.fn.deroulerMenu = function(delai_ouverture, menu, conteneur_menu) {
		var onglet_encours = $(this);//onglet encours '.ongletBit_lib'
		// réinitialiser les durées d'affichage du menu
		var delai_encours = 0;
		
		//Fonction permettant de montrer un sous-menu
		var montrerMenu = function(menu_encours) {
			switch(conteneur_menu){
				case 'case_onglets' :
					onglet_encours.addClass('ongletBit_over');
					//Fermer le menu déroulant
					if($.trim(menu_encours.html())!=''){
						if(menu_encours.is(':hidden')){ menu_encours.show('fast'); }
					}
					break;
				default :
					break;
			}
		};
		
		//Fonction permettant de cacher un sous-menu
		var cacherMenu = function(menu_encours) {
			switch(conteneur_menu){
				case 'case_onglets' :
					onglet_encours.removeClass('ongletBit_over');
					//Fermer le menu déroulant
					$('.ongletsep_d').css({'height':'50px'});
					menu_encours.hide();
				default :
					break;
			}
			window.clearTimeout(delai_encours);
		}
		
		return onglet_encours.each(function() {//survol en cours : '.ongletBit'
			$(this).mouseenter(function() {
				switch(conteneur_menu){//cas des onglets uniquement
					case 'case_onglets' :
						var menu_encours = $(this).find(menu);//menu déroulant encours : '.menu'
						//retarder l'affichage du menu lors d'un survol trop rapide
						delai_encours = window.setTimeout(function(){montrerMenu(menu_encours)}, delai_ouverture.delai_val);
						break;
					default :
						break;
				}
			}).mouseleave(function(){
				var menu_encours = $(this).find(menu);//menu déroulant encours : '.menu'
				cacherMenu(menu_encours);
			});
		});
	}
})(jQuery);
$(document).ready(function(){
	$('.ongletBit:first').find('.ongletsep_g').css('background','none');
	var delai_ouverture={ delai_val : 150 };
	//nb de sous rayons
	var nb_ssrayons = 0;
	$('.ongletBit').each(function(){
		nb_ssrayons = $(this).find('.niv1Bit').size();
		if(nb_ssrayons>11){
			$('.niv1Bit:gt(10)').hide();
			$('.voirplus').show();
		}
		$(this).deroulerMenu(delai_ouverture,'.menu','case_onglets');
	});
	
});
/*FIN PLUGGIN POUR LES ONGLETS ************************************/

//Init carrousel
$(document).ready(function() {
   var carouselAmbiance = $('#conteneur').find(".carrousel");
   if(carouselAmbiance.length>0) {
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
			
			//btnPrev: ".btn_prev",
			//btnNext: ".btn_next",
			beforeStart: function(item) {
				var myId = item.attr("id");
				var myId_split = myId.split('_');
				var myLink = $('.btn_'+myId_split[1]);
				myLink.toggleClass('btn_'+myId_split[1]+'_over');
			},
			afterEnd: function(item) {
				var myId = item.attr("id");
				var myId_split = myId.split('_');
				var myLink = $('.btn_'+myId_split[1]);
				myLink.toggleClass('btn_'+myId_split[1]+'_over');
			}
		});
   }  
});

//LES UTILITAIRES POUR L'ENSEMBLE DES PAGES
(function($){
	$.fn.inclureUtilitaires = function(){
		///////HEADER//////////
		//Pour styler les select de recherche par région
        $('select.styled').customSelect();
		
		//BARRE DE NAVIGATION
		if($("#contenupage_accueil").length==0){//Pour uniquement page accueil
			$('.navigation_content').css('display','block');
			//$('.navigation_content>h2:first-child>a').text('Accueil');//Remplacer "ObonGout" par "Accueil"
		}
		
		///////////FOOTER : menu instit///////////
		//hover avec effet néon sur les liens instit
		$('.engagements a').each(function(){
			$(this).hover(function(){
				$(this).addClass('textShadow');									 
			},function(){
				$(this).removeClass('textShadow');									 
			});									 
		});

		///////////PAGE INDEX///////////
		//Pour les articles nos dernieres trouvailles
		if($(".nouveautes").find('.articleBit').length >=2){
			var n = 0;
			$(".nouveautes").find('.articleBit').each(function(){
				++n;
				if(n==4) n=1;
				$(this).addClass("articleBit_"+n);
			});
		}	
		
		///////////PAGE CONTENANT LES ARTICLES///////////
		//Pour les articles cdc
		if($(".cdc").find('.articleBit').length >=2){
			var c = 0;
			$(".cdc").find('.articleBit').each(function(){
				++c;
				if(c==4) c=1;
				$(this).addClass("articleBit_"+c);
			});
		}
		///////////PAGE CATEG///////////////////////////
		/*indexer les articles*/
		if($(".articles").find('.articleBit').length >=2){
			var a = 0;
			$(".articles").find('.articleBit').each(function(){
				++a;
				if(a==4) a=1;
				$(this).addClass("articleBit_"+a);
			});
		}
		//Pour styler les select articles par page
		if($("select.formuperpage").length>0){
			$('select.formuperpage').customSelect().change(function(){
				$(document).scrollTo('#resultats',800);
				$('#formuperpage').submit();
			});
		}
		if($("select.formuperpage2").length>0){
			$('select.formuperpage2').customSelect().change(function(){
				$(document).scrollTo('#resultats',800);
				$('#formuperpage2').submit();
			});
		}
		///////////PAGE ARTICLE///////////
		//Images supplementaires
		if($(".photoBit").length>0){
			var p=0;
			$('.photoBit').each(function(){
				++p;
				if(p==5) p=1;
				$(this).addClass('photoBit_'+p);
			});
		}
		
		//Pour les articles nos dernieres trouvailles
		if($(".articlesconseilles").find('.articleBit').length >=2){
			var n = 0;
			$(".articlesconseilles").find('.articleBit').each(function(){
				++n;
				if(n==4) n=1;
				$(this).addClass("articleBit_"+n);
			});
		}
		
		//Pour styler les select des caracts
		$('select.articleCaracteristique').customSelect();
		
		//hover avec effet néon sur les liens instit
		$('.bandeau_instit a>span').each(function(){
			$(this).hover(function(){
				$(this).addClass('textShadow2');									 
			},function(){
				$(this).removeClass('textShadow2');									 
			});									 
		});
				
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
			$('.rayonBit_niv1').children('a').wrapInner('<strong class="rose"></strong>')
		}
	}
})(jQuery);
$(document).ready(function(){
	$('#contenupage').inclureUtilitaires();
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
		$('#dossier_content1').css('display','block');
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
		$('#dossier_content2').css('display','block');
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
		$('#dossier_content3').css('display','block');
	});
}
