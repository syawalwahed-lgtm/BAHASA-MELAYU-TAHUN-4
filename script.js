const questions=[
["Apakah kata nama dalam ayat berikut? “Adik membaca buku di perpustakaan.”",["membaca","buku","di","membaca buku"],1],
["Pilih kata kerja yang betul: “Amir ___ bola di padang.”",["cantik","bermain","padang","bola"],1],
["Apakah kata adjektif dalam ayat “Bunga itu sangat cantik.”?",["bunga","itu","sangat","cantik"],3],
["Pilih kata tugas yang sesuai: “Ali pergi ___ sekolah.”",["dan","ke","cantik","berlari"],1],
["Manakah kata berimbuhan?",["rumah","makanan","buku","meja"],1],
["Manakah kata ganda?",["kereta api","murid-murid","berlari","cantik"],1],
["Manakah kata majmuk?",["guru","kereta api","berjalan","besar"],1],
["Kata nama bagi manusia ialah…",["doktor","berlari","tinggi","dan"],0],
["Kata kerja dalam ayat “Siti menulis surat.” ialah…",["Siti","surat","menulis","itu"],2],
["Pilih kata adjektif: “Air sirap itu manis.”",["air","sirap","itu","manis"],3],
["Lengkapkan ayat: “Ibu membeli sayur ___ ikan.”",["dan","berlari","cantik","ke"],0],
["Kata dasar bagi “berjalan” ialah…",["jalan","ber","jalanlah","berjalan"],0],
["Apakah bentuk kata ganda bagi “buku”?",["buku-buku","berbuku","pembuku","bukaan"],0],
["Manakah kata majmuk yang betul?",["alat tulis","alat-alat","menulis","tertulis"],0],
["Pilih kata nama: “Kucing itu tidur di atas tikar.”",["tidur","atas","kucing","itu"],2],
["Pilih kata kerja: “Murid-murid sedang membaca.”",["murid-murid","sedang","membaca","itu"],2],
["Pilih kata adjektif: “Rumah itu besar.”",["rumah","itu","besar","dan"],2],
["Pilih kata tugas: “Buku itu di atas meja.”",["buku","atas","di","meja"],2],
["Manakah kata berimbuhan awalan meN-?",["menyapu","sapu-sapu","sapu","penyapu"],0],
["Ayat manakah menggunakan kata majmuk dengan betul?",["Ali naik kereta api.","Ali keretaapi naik.","Ali berkeretaapi.","Ali menaiki kereta-kereta api."],0]
];

let i=0,score=0,lives=3,locked=false;
function show(id){document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));document.getElementById(id).classList.add('active');}
function startGame(){i=0;score=0;lives=3;show('game');render();}
function render(){
 locked=false;
 const q=questions[i];
 document.getElementById('progress').textContent=`Soalan ${i+1} / ${questions.length}`;
 document.getElementById('score').textContent=`⭐ ${score}`;
 document.getElementById('lives').textContent='❤️'.repeat(lives)+'🖤'.repeat(3-lives);
 document.getElementById('bar').style.width=((i+1)/questions.length*100)+'%';
 document.getElementById('questionBox').innerHTML=`<div class="qtag">MISI ${i+1}</div><div class="question">${q[0]}</div>`;
 document.getElementById('answers').innerHTML=q[1].map((a,n)=>`<button class="answer" onclick="answer(${n})">${String.fromCharCode(65+n)}. ${a}</button>`).join('');
 document.getElementById('feedback').textContent='';
 document.getElementById('nextBtn').classList.add('hidden');
}
function tone(ok){
 const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
 const c=new C(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);
 o.frequency.value=ok?720:180;g.gain.value=.08;o.start();o.stop(c.currentTime+(ok?.18:.28));
}
function answer(n){
 if(locked)return;locked=true;
 const q=questions[i],btns=[...document.querySelectorAll('.answer')];
 btns.forEach(b=>b.disabled=true);
 if(n===q[2]){score+=5;btns[n].classList.add('correct');document.getElementById('feedback').textContent='🎉 Betul! +5 markah';tone(true);}
 else{lives--;btns[n].classList.add('wrong');btns[q[2]].classList.add('correct');document.getElementById('feedback').textContent=`💡 Belum tepat. Jawapan: ${q[1][q[2]]}`;tone(false);}
 document.getElementById('score').textContent=`⭐ ${score}`;
 document.getElementById('lives').textContent='❤️'.repeat(lives)+'🖤'.repeat(3-lives);
 document.getElementById('nextBtn').classList.remove('hidden');
}
function nextQuestion(){if(i<questions.length-1){i++;render();}else finish();}
function finish(){
 show('result');document.getElementById('finalScore').textContent=`${score} / 100`;
 let t=score>=90?'🌟 Cemerlang! Anda memang hebat!':score>=70?'👏 Tahniah! Penguasaan anda baik.':score>=50?'💪 Teruskan berlatih, anda semakin baik!':'📚 Jom ulang kaji nota dan cuba lagi!';
 document.getElementById('resultText').textContent=t;
}
show('home');