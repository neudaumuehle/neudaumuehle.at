/**
 * Theme functions file.
 */

( function( $ ) {
	// Closure variables.
	var $window = $( window );
	var $body   = $( document.body );

	// Fades the post cover metadata and master logo.
	$( '#post-cover-image' ).each( function( i, node ) {
		var $cover = $( node );
		var $meta  = $( '.cover-meta', node );

		var updateScroll = function() {
			$meta.stop().css( 'opacity', 1 - ( $window.scrollTop() / $cover.outerHeight() ) );
		}

		$window
			.resize( updateScroll )
			.scroll( updateScroll )
			.trigger( 'scroll' );
	} );

	// Relocate #secondary into footer on mobile.
	$( '#secondary' ).each( function( i, node ) {
		var footer        = $( '#colophon' );
		var sidebar       = $( node );
		var sidebarParent = sidebar.parent();

		$window.resize( function(  ) {
			if ( $window.outerWidth() < 992 ) {
				if ( ! sidebar.parent().is( footer ) ) {
					sidebar
						.removeAttr( 'id' )
						.prependTo( footer );
				}
			} else {
				if ( sidebar.parent().is( footer ) ) {
					sidebar
						.attr( 'id', 'secondary' )
						.appendTo( sidebarParent );
				}
			}
		} ).trigger( 'resize' );
	} );

	// Fix focus outline from wp-image links.
	$( 'img[class*="wp-image-"]', '.entry-content' ).parent().addClass( 'fix-link-focus' );

	// Remove extra margin added by empty geo post elements.
	$( '.entry-content > .geo-post:not(:visible):last-child' ).prev().css( 'margin-bottom', '0' );
} )( jQuery );