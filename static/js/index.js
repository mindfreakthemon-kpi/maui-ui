function initCircles(circle_id, percent) {
	Circles.create({
		id:         document.getElementById(circle_id).id,
		percentage: percent,
		radius:     40,
		width:      2,
		number:     percent / 1,
		text:       '%',
		colors:     ['#C9FF97', '#72c02c'],
		duration:   2000,
	});
}



jQuery(document).ready(function() {
	$('.pie-progress-charts').each(function() {
		initCircles($(this).data('id'), $(this).data('percent'));
	})
	$('#slider2').slider({
		min: 0,
		max: 100,
		range: true,
		values: [15, 65],
		slide: function(event, ui) {
			$('#slider2-value1').text(ui.values[0]);
			$('#slider2-value2').text(ui.values[1]);
		}
	});
})
