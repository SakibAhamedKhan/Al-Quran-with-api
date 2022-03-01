// Get Parameter from link
const {search} = window.location;
const numberOfSurah = (new URLSearchParams(search)).get('surah');
// console.log(numberOfSurah);

fetch(`https://api.quran.sutanlab.id/surah/${numberOfSurah}`)
.then(response => response.json())
.then(data => displaySurah(data.data));

const displaySurah = (data) => {
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
		container.innerHTML += `<div class='text-center fw-bold border border-2 ayah p-3 rounded my-2'>${d.text.arab} (${index+1}) <div class='d-block fw-normal pt-2 ayah-translations'>${str}</div> </div>`;

		// <div class='d-inline fs-4'>${d.text.arab}</div> <div class='d-inline-block ayah  mx-2'>${index+1}</div>
		// container.innerText += `${d.text.arab}`;
	})
}
