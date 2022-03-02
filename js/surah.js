// Get Parameter from link
const {search} = window.location;
const numberOfSurah = (new URLSearchParams(search)).get('surah');
// console.log(numberOfSurah);

fetch(`https://api.quran.sutanlab.id/surah/${numberOfSurah}`)
.then(response => response.json())
.then(data => displaySurah(data.data, numberOfSurah));

const displaySurah = (data, numberOfSurah) => {
	console.log(data);
	document.getElementById('surah-name').innerText = data.name.transliteration.en;
	document.getElementById('ayah-total').innerText = `Ayah ${data.verses.length}`;
	const container = document.getElementById('surah');
	data.verses.forEach((d, index) => {
		// console.log(index);
		// const div = document.createElement('div');
		// div.innerHTML = `
			
		// `;
		let trns = d.text.transliteration.en;
		let str = trns.split(" ");
		str = str.reverse();
		str = str.join(' ');
		container.innerHTML += `
		<div class='text-center fw-bold border border-2 ayah p-3 rounded my-2'>
			${d.text.arab} (${index+1}) 
			<div class='d-block fw-normal pt-2 ayah-translations'>
				${str}
			</div>	
			<div>
				<button class="btn  btn-success mt-3" onclick="loadAudioOfSurah(${index},${numberOfSurah},false)">Stop</button>
				<button class="btn  btn-success mt-3" onclick="loadAudioOfSurah(${index},${numberOfSurah},true)">Play</button>
			</div>
		</div>
		
		`;

	})
}

const loadAudioOfSurah = (index,numberOfSurah, condition) => {
	console.log(index,numberOfSurah);
	const url = `https://api.quran.sutanlab.id/surah/${numberOfSurah}`;

	fetch(url)
	.then(res => res.json())
	.then(data => playAudioOfSurah(data.data.verses[index], condition));
}

const playAudioOfSurah = (data, condition) => {
	// console.log(data.audio.primary);
	const audio = document.getElementById('audioPlay');
	audio.setAttribute('src', data.audio.primary);
	if(condition === true){
		audio.play();
	} else{
		audio.pause();
	}
}