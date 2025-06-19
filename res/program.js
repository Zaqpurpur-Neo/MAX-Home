const allBox = document.querySelectorAll('.box')

Array.from(allBox).forEach(item => {
	const ul = item.querySelector('ul')
	const top = item.querySelector('.topper')

	if(top) {
		const i = top.firstChild;
		top.removeChild(i)
		const h2 = top.querySelector("h2")

		const div = document.createElement('div')
		div.classList.add("workout")
		div.style.display = "flex"
		div.style.height = "fit-content"
		div.style.alignItems = "center"
		div.style.gap = "8px"

		if(ul) {
			const count = ul.children.length
			div.innerHTML = `<p>${count} Aktivitas</p><i class="fa-solid fa-calendar-days"></i>`;
		} else {
			div.innerHTML = `<p>Istirahat</p><i class="fa-solid fa-calendar-days"></i>`;
		}
		
		h2.before(div)
	}
})
