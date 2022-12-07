'use-strict'

window.addEventListener('resize', () => menuChange())

function menuChange() {
    const menu = document.getElementById('menu')
    const chevron = document.getElementById('chevron')
    if (screen.width <= 500) {
        if (menu.classList.contains('offcanvas-end')) {
            menu.classList.remove('offcanvas-end')
            menu.classList.add('offcanvas-top')
        }
        if (chevron.classList.contains('bxs-chevrons-right')) {
            chevron.classList.remove('bxs-chevrons-right')
            chevron.classList.add('bxs-chevrons-up')
        }
    } else {
        if (menu.classList.contains('offcanvas-top')) {
            menu.classList.remove('offcanvas-top')
            menu.classList.add('offcanvas-end')
        }
        if (chevron.classList.contains('bxs-chevrons-up')) {
            chevron.classList.remove('bxs-chevrons-up')
            chevron.classList.add('bxs-chevrons-right')
        }
    }
}

menuChange()