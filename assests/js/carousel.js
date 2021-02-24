document.addEventListener('DOMContentLoaded', () => {
	const headerSlider = tns({
		container: '.swiper-wrapper',
		controlsContainer: '.control-slider',
		items: 3,
		slideBy: 'page',
		autoplay: false,
		rewind: true,
		gutter: 30,
		mouseDrag: true,
	});


	$('.main__slide-show').slick({
		prevArrow: $('.main__slider--prev'),
		nextArrow: $('.main__slider--next'),
		infinite: true,
		slidesToShow: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		fade: true,
		dots: true,
	});
});
