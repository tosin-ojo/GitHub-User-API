// Display smaller profile info on bigger out of view port
window.addEventListener("scroll", () => {
    const $bodyProfileImg = document.querySelector('.body__bottom__img__ctn')
    const $userProfile = document.querySelector('.body__top__left')
    var position = $bodyProfileImg.getBoundingClientRect();
    
	if(position.bottom < 0) {
		$userProfile.style.visibility = "visible"
		$userProfile.style.pointerEvents = "auto"
    } else {
		$userProfile.style.visibility = "hidden"
		$userProfile.style.pointerEvents = "none"
    }
})