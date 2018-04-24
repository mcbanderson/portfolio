$(document).ready( function() {
	$(".overlay").height($(".portfolio").outerWidth());

	var isotopeContainer = $('.isotopeContainer');
	if( !isotopeContainer.length || !jQuery().isotope ) return;
	isotopeContainer.isotope({
		itemSelector: '.isotopeSelector'
	});
	$('.isotopeFilters').on( 'click', 'a', function(e) {
		$('.isotopeFilters').find('.active').removeClass('active');
		$(this).parent().addClass('active');
		var filterValue = $(this).attr('data-filter');
		isotopeContainer.isotope({ filter: filterValue });
		e.preventDefault();
	});

	$(".background").parallax({ySpeed: 0.35, xStart: 50});

	if($(window).scrollTop() < 10) {
		$('.navbar').addClass(' invis'); // adding the opaque class
	}
	$(window).scroll(function() {
		if($(this).scrollTop() < 10) {
			$('.navbar').addClass(' invis'); // adding the opaque class
		} else {
			$('.navbar').removeClass(' invis'); // removing the opaque class
		}
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
		translateX: [100,0],
		translateZ: 0,
		opacity: [0,1],
		easing: "easeOutExpo",
		duration: 1200,
		delay: function(el, i) {
		  return 1000 + 20 * i;
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
