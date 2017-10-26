// jQuery
$(function() {

	// Create slug text
	function slug(str) {
		var $slug = '';
		var trimmed = $.trim(str);
		$slug = trimmed.replace(/[^a-z0-9-]/gi, '-').
		replace(/-+/g, '-').
		replace(/^-|-$/g, '');
		return $slug.toLowerCase();
	}

	// Table of Contents
	var ToC =
		"<nav class='index-links'>" +
			"<h2>On this page</h2>" +
			"<ol>";
	var newLine, el, title, link;
	$("body > .container h1:not(.CoT-ignore)").each(function() {
		el = $(this);
		title = el.text();
		link = slug(title);
		$(this).attr('id', link);
		link = "#" + link;
		newLine =
			"<li>" +
				"<a href='" + link + "'>" +
					title +
				"</a>" +
			"</li>";
		ToC += newLine;
	});
	ToC +=
		"</ol>" +
		"</nav>";
	$(".demo-ToC").prepend(ToC);


	// Smooth Scrolling
	$('a[href*=\\#]:not([href=\\#]):not(.panel-title):not(.carousel-control)').click(function() {
		$('.anchorHighlight').removeClass('anchorHighlight');
		if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top - 10
				}, 500);
				$('#' + this.hash.slice(1)).parent().addClass('anchorHighlight');
				return false;
			}
		}
	});


	// Popovers
	$(function () {
		// If you don't want to have to add extra markup and just use title attr:
		$('[title]').each(function() {
			$(this).attr('data-toggle', 'tooltip');
			$(this).attr('data-placement', 'top');
		});

		// Use Bootstrap tooltips/popovers
		$('[data-toggle=popover]').popover()
			.focus(function () { $(this).trigger('mouseover'); })
			.blur(function () { $(this).trigger('mouseout'); });
		$('[data-toggle=tooltip]').tooltip();
	});

}); // end jQuery ('$(function()..')
