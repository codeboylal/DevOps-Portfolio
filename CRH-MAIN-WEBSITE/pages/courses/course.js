// For courses content
let sectionMain = document.getElementsByClassName('section-main')

for (let section of sectionMain) {
  section.addEventListener('click', () => {
    const icon = section.querySelector('button i.fa-solid')
    icon.classList.toggle('fa-plus')
    icon.classList.toggle('fa-minus')

    section.nextElementSibling.classList.toggle('hidden')
  })
}
