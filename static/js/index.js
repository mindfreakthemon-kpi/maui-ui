function initCircles(circle_id, percents) {
	Circles.create({
		id:         document.getElementById(circle_id).id,
		percentage: percents,
		radius:     40,
		width:      2,
		number:     percents / 1,
		text:       '%',
		colors:     ['#C9FF97', '#72c02c'],
		duration:   2000,
	});
} 
