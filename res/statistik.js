const api_key = "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"

const funFacts = [
	"BMR (Basal Metabolic Rate) menurun seiring bertambahnya usia, bahkan jika berat badan tetap.",
	"Otot membakar lebih banyak kalori daripada lemak, bahkan saat tubuh sedang istirahat.",
	"Setelah usia 30 tahun, kita mulai kehilangan sekitar 3–5% massa otot setiap dekade jika tidak rutin berolahraga.",
	"Laki-laki cenderung memiliki BMR lebih tinggi karena memiliki lebih banyak massa otot daripada perempuan.",
	"Tubuh membakar kalori bahkan saat tidur, sekitar 50–70 kalori per jam tergantung BMR.",
	"Menggigil karena kedinginan bisa membakar kalori hampir setara dengan olahraga ringan.",
	"Orang dengan metabolisme cepat sering merasa lebih mudah berkeringat dan lapar.",
	"Otak manusia menggunakan sekitar 20% energi tubuh, meskipun hanya sekitar 2% dari total berat tubuh.",
	"Otak tidak bisa merasakan sakit, karena tidak memiliki reseptor nyeri—itulah sebabnya operasi otak bisa dilakukan saat pasien sadar.",
	"Otak menyusut seiring bertambahnya usia, dimulai sejak usia 30-an.",
	"Jantung berdetak sekitar 100.000 kali per hari—itu lebih dari 35 juta kali setahun.",
	"Pembuluh darah dalam tubuh bisa mencapai 96.000 km, cukup untuk melingkari Bumi lebih dari dua kali.",
	"Darah lebih kental di pagi hari, meningkatkan risiko serangan jantung pada jam-jam awal.",
	"Kurang tidur selama beberapa malam saja bisa mengganggu regulasi gula darah dan membuatmu seperti pradiabetik.",
	"Otak membersihkan racun saat kita tidur, termasuk beta-amyloid yang terkait dengan Alzheimer.",
	"Usus manusia panjangnya sekitar 7–8 meter, dan bisa menyerap hampir 90% nutrisi dari makanan.",
	"Mengunyah makanan perlahan-lahan dapat membantu otak menyadari rasa kenyang dan mencegah makan berlebihan.",
	"Makanan pedas bisa meningkatkan metabolisme sementara, berkat senyawa capsaicin.",
	"Dehidrasi ringan (sekitar 2% penurunan cairan tubuh) bisa menurunkan fokus dan energi secara signifikan.",
	"Tubuh manusia terdiri dari sekitar 60% air, dan otak sekitar 75%.",
	"Indra penciuman manusia bisa mendeteksi sekitar 1 triliun aroma berbeda, meskipun kita hanya sadar akan sebagian kecilnya.",
	"Tubuh manusia menghasilkan panas setara dengan bohlam 100 watt saat istirahat.",
	"Tertawa selama 10–15 menit bisa membakar hingga 40 kalori."
];

function generateFunfact() {
	const content = document.querySelector(".fun-fact-content")
	const time = 6000;
		
	setInterval(() => {
		content.innerHTML = ""
		const getFunFact = funFacts[Math.floor(Math.random() * funFacts.length)]
		let i = 0;

		const interval = setInterval(() => {
			content.innerHTML += getFunFact[i]
			++i;

			if(i === getFunFact.length) clearInterval(interval);
		}, 16)

	}, time)
}

function counterUp(element, target, duration) {
    let current = 0;
    const increment = Math.ceil(target / (duration / 20));

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current;
    }, 20);
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".container-form");
    const bmrOutput = document.querySelector("#bmr-value .value-number");
    const allOutputs = document.querySelectorAll(".statistics-value .value-number");

    const tdeeOutput = allOutputs[1];
    const idealWeightOutput = allOutputs[2];
    const statusBBOutput = allOutputs[3];

	generateFunfact();

    form.querySelector("button").addEventListener("click", async function (e) {
        e.preventDefault();

        const gender = document.getElementById("gender").value;
        const age = parseInt(document.getElementById("age").value);
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
        const fitness = document.getElementById("fitness").value;

        if (isNaN(age) || isNaN(weight) || isNaN(height)) {
            alert("Silakan isi semua data dengan benar.");
            return;
        }

        // Hitung BMR
        let bmr = gender === "male"
            ? 10 * weight + 6.25 * height - 5 * age + 5
            : 10 * weight + 6.25 * height - 5 * age - 161;

        // Hitung TDEE
        const activityLevels = {
            low: 1.2,
            medium: 1.55,
            high: 1.725
        };
        const activityFactor = activityLevels[fitness];
        const tdee = bmr * activityFactor;

        // Berat Badan Ideal (Broca)
        const idealWeight = gender === "male"
            ? (height - 100) - (height - 100) * 0.1
            : (height - 100) - (height - 100) * 0.15;

        // Status BB (berdasarkan BMI)
        const bmi = weight / ((height / 100) ** 2);
        let statusBB = "";
        if (bmi < 18.5) {
            statusBB = "Kurus";
        } else if (bmi < 25) {
            statusBB = "Ideal";
        } else if (bmi < 30) {
            statusBB = "Gemuk";
        } else {
            statusBB = "Obesitas";
        }

        // Tampilkan hasil
	
		const durasi = 2000;
		counterUp(bmrOutput, Math.round(bmr), durasi)
		counterUp(tdeeOutput, Math.round(tdee), durasi)
		counterUp(idealWeightOutput, Math.round(idealWeight), durasi)
        statusBBOutput.textContent = statusBB;

		/*
        bmrOutput.textContent = Math.round(bmr);
        tdeeOutput.textContent = Math.round(tdee);
        idealWeightOutput.textContent = Math.round(idealWeight);
		*/

		const aiRes = document.querySelector('.ai-result')
		aiRes.innerHTML = `
			<div class="loading-skeleton"></div>
			<div class="loading-skeleton"></div>
			<div class="loading-skeleton"></div>
		`;

		fetch("https://openrouter.ai/api/v1/chat/completions", {
		  method: "POST",
		  headers: {
			"Authorization": "Bearer " + api_key,
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify({
			"stream": true,
			"model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
			"messages": [
			  {
				  "role": "system",
				  "content": "output maksimal 5 kalimat dalam bentuk paragraf"
			  },
			  {
				"role": "user",
				"content": `dari hasil BMR ${Math.round(bmr)}, TDEE ${Math.round(tdee)}, Berat Badan Ideal ${Math.round(idealWeight)} kg dan status berat badan ${statusBB} dengan gender ${gender}, Tolong berikan saran yang padat, singkat, dan jelas maksimal 4 kalimat tanpa simbol apapun, hanya paragraf normal. dalam bahasa indonesia.`
			  }
			]
		  })
		}).then(response => {
			const reader = response.body.getReader();
			const decoder = new TextDecoder('utf-8');
			let buffer = '';
			let textNow = false;

			function read() {
			  
			  return reader.read().then(({ done, value }) => {
				if (done) {
				  console.log('Stream complete');
				  aiRes.innerHTML = aiRes.innerHTML + `
				  <div class="powered-by">
				  	<img src="https://brandlogos.net/wp-content/uploads/2025/02/deepseek_logo_icon-logo_brandlogos.net_s5bgc-512x389.png"><p>Powered By Deepseek R1</p>
				  </div>
					`;
				  return;
				}

				buffer += decoder.decode(value, { stream: true });

				const lines = buffer.split('\n');
				buffer = lines.pop(); // Incomplete line stays for next chunk

				for (let line of lines) {
				  line = line.trim();
				  if (!line || line.includes("[DONE]") || line.includes(": OPENROUTER PROCESSING")) {
					  continue;
				  } else {
					  if(!textNow) {
						  aiRes.textContent = '';
						  textNow = true
					  }

					  if (line.startsWith('data: ')) {
						line = line.replace(/^data: /, ''); // Remove "data: "
					  }

					  try {
						const json = JSON.parse(line);
						const content = json.choices?.[0]?.delta?.content;
						if (content) {
						  aiRes.innerHTML += content;
						}
					  } catch (err) {
						console.error('JSON parse error:', line, err);
						continue
					  }
				  }
				}

				return read();
			  });
			}

			return read();
		});
	});
})
