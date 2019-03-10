(function() {
    var container = document.querySelector( 'div.container' ),
        triggerBttn = document.getElementsByClassName( 'requestOpen' ),
        overlay = document.querySelector( 'div.overlay' ),
        closeBttn = overlay.querySelector( 'button.overlay-close' );
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
        support = { transitions : Modernizr.csstransitions };

    function toggleOverlay() {
        if( classie.has( overlay, 'open' ) ) {
            classie.remove( overlay, 'open' );
            classie.remove( container, 'overlay-open' );
            classie.add( overlay, 'close' );
            var onEndTransitionFn = function( ev ) {
                if( support.transitions ) {
                    if( ev.propertyName !== 'visibility' ) return;
                    this.removeEventListener( transEndEventName, onEndTransitionFn );
                }
                classie.remove( overlay, 'close' );
            };
            if( support.transitions ) {
                overlay.addEventListener( transEndEventName, onEndTransitionFn );
            }
            else {
                onEndTransitionFn();
            }
        }
        else if( !classie.has( overlay, 'close' ) ) {
            classie.add( overlay, 'open' );
            classie.add( container, 'overlay-open' );
        }
        return false;
    }

    for (var i = 0; i < triggerBttn.length; i++) {
        triggerBttn[i].addEventListener('click', toggleOverlay);
    }
    //triggerBttn.addEventListener( 'click', toggleOverlay );
    //$(".requestOpen").click(toggleOverlay);
    closeBttn.addEventListener( 'click', toggleOverlay );

})();
