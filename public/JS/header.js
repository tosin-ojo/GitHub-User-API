const $headerSearch = document.querySelector('.header__search')
const $headerBanner = document.querySelector('.header__banner')
const $statusModalDetails = document.querySelector('.status__modal__details')
const $profileDirectoryNavs = document.querySelector('.header__directories')
const $profileSettingsNavs = document.querySelector('.header__settings')
const $profileLoginNavs = document.querySelector('.header__login')
const $featureDetails = document.querySelector('.feature__details')
const $featureWarning = document.querySelector('.feature__body__info')
const $featureVisible = document.querySelector('.feature__visible')
const $featureInvisible = document.querySelector('.feature__invisible')
const $statusOpenBtn = document.querySelector('.body__user__status__btn')
const $featureOpenBtn = document.querySelector('#feature__button')
const $statusOpenNav = document.querySelector('#header__status__button')
const $menuButton = document.querySelector('#menu_btn')
const $addDetails = document.querySelector('#header__add__details')
const $profileDetails = document.querySelector('#header__profile__details')
const $focusInput = document.querySelector('#input__focus')
const $addNavs = document.querySelector('#header__add__details__nav')
const $statusForm = document.querySelector('#status__form')
const $setStatus = document.querySelector('#header__status__details')
const $closeStatus = document.querySelector('#close__status__modal')
const $checkBoxValue = document.querySelector('#status__checkbox')
const $setStatusBtn = document.querySelector('#set__status__button')
const $clearStatusBtn = document.querySelector('#clear__status__button')
const $statusTimeout = document.querySelector('#clear__status__options')
const $statusNever = document.querySelector('#status__option__never')
const $status30Min = document.querySelector('#status__option__30min')
const $status1Hr = document.querySelector('#status__option__1hr')
const $status4Hrs = document.querySelector('#status__option__4hrs')
const $statusToday = document.querySelector('#status__option__today')
const $statusweek = document.querySelector('#status__option__week')
const $statusSuggestions = document.querySelector('#modal__suggestions')
const $suggestionVacation = document.querySelector('#suggestion__vacation')
const $suggestionSick = document.querySelector('#suggestion__sick')
const $suggestionHome = document.querySelector('#suggestion__home')
const $suggestionFocus = document.querySelector('#suggestion__focus')
const $closeFeatureDetails = document.querySelector('#feature__details__close')
const $enableFeature = document.querySelector('#feature__enable__btn')
const $inputValue = document.querySelector('#status__input')
let isBannerVisible = false
let isSuggestionsOpen = false
let suggestionSelected = false
let featureEnable = true

// Close feature details
$closeFeatureDetails.addEventListener('click', () => $featureDetails.removeAttribute('open'))

// Enable feature toggle actions
$enableFeature.addEventListener('click', () => {
    if(featureEnable) {
        $enableFeature.innerHTML = 'Enable'
        $featureVisible.style.display = 'none'
        $featureInvisible.style.display = 'inline-block'
        $featureWarning.style.display = 'block'
        featureEnable = false
    } else {
        $enableFeature.innerHTML = 'Disable'
        $featureVisible.style.display = 'inline-block'
        $featureInvisible.style.display = 'none'
        $featureWarning.style.display = 'none'
        featureEnable = true
    }
})

// Open feature modal from nav
$featureOpenBtn.addEventListener('click', e => $featureDetails.setAttribute('open', 'open'))

// Close status modal and rest form on overlay clicked
$setStatus.addEventListener('click', (e) => {
    if(e.target.tagName === 'SUMMARY' && 
      !(e.target.classList.contains('status__modal__summary'))) {
        $setStatus.removeAttribute("open")
        $statusForm.reset()
        suggestionsAction(e, 'smile')
    }
})

// Status close icon event
$closeStatus.addEventListener('click', e =>  {
    e.preventDefault()
    $setStatus.removeAttribute("open")
    $statusForm.reset()
    suggestionsAction(e, 'smile')
})

// Status form action buttons
$setStatusBtn.addEventListener('click', e => statusBtnAction(e))
$clearStatusBtn.addEventListener('click', e => statusBtnAction(e))

// Close status clearout
$statusForm.addEventListener('click', () => $statusModalDetails.removeAttribute("open"))

// Status clear out options actions
$statusNever.addEventListener('click', e => setStatusTimeout(e, 'never'))
$status30Min.addEventListener('click', e => setStatusTimeout(e, '30mins'))
$status1Hr.addEventListener('click', e => setStatusTimeout(e, '1hr'))
$status4Hrs.addEventListener('click', e => setStatusTimeout(e, '4hrs'))
$statusToday.addEventListener('click', e => setStatusTimeout(e, 'today'))
$statusweek.addEventListener('click', e => setStatusTimeout(e, 'week'))

// Suggestions selections actions
$suggestionVacation.addEventListener('click', e => suggestionsAction(e, 'vacation'))
$suggestionSick.addEventListener('click', e => suggestionsAction(e, 'sick'))
$suggestionHome.addEventListener('click', e => suggestionsAction(e, 'home'))
$suggestionFocus.addEventListener('click', e => suggestionsAction(e, 'focus'))

// Status checkbox control
$checkBoxValue.addEventListener('change', () => {
    if(!($checkBoxValue.checked) && isSuggestionsOpen && !suggestionSelected) {
        $statusSuggestions.style.height = '98px';
        $statusSuggestions.style.opacity = '1';
    }
    if($checkBoxValue.checked && !suggestionSelected) {
        document.querySelector('#status__input').value = 'I may be slow to respond'
        $setStatusBtn.disabled = false
        $clearStatusBtn.disabled = false
        isSuggestionsOpen = true
        $statusSuggestions.style.height = '0';
        $statusSuggestions.style.opacity = '0';
    }
    if(!($checkBoxValue.checked) && !suggestionSelected) {
        document.querySelector('#status__input').value = ''
        $setStatusBtn.disabled = true
        $clearStatusBtn.disabled = true
    }
})

// Close suggestions on input change in status update
$inputValue.addEventListener('keyup', e => {
    if(e.target.value !== '') {
        $statusSuggestions.style.height = '0';
        $statusSuggestions.style.opacity = '0';
    } else {
        $statusSuggestions.style.height = '98px';
        $statusSuggestions.style.opacity = '1';
    }
})

// Open suggestions on input focus in status update
$inputValue.addEventListener('focus', () => {
    $statusSuggestions.style.height = '98px';
    $statusSuggestions.style.opacity = '1';
})

// Open status modal from profile picture
$statusOpenBtn?.addEventListener('click', e => {
    $setStatus.setAttribute('open', 'open')
    $statusModalDetails.removeAttribute("open")
    suggestionSelected = false
})

// Open status modal from nav
$statusOpenNav.addEventListener('click', e => {
    $setStatus.setAttribute('open', 'open')
    $statusModalDetails.removeAttribute("open")
    suggestionSelected = false
})

// Close profile details on clicking some of its nav
$profileDirectoryNavs.addEventListener('click', () => $profileDetails.removeAttribute("open"))
$profileSettingsNavs.addEventListener('click', () => $profileDetails.removeAttribute("open"))
$profileLoginNavs.addEventListener('click', () => $profileDetails.removeAttribute("open"))

// Close add details on clicking any of its nav
$addNavs.addEventListener('click', () => $addDetails.removeAttribute("open"))

// Expand search input field on focus
$focusInput.addEventListener('focus', () => {
    $headerSearch.style.flex = '0.705'
    $headerSearch.style.maxWidth = '100%'
})

// Adjust search input to original width on blur
$focusInput.addEventListener('blur', () => {
    $headerSearch.style.flex = ''
    $headerSearch.style.maxWidth = ''
})

// Opening and closing of header banner
$menuButton.addEventListener("click", () => {
    if(!isBannerVisible) {
        isBannerVisible = true
        $headerBanner.style.display = 'flex'
    } else {
        isBannerVisible = false
        $headerBanner.style.display = 'none'
    }
})

// Display small device header banner at 767
window.addEventListener('resize', () => {
    if(window.innerWidth > 767) {
        $headerBanner.style.display = 'none'
    }
})

// Status clear action timeout helper
const setStatusTimeout = (e, timeout) => {
    e.preventDefault()
    switch(timeout) {
        case 'never' :
        $statusTimeout.innerHTML = 'Never'
        $statusModalDetails.removeAttribute("open");
        break;
        case '30mins' :
        $statusTimeout.innerHTML = 'in 30 minutes'
        $statusModalDetails.removeAttribute("open");
        break;
        case '1hr' :
        $statusTimeout.innerHTML = 'in 1 hour'
        $statusModalDetails.removeAttribute("open");
        break;
        case '4hrs' :
        $statusTimeout.innerHTML = 'in 4 hours'
        $statusModalDetails.removeAttribute("open");
        break;
        case 'today' :
        $statusTimeout.innerHTML = 'today'
        $statusModalDetails.removeAttribute("open");
        break;
        case 'week' :
        $statusTimeout.innerHTML = 'this week'
        $statusModalDetails.removeAttribute("open");
        break;
    }
}

// Set and clear status button action helper
const statusBtnAction = e => {
    e.preventDefault();
    $statusTimeout.innerHTML = 'Never'
    $statusForm.reset()
    $setStatus.removeAttribute("open")
    suggestionsAction(e, 'smile')
}

// Suggestion options select action helper
const suggestionsAction = (e, status) => {
    e.preventDefault()
    suggestionSelected = true
    $statusSuggestions.style.height = '0';
    $statusSuggestions.style.opacity = '0';
    $setStatusBtn.disabled = false
    $clearStatusBtn.disabled = false
    document.querySelector('#status__emoji__vacation').style.display = 'none'
    document.querySelector('#status__emoji__sick').style.display = 'none'
    document.querySelector('#status__emoji__home').style.display = 'none'
    document.querySelector('#status__emoji__focus').style.display = 'none'
    document.querySelector('#status__emoji__smile').style.display = 'none'
    switch(status) {
        case 'smile':
            document.querySelector('#status__emoji__smile').style.display = ''
            $setStatusBtn.disabled = true
            $clearStatusBtn.disabled = true
        break;
        case 'vacation':
            document.querySelector('#status__input').value = 'On vacation'
            document.querySelector('#status__emoji__vacation').style.display = 'block'
        break;
        case 'sick':
            document.querySelector('#status__input').value = 'Out sick'
            document.querySelector('#status__emoji__sick').style.display = 'block'
        break;
        case 'home':
            document.querySelector('#status__input').value = 'Working from home'
            document.querySelector('#status__emoji__home').style.display = 'block'
        break;
        case 'focus':
            document.querySelector('#status__input').value = 'Focusing'
            document.querySelector('#status__emoji__focus').style.display = 'block'
        break;
    }
}