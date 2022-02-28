const loadAllPara = () => {
	fetch('https://api.quran.sutanlab.id/surah')
	.then(response => response.json())
	.then(data => displayAllPara(data.data));
};
loadAllPara();

const displayAllPara = (data) => {
	const container = document.getElementById('ParaDetails');
	data.forEach(d => {
		const div = document.createElement('div');
		div.classList.add('para-card');
		div.classList.add('col-3');
		div.innerHTML = `
		<h3 class='d-flex align-items-center fs-5 fw-bold'><div class='para-number-card d-flex align-items-center justify-content-center mx-4'><div class='para-number'>${d.number}</div></div> ${d.name.transliteration.en}</h3>
		`;
		container.appendChild(div);
	})
}
