$(document).ready( function() {
	var isotopeContainer = $('.isotopeContainer');
	if( !isotopeContainer.length || !jQuery().isotope ) return;
	var isotope = isotopeContainer.isotope({
		itemSelector: '.isotopeSelector'
	});
	$('.isotopeFilters').on( 'click', 'a', function(e) {
		$('.isotopeFilters').find('.active').removeClass('active');
		$(this).parent().addClass('active');
		var filterValue = $(this).attr('data-filter');
		isotopeContainer.isotope({ filter: filterValue });
		e.preventDefault();
	});

	$(".overlay").height($(".portfolio").outerWidth());

	$('.isotopeContainer').isotope('layout');
});

$(document).ready(function() {
    $(".background").parallax({ySpeed: 0.35, xStart: 50});
});

$(document).ready(function() {
    if($(window).scrollTop() < 10) {
        $('.navbar').addClass('invis');
    }
    $(window).scroll(function() {
        if($(this).scrollTop() < 10) {
            $('.navbar').addClass('invis');
        } else {
            $('.navbar').removeClass('invis');
        }
    });
    $('.navbar-nav .nav-item').click(function() {
        $('#menu').collapse('hide');
    });

    $('#menu').on('show.bs.collapse', function () {
        $('.navbar-dark .navbar-toggler-icon').css('background-image', "url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M 7,7 L 24,24 M 24,7 L 7,24'/%3E%3C/svg%3E\")");
    });
    $('#menu').on('hide.bs.collapse', function () {
        $('.navbar-dark .navbar-toggler-icon').css('background-image', "url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")");
    });
});

$(window).resize(function() {
	$(".overlay").height($(".portfolio").outerWidth());
});

$('.tagline').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

anime.timeline({loop: false})
    .add({
		targets: '#tagline .letter',
		opacity: [0,1],
		easing: "easeOutExpo",
		duration: 1200,
		delay: function(el, i) {
		  return 1000 + 40 * i;
		}
    })
	.add({
		targets: '#tagline2 .letter',
		translateX: [100,0],
		translateZ: 0,
		opacity: [0,1],
		easing: "easeOutExpo",
		duration: 1200,
		delay: function(el, i) {
		  return 20 * i;
		}
    })
	.add({
		targets: '#tagline3 .letter',
		translateX: [100,0],
		translateZ: 0,
		opacity: [0,1],
		easing: "easeOutExpo",
		duration: 1200,
		delay: function(el, i) {
		  return 20 * i;
		}
    });


$('.portTitle').each(function(index) {
    $(this).html($(this).text().replace(/([^\x00-\xff]|\w|\S)/g, "<span class='letter letter-" + index + "'>$&</span>"));
});

function hoverIn(number) {
	anime({
		targets: '.portTitle .letter-' + number,
		translateX: [40,0],
	    translateZ: 0,
	    opacity: [0,1],
	    easing: "easeOutExpo",
	    duration: 1200,
	    delay: function(el, i) {
	      return 15 * i;
	    }
	});
}

$('.overlay').each(function(index) {
	function tempIn(){
		hoverIn(index);
	}
	$(this).on('mouseenter', tempIn);
});

var scroll = new SmoothScroll('.smooth-scroll', {
	after: function(anchor, toggle) {
		document.activeElement.blur();
	}
});
