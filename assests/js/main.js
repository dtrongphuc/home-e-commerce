const one = document.querySelector.bind(document);
const all = document.querySelectorAll.bind(document);

let panelMenuHistory = [];
let panelMenuCurrent = 'mn1';

document.addEventListener('DOMContentLoaded', () => {
	// Format money
	all('.money').forEach((element) => {
		element.innerHTML = `$${element.innerHTML}.00`;
	});

	const stuckHeader = () => {
		let header = one('.desktop-header:not(.hidden)') || one('.mobile-header:not(.hidden)');
		let sticky = header.offsetTop;
		window.onscroll = () => {
			if(window.pageYOffset > sticky) {
				header.classList.add('stuck');
			} else {
				header.classList.remove('stuck');
			}
		}
	}

	stuckHeader();
	
	// Select product option
	all('.options__item').forEach(element => {
		element.onclick = () => {
			element.closest('.options').querySelector('.option-active')?.classList.remove('option-active');
			element.classList.add('option-active');
			let url = element.querySelector('.options__item-image')
						.style.backgroundImage.slice(4, -1).replace(/"/g, "");
			let img = element.closest('.product-item').querySelector('.product__item-image');
			img.src = url;
		}
	})

	// Mobile menu panel
	all('.panel-menu__item').forEach((element) => {
		element.onclick = (e) => {
			e.preventDefault();
			
			let panelSelect = element.querySelector('a').getAttribute('href').slice(1);

			one(`.${panelMenuCurrent}`).classList.add('hidden-to-left');
			one(`.${panelMenuCurrent}`).classList.add('hidden');
			
			one(`.${panelSelect}`).classList.add('show-to-left');
			one(`.${panelSelect}`).classList.remove('hidden');

			panelMenuHistory.push(panelMenuCurrent);
			panelMenuCurrent = panelSelect;
		}
	});

	all('.panel-menu__back').forEach(element => {
		element.onclick = () => {
			let panelSelect = panelMenuHistory.pop();

			one(`.${panelSelect}`).classList.add('show-to-right');
			one(`.${panelSelect}`).classList.remove('hidden');

			one(`.${panelMenuCurrent}`).classList.add('hidden-to-right');
			one(`.${panelMenuCurrent}`).classList.add('hidden');

			panelMenuCurrent = panelSelect;
		}
	})

	const closeNavAndModal = () => {
		let panelMenu = one('.panel-menu');
		let modal = one('.modal');

		panelMenu.style.transform = 'translate3d(-100%, 0, 0)';
		panelMenu.addEventListener('transitioned', () => {
			panelMenu.style.display = 'none';
		});
		
		modal.style.transform = 'translate3d(100%, 0, 0)';
		modal.style.opacity = '0';
		modal.addEventListener('transitioned', () => {
			modal.style.display = 'none';
		})
		
		panelMenuHistory = [];
		panelMenuCurrent = 'mn1';
	}

	one('.panel-menu__close').onclick = closeNavAndModal;
	one('.modal').onclick = closeNavAndModal;

	one('.mobile-menu').onclick = () => {
		let panelMenu = one('.panel-menu');
		let modal = one('.modal');

		panelMenu.style.display = 'block';
		panelMenu.style.transform = 'translate3d(0%, 0, 0)';
		
		modal.style.display = 'block';
		modal.style.transform = 'translate3d(0%, 0, 0)';
		modal.style.opacity = '1';
	};

	// Mobile footer collapse
	all('.mobile__footer-collapse').forEach(element => {
		element.onclick = () => {
			let contentElement = element.closest('.mobile__footer-item').querySelector('.mobile__footer-collapse-content ');
			if(contentElement.classList.contains('hidden')) {
				contentElement.classList.remove('hidden');
				element.querySelector('i').classList.replace('fa-plus', 'fa-minus');
			} else {
				contentElement.classList.add('hidden');
				element.querySelector('i').classList.replace('fa-minus', 'fa-plus');
			}
		}
	});
});
