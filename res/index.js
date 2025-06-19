const waitTime = 1000;

document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		document.querySelector('.overlay-home-img').style.display = 'none'
		const leftIntro = document.querySelector('.left-intro')
		const rightIntro = document.querySelector('.right-intro')
		
		leftIntro.querySelector('.img-home').style.display = 'unset'
		rightIntro.querySelector('.img-home').style.display = 'unset'

		leftIntro.querySelector('.arm').style.display = 'unset';
		leftIntro.querySelector('.arm').style.animationPlayState = 'running';
		
		rightIntro.querySelector('.arm').style.display = 'unset';
		rightIntro.querySelector('.arm').style.animationPlayState = 'running';
		
		setTimeout(() => {
			leftIntro.style.transform = "translateX(-52vw)"	
			rightIntro.style.transform = "translateX(52vw)"
		}, waitTime + 400)
		
		setTimeout(() => { 
			document.querySelector('.intro').style.display = 'none';
			document.querySelector('nav').style.animationPlayState = 'running';

			const h1 = document.querySelector('.hero-content').querySelector('h1');
			const content = "Unlock Elite-Level Fitness Without Leaving Your Doorstep".split(" ").map(item => `<span>${item}</span>`).join(" ")
			h1.innerHTML = content
			Array.from(h1.children).forEach((item, i) => {
				item.style.animationDelay = `${i * 200}ms`
				item.style.animationPlayState = 'running'
			})

			document.querySelector('.hero-content').querySelector('p').style.animationPlayState = 'running';
			document.querySelector('.scroll-down').style = `
				translate: 0;
				opacity: 1;
			`

			arg()
		}, waitTime*2.5 + 700)

	}, waitTime)

	const whatSection = document.querySelector('.what-section')
	const whySection = document.querySelector('.why-section')

	const whatTitle = "Apa itu M.A.X Home?"
	const whatDesc = "M.A.X Home adalah sebuah platform home workout revolusioner berbasis sains yang dirancang untuk membawa kualitas latihan kelas elite langsung ke dalam rumah Anda. Dengan pendekatan yang menggabungkan efektivitas program latihan, prinsip ilmiah, dan pengalaman praktis, M.A.X Home hadir sebagai solusi cerdas bagi siapa pun yang ingin membangun tubuh ideal tanpa harus meninggalkan rumah."
	const whyTitle = "Why M.A.X. Home?"

	const intersectionWhat = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if(entry.intersectionRatio > 0.05) {
				if(entry.target.tagName.toLowerCase() == 'h3') {
					Array.from(entry.target.children).forEach((itm, i) => {
						itm.style.animationDelay = `${i * 100}ms`
						itm.style.animationPlayState = 'running'
					})
				} else {
					const del = 400;
					Array.from(entry.target.children).forEach((itm, i) => {
						itm.style.animationDelay = `${(i * 50) + del}ms`
						itm.style.animationPlayState = 'running'
					})
				}
			}
		});
	})

	Array.from(whatSection.querySelector('.right').children).forEach((item, i) => {
		if(item.tagName.toLowerCase() == 'h3') {
			const title = whatTitle.split(" ").map(i => `<span>${i}</span>`).join(" ")
			item.innerHTML = title;
		} else {
			const title = whatDesc.split(" ").map(i => `<span>${i}</span>`).join(" ")
			item.innerHTML = title;
		}

		intersectionWhat.observe(item)
	})

	const intersectionWhy = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if(entry.isIntersecting) {
				if(entry.target.tagName.toLowerCase() == 'ul') {
					Array.from(entry.target.children).forEach(itm => {
						itm.style.translate = '0'
						itm.style.scale = '1'
						itm.style.opacity = '1'
					})
				}
			}
		})
	})

	Array.from(whySection.querySelector('.right').children).forEach((item) => {
		if(item.tagName.toLowerCase() === 'ul') {
			Array.from(item.children).forEach((itm, i) => {
				itm.style.translate = '0 2em'
				itm.style.scale = '1.05'
				itm.style.opacity = '0'
				itm.style.transition = `all .8s ${i*200}ms`
			})
		}

		intersectionWhy.observe(item)
	})


})

function arg() {
	let i = 2;
	const video = document.querySelector('video');
	
	setInterval(() => {
		video.pause();
		video.src = `../assets/video${i}-sc.mp4`;
		video.load();
		if(i === 3) i = 1;
		else i++;
	}, 6000);
}
