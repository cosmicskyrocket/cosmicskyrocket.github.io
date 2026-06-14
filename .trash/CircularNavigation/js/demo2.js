(function(){

	// Left Menu
	var button = document.getElementById('cn-button'),
    wrapper = document.getElementById('cn-wrapper');

    //open menu on hover
	button.addEventListener('mouseenter', openMenu, false);
	wrapper.addEventListener('mouseenter', openMenu, false);
	wrapper.addEventListener('mouseleave', closeMenu, false);

	function openMenu(){
	    button.innerHTML = "Close";
	    classie.add(wrapper, 'opened-nav');
	}
	
	function closeMenu(){
	    button.innerHTML = "Menu";
		classie.remove(wrapper, 'opened-nav');
	}

	// Right Menu
	var buttonRight = document.getElementById('cn-button-right'),
    wrapperRight = document.getElementById('cn-wrapper-right');

    //open menu on hover
	buttonRight.addEventListener('mouseenter', openMenuRight, false);
	wrapperRight.addEventListener('mouseenter', openMenuRight, false);
	wrapperRight.addEventListener('mouseleave', closeMenuRight, false);

	function openMenuRight(){
	    buttonRight.innerHTML = "Close";
	    classie.add(wrapperRight, 'opened-nav-right');
	}
	
	function closeMenuRight(){
	    buttonRight.innerHTML = "Menu 2";
		classie.remove(wrapperRight, 'opened-nav-right');
	}

})();
