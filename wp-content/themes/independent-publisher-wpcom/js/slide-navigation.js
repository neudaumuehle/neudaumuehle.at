/**
 * slide-navigation.js
 *
 * Handles toggling the slide navigation menu.
 */
( function( $ ) {
	var $body, button, proxyButton, container, firstMenuItem;

	button = $( '#slide-menu-toggle' );

	if ( ! button.length ) {
		return;
	}

	$body         = $( document.body );
	container     = $( '#slide-menu' );
	proxyButton   = container.find( '.menu-toggle' );
	firstMenuItem = container.find( '.main-slide-navigation > .menu > li:first-child > a' );

	button.bind( {
		// Focus navigation on button's blur event.
		'keydown.independent-publisher': function( e ) {
			if ( 9 === e.keyCode && ! e.shiftKey ) {
				if ( 'true' === button.attr( 'aria-expanded' ) ) {
					firstMenuItem.focus();
					e.preventDefault();
				}
			} else if ( 32 === e.keyCode ) {
				button.trigger( 'click.independent-publisher' );
				e.preventDefault();
			}
		},

		// Expand slide menu on click event.
		'click.independent-publisher': function( e ) {
			$body.toggleClass( 'slide-menu-expanded' );
			if ( 'false' === button.attr( 'aria-expanded' ) ) {
				button
					.add( container )
					.add( proxyButton )
					.attr( 'aria-expanded', 'true' );
			} else {
				button
					.add( container )
					.add( proxyButton )
					.attr( 'aria-expanded', 'false' );

			}
			e.preventDefault();

			// Prevents Customizer from reloading when button is clicked
			e.stopPropagation();
		}
	} );

	// Focus button on SHIFT + Tab when focusing first menu item.
	firstMenuItem.bind( 'keydown.independent-publisher', function( e ) {
		if ( 9 === e.keyCode && e.shiftKey ) {
			button.focus();
			e.preventDefault();
		}
	} );

	// Forward click event of proxy button to real button.
	proxyButton.bind( 'click.independent-publisher', function( e ) {
		button.trigger( 'click.independent-publisher' );
		e.preventDefault();
	} );
} )( jQuery );