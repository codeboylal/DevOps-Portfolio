// For Menu scrool
window.onscroll = function () {
  let navbar = document.getElementById('myNav')
  if (window.scrollY > 150) {
    navbar.classList.add('scroll-nav-bg')
  } else {
    navbar.classList.remove('scroll-nav-bg')
  }
}

// For Hamburger menu
let menuDisplay = false

document.getElementById('menu-btn').addEventListener('click', () => {
  if (menuDisplay) {
    document.getElementById('menu-ham').classList.add('hidden')
    document.getElementById('menu-btn').innerHTML =
      '<i class="text-white text-2xl fa-solid fa-bars">'
    menuDisplay = false
  } else {
    document.getElementById('menu-ham').classList.remove('hidden')
    document.getElementById('menu-btn').innerHTML =
      '<i class="text-white text-2xl fa-solid fa-xmark"></i>'
    menuDisplay = true
  }
})