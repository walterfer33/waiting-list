jQuery( document ).ready( function($){


	//When the page first loads, update the cart quantity, otherwise we're just displaying the cached value to logged out users
	function updateCartQuantity(){
		//console.log( 'ajaxurl: '+edd_scripts.ajaxurl );
		$.ajax({
		 type: "POST",
		 data: { action: 'get_edd_cart_quantity' },
		 dataType: "text",
		 url: edd_scripts.ajaxurl,
		 // xhrFields: {
			//  withCredentials: true
		 // },
		 success: function (response) {
			 //console.log(response);
			 $('span.edd-cart-quantity').text( response );
		 },
	 });
	}

	updateCartQuantity();


	var $product_switch, $product_tag;

	function gform_connect_license_selector( $product_switch , $product_tag ){
		$( '#input_3_11 input[name="input_11"]' ).on( 'change' , function(){
			$( '#input_3_6' ).val( $(this).val() );
		});

		gform_switch_product( $product_switch , $product_tag );
		$product_switch.on( 'change' , function(){
			gform_switch_product( $(this) , $product_tag );
		});
	}

	function gform_switch_product( $selectbox , $product_tag ){
		var pid = $selectbox.val();
		if( pid ){
			//Show Resource panel
			var $resources = $('.resources-block');
			$resources.removeClass( 'resource-highlight ss-animate' );
			$resources.filter( '[data-pid='+pid+']' ).addClass( 'resource-highlight ss-animate' );
		}

		//Fill hidden field with the Product Tag
		var $selected = $selectbox.find('option:selected');
		var product_tag = $selected.text();
		if( $selected.val() == 0 ) product_tag = '';
		else product_tag = product_tag.replace( ' Extension' , '' );

		$product_tag.val( product_tag );
	}



	//Pre-purchase form
	$product_switch = $( '#input_4_1' );
	if( $product_switch.size() ){
		$product_tag = $( '#input_4_5' );
		$(document).on( 'gform_post_render', function(){
			$product_switch = $( '#input_4_1' );
			$product_tag = $( '#input_4_5' );
			gform_switch_product( $product_switch , $product_tag );

			$product_switch.on( 'change' , function(){
				gform_switch_product( $(this) , $product_tag );
			});
		});
		$product_switch.on( 'change' , function(){
			gform_switch_product( $(this) , $product_tag );
		});

	}
	else{

		//Support form
		$( '#input_3_4' ).on( 'change' , function(){
			//console.log( 'change' );
			//if( $( '#input_3_1' ).val() == 1 ){
				check_for_ubermenu_guide( $(this) );
			//}
		});
		// $( '#input_3_4' ).on( 'blur' , function(){
		// 	//console.log( 'blur' );
		// 	//check_for_ubermenu_guide( $(this) );
		// });


		$product_switch = $( '#input_3_1' );
		if( $product_switch.size() ){

			$product_tag = $( '#input_3_12' );

			$(document).on( 'gform_post_render', function(){
				$product_switch = $( '#input_3_1' );
				$product_tag = $( '#input_3_12' );
				gform_connect_license_selector( $product_switch , $product_tag );
			});
			gform_connect_license_selector( $product_switch , $product_tag );

			var searched = false;

			$( '.page-template-page-help-php' ).on( 'change' , '#input_3_8' , function(){
				searched = false;
			});

			$( '.page-template-page-help-php' ).on( 'blur' , '#input_3_8' , function(){

				//Only for UberMenu
				if( $( '#input_3_1' ).val() != 1 ) return;

				if( searched ) return;

				var cse_query = $( this ).val();

				if( cse_query ){

					searched = true;


					var $field = $( '#field_3_8' );

					$field.append( '<div class="cse-results-loading"><i class="fa fa-refresh fa-spin fa-1x fa-fw margin-bottom"></i> Loading...</div>' );
					$field.find( '.cse-results' ).remove();



					$.get( 'https://www.googleapis.com/customsearch/v1',
						{
							'cx'	: '012195239863806736760:csnsnevlo9y',
							'key'	: 'AIzaSyBeATRw21Wdhh7TJ2KDQaa4cWvj4qmkNhM',
							'fields': 'kind,items(title,htmlTitle,formattedUrl,link,htmlSnippet,snippet,pagemap/cse_thumbnail)',
							'q'		: cse_query
						},
						function( data , status , jqxhr ){
							//console.log( data );

							if( data.hasOwnProperty( 'items' ) ){
								var html = '';

								var items = data.items;
								var item;
								for( var k = 0; k < items.length; k++ ){

									item = items[k];

									html+= '<div class="cse-result">';
									html+= '<a target="_blank" class="cse-result-link" href="'+item.link+'">';
									html+=		'<span class="cse-result-title">'+item.htmlTitle+'</span>';
									html+=		'<span class="cse-result-info">';
									if( item.hasOwnProperty( 'pagemap' ) && item.pagemap.hasOwnProperty( 'cse_thumbnail' ) ){
										html+=			'<span class="cse-result-image"><img src="'+item.pagemap.cse_thumbnail[0].src+'" /></span>';
									}
									html+=			'<span class="cse-result-url">'+item.link+'</span>';
									html+=			'<span class="cse-result-snippet">'+item.htmlSnippet+'</span>';
									html+=		'</span>';
									html+= '</a>';
									html+= '</div>';

								}

								html = '<div class="cse-results"><h4>Do any of these Knowledgebase articles answer your question? <i class="fa fa-thumb-tack cse-results-hide"></i></h4> '+html+'</div>';

								$field.append( html );

								$field.find( '.cse-results-hide' ).on( 'click', function(){
									$( '#field_3_8' ).find( '.cse-result' ).slideToggle();
								});
							}
							$field.find( '.cse-results-loading' ).remove();

						}
					);
				}
			});
		}
	}

	//$(".edd_price_options label").unwrap();
	$(".edd_price_options label").removeClass("selected");
	$(".edd_price_options label").on("click", function() {
		$(".edd_price_options label").removeClass("selected");
		$(this).addClass("selected");
	});
	//$(".edd_price_options input").prop("checked") &&
	$(".edd_price_options input:checked").parent().addClass("selected");

	var hash = window.location.hash;
	if( hash ){
		//console.log( window.location.hash );
		if( hash.indexOf( '#license' ) === 0 ){
			var license_id = 'edd_price_option_' + $( '#ss-purchase-block' ).data( 'edd-id' );
			var license = hash.substring( 9 );
			license_id = '#'+license_id + '_' + license;
			//console.log( license_id );
			$( license_id ).click(); //prop( 'checked' , true );
		}
	}


	$( '.ss-checkout-button' ).on( 'click' , function(e){
		e.preventDefault();
		$( '#edd_checkout_form_wrap' ).slideDown();

		var $target = $( '#edd_checkout_form_wrap' );
		if( $target.size() > 0 ){
			$( 'html,body' ).animate({
				scrollTop: $target.offset().top - 70
			}, 1000 );
			return false; //don't follow any links if this scroll target is present
		}

	});

	$( '#bbp_topic_title' ).unbind( 'keydown.editor-focus' );



	$( '.plop-inner' ).each( function(){
		$( this ).height( $(this).find( '.plop-header' ).outerHeight() + $(this).find( '.plop-content' ).outerHeight() );
	});

	$( '.plop-trigger' ).on( 'click' , function( e ){
		e.preventDefault();
		e.stopPropagation();

		var $target = $( '#plop-' + $( this ).data( 'plop-target' ) );

		if( !$target.hasClass( 'plop-active' ) ){
			$target.find( '.plop-inner' ).height( $target.find( '.plop-header' ).outerHeight() + $target.find( '.plop-content' ).outerHeight() );
		}
		$target.toggleClass( 'plop-active' );
	});

	$( '.plop' ).on( 'click' , function( e ){
		$( this ).removeClass( 'plop-active' );
	});
	$( '.plop' ).on( 'click' , '.plop-inner' , function( e ){
		e.stopPropagation();
	});












	//SUPPORT TICKET HELPERS
	// Accepts a url and a callback function to run.
	function requestCrossDomain( site ) {

	    // If no url was passed, exit.
	    if ( !site ) {
	        //alert('No site was passed.');
	        return false;
	    }

	    var xpath =  ' and xpath="/html/head/link[@rel=\'stylesheet\'][contains(@href,\'/wp-content/themes/\')]"';
	    var yql = '//query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + site + '"' + xpath ) + '&format=json&diagnostics=true'; //[contains(@href,\'/style.css\')]

	    $.getJSON( yql , ubermenu_guide_match );

	}

	function ubermenu_guide_match( data ){
		var style_css = '';
	    var guide = false;
	    if ( data.query.count > 1 ) {
	    	for( var k = 0; k < data.query.count; k++ ){
	    		style_css = data.query.results.link[k].href;
	    		guide = get_guide_from_url( style_css );
	    		if( guide ) break;
	    	}
	    	//style_css = data.query.results.link[0];
	    }
	    else if( data.query.count == 1 ){
	    	style_css = data.query.results.link.href;
	    	guide = get_guide_from_url( style_css );
	    	//console.log( guide );
	    }
	    else{
	    	//nada
	    	//$('body').append( 'No results for ' + site );
	    	//console.log( data.query.diagnostics );
	    	//console.log( data.query.diagnostics.url.error );
	    	return;
	    }

	    if( guide ){
	    	var msg = 'Looks like you\'re using ' + guide.title + '.  Please be sure to follow the <a target="_blank" href="'+guide.url+'">'+guide.title+' Integration Guide</a>';
	    	//$('body').append( msg );
	    	//console.log( msg );
	    	$( '#field_3_4' ).find( '.theme-guide-alert' ).remove();
	    	$( '#field_3_4' ).append( '<div class="theme-guide-alert"><p class="help-notice"><i class="help-notice-icon fa fa-lightbulb-o"></i> <span class="help-notice-text">' + msg + '</span></p></div>' );
	    }
	}

	function get_guide_from_url( url ){
		var split =  url.split(/\/+/g);
		//var theme_slug = split[split.length-2].toLowerCase();

		var found_wpcontent = false;
		var found_themes = false;
		var cur;
		var theme_slug;
		for( var k = 0; k < split.length; k++ ){
			cur = split[k];
			if( found_wpcontent && found_themes ){
				theme_slug = cur.toLowerCase();
				break;
			}
			else{
				if( cur == 'wp-content' ){
					found_wpcontent = true;
				}
				else if( cur == 'themes' ){
					found_themes = true;
				}
			}
		}

		//console.log( 'Theme: ' + theme_slug );

		if( themes.hasOwnProperty( theme_slug ) ){
		  	var guide_url = 'http://sevenspark.com/docs/ubermenu-3/theme-integration/'+theme_slug;
		   	//console.log( 'Guide: ' + guide_url );
		   	return { 'slug' : theme_slug , 'url' : guide_url , 'title' : themes[theme_slug] };
		   	//return '<a href="'+guide_url+'">'+themes[theme_slug]+'</a>';
		}
		return false;
	}

	function check_for_ubermenu_guide( $input ){

		//Clear old alert
		$( '#field_3_4' ).find( '.theme-guide-alert' ).remove();

		//Only for UberMenu
		if( $( '#input_3_1' ).val() != 1 ) return;
//console.log( 'go' );
		var url = $input.val();
		if( url ){
			requestCrossDomain( url );
		}
	}
});








// jQuery( 'document' ).ready( function(){
// 	$( 'form' ).on( 'submit' , function(e){
// 		e.preventDefault();
// 		var url = $('input.url').val();
// 		requestCrossDomain( url );
// 		return false;
// 	});
// });

var themes = {
"genesis" : "Genesis (StudioPress)",
"avada" : "Avada (ThemeFusion)",
"enfold" : "Enfold (Kriesi)",
"x" : "X Theme (Themeco)",
"canvas" : "Canvas (WooThemes)",
"headway" : "Headway",
"storefront" : "Storefront (WooThemes)",
"divi" : "Divi (ElegantThemes)",
"extra": "Extra (ElegantThemes)",
"salient" : "Salient (ThemeNectar)",
"jupiter" : "Jupiter (artbees)",
"kallyas" : "Kallyas (hogash)",
"striking" : "Striking (kaptinlin)",
"total" : "Total (WPExplorer)",
"listify" : "Listify (Astoundify)",
"jobify" : "Jobify (Astoundify)",
"builder" : "Builder (iThemes)",
"bb-theme" : "Beaver Builder Theme",
"thesis" : "Thesis (DIYThemes)",
"parallelus-themes-incentive-moxie-vellum" : "Parallelus themes ( Incentive, Moxie, Vellum )",
"jumpstart" : "JumpStart (ThemeBlvd)",
"kleo" : "Kleo (SeventhQueen)",
"fusion" : "Fusion (mysitemyway)",
"ultimatum" : "Ultimatum",
"ubermenu-pagelines-dms" : "PageLines DMS",
"directory" : "Directory (AIT)",
"javo-directory" : "Javo Directory (javothemes)",
"aaika" : "Aaika (King-Theme)",
"quadrum" : "Quadrum (Orange Themes)",
"centum" : "Centum (purethemes)",
"ronneby" : "Ronneby (DFDevelopment)",
"brixton" : "Brixton (gljivec)",
"klaus" : "Klaus (Bluxart)",
"modern" : "Modern (WebMan)",
"mobius" : "Mobius (SimpleThemes)",
"schema" : "Schema (MyThemeShop)",
"wpresidence" : "WP Residence (WP Estate)",
"colormag" : "ColorMag (ThemeGrill)",
"rttheme18" : "RT-Theme 18 (stmcan)",
"edwards" : "Edwards (WP for Church)",
"karma" : "Karma (TrueThemes)",
"bazar" : "Bazar (YIT)",
"mindig" : "Mindig (YIT)",
"boemia" : "Boemia (YIT)",
"xglobe" : "Globe (YIT)",
"customizr" : "Customizr (nikeo)",
"jarida" : "Jarida (TieLabs)",
"sahifa" : "Sahifa (TieLabs)",
"branchy" : "Branchy (TemplateMela)",
"zerif-pro" : "Zerif Pro (Themeisle)",
"novavideo" : "Novavideo ( WP-script)",
"roots" : "Roots",
"flatsome" : "Flatsome (UX Themes)",
"warp" : "Warp Framework (YooTheme)",
"atahualpa" : "Atahualpa",
};
