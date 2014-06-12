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
	$('#number-of-nodes').slider({
        min: 1,
        max: 100,
        slide: function(event, ui) {
	        $('#number-of-nodes-value').text(ui.value);
	    }
	});
	$('#number-of-nodes-2').slider({
        min: 1,
        max: 500,
        slide: function(event, ui) {
	        $('#number-of-nodes-2-value').text(ui.value);
	    }
	});
	$('#available-memory').slider({
		min: 1024,
		max: 1024*1024,
		range: true,
		slide: function(event, ui) {
			$('#available-memory-value1').text(ui.values[0]);
			$('#available-memory-value2').text(ui.values[1]);
		}
	});
	$('#available-storage-share').slider({
		min: 1024,
		max: 1024*1024,
		range: true,
		slide: function(event, ui) {
			$('#available-storage-share-value1').text(ui.values[0]);
			$('#available-storage-share-value2').text(ui.values[1]);
		}
	});
	$('#available-memory-2').slider({
		min: 1024,
		max: 10*1024*1024,
		range: true,
		slide: function(event, ui) {
			$('#available-memory-2-value1').text(ui.values[0]);
			$('#available-memory-2-value2').text(ui.values[1]);
		}
	});
	$('#available-storage-share-2').slider({
		min: 1024,
		max: 10*1024*1024,
		range: true,
		slide: function(event, ui) {
			$('#available-storage-share-2-value1').text(ui.values[0]);
			$('#available-storage-share-2-value2').text(ui.values[1]);
		}
	});
	$('#time-out').slider({
		min: 0,
		max: 300,
		range: true,
		slide: function(event, ui) {
			$('#time-out-value1').text(ui.values[0]);
			$('#time-out-value2').text(ui.values[1]);
		}
	});
	$('#available-processor-share').slider({
		min: 5,
		max: 25,
		range: true,
		slide: function(event, ui) {
			$('#available-processor-share-value1').text(ui.values[0]);
			$('#available-processor-share-value2').text(ui.values[1]);
		}
	});
	$('#available-processor-share-2').slider({
		min: 5,
		max: 75,
		range: true,
		slide: function(event, ui) {
			$('#available-processor-share-2-value1').text(ui.values[0]);
			$('#available-processor-share-2-value2').text(ui.values[1]);
		}
	});
})
