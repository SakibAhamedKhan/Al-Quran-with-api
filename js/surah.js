// Get Parameter from link
const {search} = window.location;
const numberOfSurah = (new URLSearchParams(search)).get('surah');


fetch(`https://api.quran.sutanlab.id/surah/${numberOfSurah}`)
.then(response => response.json())
.then(data => displaySurah(data.data, numberOfSurah));

const displaySurah = (data, numberOfSurah) => {
	document.getElementById('surah-name').innerText = data.name.transliteration.en;
	document.getElementById('ayah-total').innerText = `Ayah ${data.verses.length}`;
	const container = document.getElementById('surah');
	data.verses.forEach((d, index) => {
		// const div = document.createElement('div');
		// div.innerHTML = `
			
		// `;
		let str = d.text.transliteration.en;
		// let str = trns.split(" ");
		// str = str.reverse();
		// str = str.join(' ');
		container.innerHTML += `
		<div class='text-center fw-bold border border-2 ayah p-3 rounded my-2'>
			${d.text.arab} (${index+1}) 
			<div class='d-block fw-normal pt-2 ayah-translations'>
				${str}
			</div>	
			<div>
				<button id="stopping-${index}" class="btn  btn-success mt-3 px-4" onclick="loadAudioOfSurah(${index},${numberOfSurah},false)">Stop</button>
				<button id="playing-${index}" class="btn  btn-success mt-3 me-2 px-4" onclick="loadAudioOfSurah(${index},${numberOfSurah},true)">Play</button>
			</div>
		</div>
		
		`;

	})
}

const loadAudioOfSurah = (index,numberOfSurah, condition) => {
	const url = `https://api.quran.sutanlab.id/surah/${numberOfSurah}`;

	fetch(url)
	.then(res => res.json())
	.then(data => playAudioOfSurah(data.data, condition, index));
}

const playAudioOfSurah = (data, condition , index) => {
	const len = data.verses.length;
	for(let i=0; i<len; i++){
		const container = document.getElementById(`playing-${i}`);
		container.innerText = 'Play';
		container.classList.remove('btn-danger');
	}
	data = data.verses[index];

	const audio = document.getElementById('audioPlay');
	audio.setAttribute('src', data.audio.primary);
	audio.setAttribute('onended', `playingEnded('playing-${index}')`)
	if(condition === true){
		const playing = document.getElementById(`playing-${index}`);
		playing.innerText = 'Running';
		playing.classList.add('btn-danger');
		audio.play();
	} else{
		playingEnded(`playing-${index}`);
		audio.pause();
		
	}
}

const playingEnded = (id) => {
	// alert(id);
	const playing = document.getElementById(id);
	playing.innerText = 'Play';
	playing.classList.remove('btn-danger');
}