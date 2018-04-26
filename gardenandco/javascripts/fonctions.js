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
		var onglet_encours = $(this);//onglet encours '.ongletBit_lib>a'
		// réinitialiser les durées d'affichage du menu
		var delai_encours = 0;
		
		//Fonction permettant de montrer un sous-menu
		var montrerMenu = function(menu_encours) {
			switch(conteneur_menu){
				case 'case_onglets' :
					if(menu_encours.is(':hidden')){
						onglet_encours.addClass('ongletBit_lib_over');
						//Enlever les traits de séparation à gauche et à droite
						onglet_encours.parents('.ongletBit').prev('td').css('background','none');
						onglet_encours.parents('.ongletBit').addClass('ongletBit_over');
						//Fermer le menu déroulant
						if($.trim(menu_encours.html())!=''){
							menu_encours.show();
						}else{
							return false;
						}
					};
					break;
				default :
					menu_encours.show();
					break;
			}
		};
		
		//Fonction permettant de cacher un sous-menu
		var cacherMenu = function(menu_encours) {
			switch(conteneur_menu){
				case 'case_onglets' :
					menu_encours.hide('fast',function(){
						//désactiver l'etat over 
						$(this).siblings('h2').find('.ongletBit_lib').removeClass('ongletBit_lib_over');
						//remettre les traits de séparation à gauche et à droite
						onglet_encours.parents('.ongletBit').prev('td').removeAttr('style');
						$(this).parent('.ongletBit').removeClass('ongletBit_over');
					});
					break;
				default :
					menu_encours.hide();
					break;
			}
			window.clearTimeout(delai_encours);
		}
		
		return onglet_encours.each(function() {//survol en cours : '.ongletBit_lib>a'
			$(this).mouseenter(function() {
				switch(conteneur_menu){//cas des onglets uniquement
					case 'case_onglets' :
						var menu_encours = $(this).parents('.ongletBit').find(menu);//menu déroulant encours : '.menu'
						//retarder l'affichage du menu lors d'un survol trop rapide
						delai_encours = window.setTimeout(function(){montrerMenu(menu_encours)}, delai_ouverture.delai_val);
						break;
					default :
						//retarder l'affichage du menu lors d'un survol trop rapide
						delai_encours = window.setTimeout(function(){montrerMenu(menu_encours)}, delai_ouverture.delai_val);
						break;
				}
			});
			$(this).parents('.ongletBit').mouseleave(function(){//quitter onglet en cours :'.ongletBit'
				var menu_encours = $(this).find(menu);//menu déroulant encours : '.menu'
				cacherMenu(menu_encours);
			});
		});
	}
})(jQuery);
$(document).ready(function(){
	var delai_ouverture={ delai_val : 1 };
	$('.ongletBit').each(function(){
		//modif css : 
		/*if($.trim($(this).find('.menu').html())!=''){
			$(this).find('.niv1Bit:odd:last, .niv1Bit:even:last').css('margin','0 0 0 32px')
		}*/
		$(this).find('.ongletBit_lib').deroulerMenu(delai_ouverture,'.menu','case_onglets');
	});
	
});

/*FIN PLUGGIN POUR LES ONGLETS ************************************/

//LES UTILITAIRES POUR L'ENSEMBLE DES PAGES
(function($){
	$.fn.inclureUtilitaires = function(){
		//Pour l'image du carrousel et celle des autres pages
		var ecran_h_mini = $(window).width();//mini 948px
		if(ecran_h_mini < 2000 ){
			$('body').css('overflow-x','hidden');
		}else{
			$('body').removeAttr('style');
		}
		$(window).resize(function(){
			var ecran_h_mini = $(window).width();//948px
			if(ecran_h_mini < 948){
				$('body').removeAttr('style');
			}else{
				$('body').css('overflow-x','hidden');
			}
		});

		//BARRE DE NAVIGATION
		$('.navigation>h2:first-child>a').text('Accueil');//Remplacer "United Power" par "Accueil"
		if($("#contenupage_accueil").length>0){//Pour uniquement page accueil
			$('.navigation').empty().css('height','14px');
			
			//les sous rayons
			if($('.rayonIndexBit').length>0 ){
				$('.rayonIndexBit:odd').css('float','right');
			}
			
		}else{
			$('#footer').find('.liens_instit').css('display','block');
		}
		
		///////////FOOTER : menu instit///////////
		$(".voir_menuinstit").toggle(function(){
		   $(this).find("img").attr('src','images/btn_menuinstit_on.jpg');
		   $('.rayonIndexBit_desc, .bloc_centre').slideUp();
		   $('.menuinstit_h').css('background','url(images/menuinstit_h.jpg) no-repeat');
		   $('.menuinstit_m, .menuinstit_b').slideDown('fast',function(){
			 	$(document).scrollTo('#bottom',800);
			});
		 },function(){
		   $(this).find("img").attr('src','images/btn_menuinstit.jpg');
		   $('.rayonIndexBit_desc, .bloc_centre').slideDown();
		   $('.menuinstit_h').removeAttr('style');
		   $('.menuinstit_m').slideUp();
		   $('.menuinstit_b').slideUp();
		   $(document).scrollTo('#top',800);
		 });
		
		
		///////////PAGE INDEX///////////
		//Zoom sur ...
		if($(".nouveauteBit").length>0){
			var n=0;
			$('.nouveauteBit').each(function(){
				++n;
				if(n==4) n=1;
				$(this).addClass('nouveauteBit_'+n);
			});
		}	
		
		///////////PAGE CATEGOTIE///////////
		//Pour les articles
		if($(".articleBit").length >=2){
			var a = 0;
			$(".articles").find('.articleBit').each(function(){
				++a;
				if(a==4) a=1;
				$(this).addClass("articleBit_"+a);
				$(this).hover(
					function(){
						$(this).find('.loupe_details').animate({'top':'0'},150,function(){
							$(this).siblings('table').find('.articleBit_lib>h3>a, .articleBit_prix').css('color','#b55c03');
						});
						return false;
					},function(){
						$(this).find('.loupe_details').animate({'top':'-203px'},150,function(){
							$(this).siblings('table').find('.articleBit_lib>h3>a, .articleBit_prix').css('color','#a3a3a3');
						});
						return false;
					}
				);
			});
		}
		
		///////////PAGE ARTICLE///////////
		//Images supplementaires
		if($(".photoBit").length>0){
			var p=0;
			$('.photoBit').each(function(){
				++p;
				if(p==4) p=1;
				$(this).addClass('photoBit_'+p);
			});
		}
		
		//Articles internautes
		if($(".internauteBit").length>0){
			var c=0;
			$('.internauteBit').each(function(){
				++c;
				if(c==5) c=1;
				$(this).addClass('internauteBit_'+c);
			});
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
			$('.rayonBit_niv1').children('a').wrapInner('<strong class="vert"></strong>')
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
