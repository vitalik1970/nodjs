// Global 
var a = 'active';



// no skroll

var block = $('<div>').css({'height':'50px','width':'50px'}),
	indicator = $('<div>').css({'height':'200px'});

$('body').append(block.append(indicator));
var w1 = $('div', block).innerWidth();    
block.css('overflow-y', 'scroll');
var w2 = $('div', block).innerWidth();
$(block).remove();

var scrollbar = w1 - w2;

$(':root').css('--scroll', scrollbar + 'px');



// Ready

$(document).ready(function () {

	// Slick slider

	if ($('.main_slider').length) {

		$('.main_slider').slick({
			arrows: false,
			dots: true,
			slidesToShow: 1,
			infinite: true,
			autoplay: true,
			fade: true,
			pauseOnHover: false,
			pauseOnFocus: false,
			customPaging : function(slider, index) {
				var cout = slider.slideCount,
					index = +index,
					id = ('0' + index );

				if (index == 0) {
					$('.main_slider').append('<div class="main_dots"></div>')
				}

				$('.main_dots').append('<label  class="main_dot" for="slick-slide-control' + id + '"></label>');

				if (index == 0) {
					$('.main_slider .main_dot').addClass(a);
				}

	            return '<button id="slick-slide-control' + id + '">' + (index + 1) + '/' + cout +'</button>';
	        }
		});

		$('.main_slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			var e = '.main_dot:eq(' + nextSlide + ')'
			$(e).addClass(a)
				.siblings().removeClass(a);
		});

		$('.main_dot').on('click', function () {
			$(this).addClass(a)
				.siblings().removeClass(a);
		});
	};

	if ($('.gallery').length) {
		$('.gallery').slick({
			arrows: true,
			dots: false,
			slidesToShow: 1,
			infinite: true,
			autoplay: true,
			fade: true,
			pauseOnHover: false,
			pauseOnFocus: false
		});
	};



	// Input fixed palceholder

	$(document).on('blur', '._input input:not([type=checkbox], [type=radio], [type=submit]), ._input textarea', function () {
		input_fixed_placeholder($(this), $(this).siblings('.input_palceholder'));
	})

	$(document).on('focus', '._input input:not([type=checkbox], [type=radio], [type=submit]), ._input textarea', function () {
		$(this).siblings('.input_palceholder').addClass(a);
	})



	// Data img

	if ($('[data-img]').length) {
		$('[data-img]').each(function () {
			data_img(this, $(this).attr('data-img'));
		});
	}



	// Header size

	header_size();



	// Scroll animation

	scroll_animation();
})



// Scroll

$(document).resize(function () {
	header_size();
})




/*
*			███████╗██╗░░░██╗███╗░░██╗░█████╗░░██████╗
*			██╔════╝██║░░░██║████╗░██║██╔══██╗██╔════╝
*			█████╗░░██║░░░██║██╔██╗██║██║░░╚═╝╚█████╗░
*			██╔══╝░░██║░░░██║██║╚████║██║░░██╗░╚═══██╗
*			██║░░░░░╚██████╔╝██║░╚███║╚█████╔╝██████╔╝
*			╚═╝░░░░░░╚═════╝░╚═╝░░╚══╝░╚════╝░╚═════╝░
*/




// Bar

function bar_toggle() {
	$('.bar_burger').toggleClass(a);
	$('.bar_wrapper').slideToggle();
	$('html').toggleClass('hidden');
}

function bar_close() {
	$('.bar_burger').removeClass(a);
	$('.bar_wrapper').slideUp();
	$('html').removeClass('hidden');
}



// Input fixed palceholder

function input_fixed_placeholder(e, b) {
	var input = e,
		palceholder = b;

	if (input.val().length > 0) {
		palceholder.addClass(a);
		input.addClass(a);
	} else {
		palceholder.removeClass(a);
		input.removeClass(a);
	}
}



// Data img

function data_img(e, img) {
	var src = '/images/';

	$(e).css('background-image', 'url(' + src + img + ')');
}



// Header size

function header_size() {
	$(':root').css('--header', $('.header').outerHeight() + 'px');
}




// Scroll animation

function scroll_animation() {
	const animItems = document.querySelectorAll('.__anim');

	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll);
		function animOnScroll() {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 4;

				let animItemPoint = window.innerHeight - animItemHeight - animStart;
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if (animItem.classList.contains('_wis')) {
					animItemPoint = animItemOffset - window.innerHeight + 100;
					if (pageYOffset > animItemPoint) {
						animItem.classList.add('_anim_act');
					} else {
						// animItem.classList.remove('anim_act');
					}
				} else {
					if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
						animItem.classList.add('_anim_act');
					} else {
						// animItem.classList.remove('anim_act');
					}
				}
			}
		}

		function offset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
				scrollTop = window.pageXOffset || document.documentElement.scrollTop;
			return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
		}
	};

	setTimeout(() => {
		animOnScroll();
	}, 500);
}