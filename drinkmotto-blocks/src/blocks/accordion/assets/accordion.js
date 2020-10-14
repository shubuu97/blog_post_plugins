/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   Simple accordion pattern example
*/


Array.prototype.slice.call(document.querySelectorAll('.accordion-container')).forEach(function (accordion) {

	// Allow for multiple accordion sections to be expanded at the same time
	let allowMultiple = accordion.parentElement.hasAttribute('data-allow-multiple');
	// Allow for each toggle to both open and close individually
	let allowToggle = (allowMultiple) ? allowMultiple : accordion.parentElement.hasAttribute('data-allow-toggle');

	// Create the array of toggle elements for the accordion group
	let triggers = Array.prototype.slice.call(accordion.querySelectorAll('.accordion-trigger'));
	let panels = Array.prototype.slice.call(accordion.querySelectorAll('.accordion-panel'));

	accordion.addEventListener('click', function (event) {
		let target = event.target;

		if (target.classList.contains('accordion-trigger')) {
			// Check if the current toggle is expanded.
			let isExpanded = target.getAttribute('aria-expanded') === true;
			let active = accordion.querySelector('[aria-expanded="true"]');

			// without allowMultiple, close the open accordion
			if (!allowMultiple && active && active !== target) {
				// Set the expanded state on the triggering element
				active.setAttribute('aria-expanded', 'false');
				// Hide the accordion sections, using aria-controls to specify the desired section
				document.getElementById(active.getAttribute('aria-controls')).setAttribute('hidden', '');

				// When toggling is not allowed, clean up disabled state
				if (!allowToggle) {
					active.removeAttribute('aria-disabled');
				}
			}

			if (!isExpanded) {
				// Set the expanded state on the triggering element
				target.setAttribute('aria-expanded', 'true');
				// Hide the accordion sections, using aria-controls to specify the desired section
				document.getElementById(target.getAttribute('aria-controls')).removeAttribute('hidden');

				// If toggling is not allowed, set disabled state on trigger
				if (!allowToggle) {
					target.setAttribute('aria-disabled', 'true');
				}
			}
			else if (allowToggle && isExpanded) {
				// Set the expanded state on the triggering element
				target.setAttribute('aria-expanded', 'false');
				// Hide the accordion sections, using aria-controls to specify the desired section
				document.getElementById(target.getAttribute('aria-controls')).setAttribute('hidden', '');
			}

			event.preventDefault();
		}
	});

	// Bind keyboard behaviors on the main accordion container
	accordion.addEventListener('keydown', function (event) {
		let target = event.target;
		let key = event.which.toString();

		let isExpanded = target.getAttribute('aria-expanded') == 'true';
		let allowToggle = (allowMultiple) ? allowMultiple : accordion.hasAttribute('data-allow-toggle');

		// 33 = Page Up, 34 = Page Down
		let ctrlModifier = (event.ctrlKey && key.match(/33|34/));

		// Is this coming from an accordion header?
		if (target.classList.contains('accordion-trigger')) {
			// Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
			// 38 = Up, 40 = Down
			if (key.match(/38|40/) || ctrlModifier) {
				let index = triggers.indexOf(target);
				let direction = (key.match(/34|40/)) ? 1 : -1;
				let length = triggers.length;
				let newIndex = (index + length + direction) % length;

				triggers[newIndex].focus();

				event.preventDefault();
			}
			else if (key.match(/35|36/)) {
				// 35 = End, 36 = Home keyboard operations
				switch (key) {
					// Go to first accordion
					case '36':
						triggers[0].focus();
						break;
					// Go to last accordion
					case '35':
						triggers[triggers.length - 1].focus();
						break;
				}
				event.preventDefault();

			}

		}
	});

	// These are used to style the accordion when one of the buttons has focus
	accordion.querySelectorAll('.accordion-trigger').forEach(function (trigger) {

		trigger.addEventListener('focus', function (event) {
			accordion.classList.add('focus');
		});

		trigger.addEventListener('blur', function (event) {
			accordion.classList.remove('focus');
		});

	});

	// Minor setup: will set disabled state, via aria-disabled, to an
	// expanded/ active accordion which is not allowed to be toggled close
	if (!allowToggle) {
		// Get the first expanded/ active accordion
		let expanded = accordion.querySelector('[aria-expanded="true"]');

		// If an expanded/ active accordion is found, disable
		if (expanded) {
			expanded.setAttribute('aria-disabled', 'true');
		}
	}

	jQuery('.accordion .accordion-panel').attr('hidden', 'true');

});


jQuery(document).ready(function( $ ) {
	$('.accordion-container').append('<div class="accordion-image-container"></div>');

	$('.accordion').each(function(){
		$(this).find('img').clone().appendTo('.accordion-image-container');
		$(this).find('img').remove();
	});

	$('.accordion:first .accordion-panel').removeAttr('hidden');
	$('.accordion:not(:first) .accordion__heading button').attr('aria-expanded','false');
});


