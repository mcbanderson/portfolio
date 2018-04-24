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

	$(".background").parallax({ySpeed: 0.35});

	if($(window).scrollTop() < 10) {
		$('.navbar').addClass(' invis'); // adding the opaque class
		$('.icon-bar').addClass(' opaque');
	}
	$(window).scroll(function() {
		if($(this).scrollTop() < 10) {
			$('.navbar').addClass(' invis'); // adding the opaque class
			$('.icon-bar').addClass(' opaque');
		} else {
			$('.navbar').removeClass(' invis'); // removing the opaque class
			$('.icon-bar').removeClass(' opaque');
		}
	});
});

$(window).resize(function() {
	$(".overlay").height($(".portfolio").outerWidth());
});
