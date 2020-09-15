//Global Variables
const music = document.querySelector('audio')
const play = document.getElementById('play');
const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
let progress = document.getElementById('progress');
let songLength = document.getElementById('duration');
let current_time = document.getElementById('current_time');
const progress_div = document.getElementById('progress_div');
let isPlaying = false;

const songs = [
{
	name : 'cdk.mp3',
	title : 'Char Dino Ka',
	artist : 'Rahul Jain',
	image: 'img/rj.jpg',
},
{
	name : 'jbn.mp3',
	title : 'Jaan Ban Gaye',
	artist : 'Vishal Mishra',
	image: 'img/vis.jpg',
},
{
	name : 'dch.mp3',
	title : 'Dil Chahte Ho',
	artist : 'Jubin Nautiyal',
	image: 'img/dch.jpg',
},
{
	name : 'lab.mp3',
	title : 'Lab par aaye',
	artist : 'Javed Ali',
	image: 'img/lab.jpg',
},
{
	name : 'kyun.mp3',
	title : 'Kyun',
	artist : 'B Praak',
	image: 'img/kyun.jpeg',
},
{
	name : 'breath.mp3',
	title : 'Breathless',
	artist : 'Shankar Mahadevan',
	image: 'img/sm.jpg',
},
{
	name : 'sajan.mp3',
	title : 'Sajan Bin',
	artist : 'Shankar Ehsaan Loy',
	image: 'img/sajan.jpg',
},
{
	name : 'dtk.mp3',
	title : 'Dil Tod Ke',
	artist : 'B Praak',
	image: 'img/dtk.jpg',
},
{
	name : 'ched.mp3',
	title : 'Chedkhaniya',
	artist : 'Shankar Ehsaan Loy',
	image: 'img/ched.jpg',
}
]

function theme(){
	const colors = ['0 0 3rem 0.1rem rgba(195,155,211,0.7)','0 0 3rem 0.1rem rgba(195,155,2,0.7)',
	'0 0 3rem 0.1rem rgba(0,255,255,0.7)','0 0 3rem 0.1rem rgba(115,198,182,0.7)','0 0 3rem 0.1rem rgba(207,97,85,0.7)',
	'0 0 3rem 0.1rem rgba(240,98,146,0.7)','0 0 3rem 0.1rem rgba(0,98,146,0.7)','0 0 3rem 0.1rem rgba(20,106,217,0.7)', 
	'0 0 3rem 0.1rem rgba(250, 183, 0,0.7)','0 0 3rem 0.1rem rgba(224, 23, 9,0.7)','0 0 3rem 0.1rem rgba(9, 224, 174,0.7)',
	'0 0 3rem 0.1rem rgba(209, 52, 76,0.7)','0 0 3rem 0.1rem rgba(186, 52, 209,0.7)']
	let num= Math.floor(Math.random()*colors.length);
	document.getElementById('theme').style.boxShadow = `${colors[num]}`;
	document.getElementById('ps').style.boxShadow = `${colors[num]}`;
}

function disco(){	
val = setInterval(theme,500);
}

//Play function
const playMusic = () =>{
	isPlaying = true;
	music.play();
	play.classList.replace('fa-play','fa-pause'); //to replace and repeat any class
	disco();
};

//Pause function
const pauseMusic = () =>{
	isPlaying = false;
	music.pause();
	play.classList.replace('fa-pause','fa-play'); //to replace and repeat any class
	
};

//play/pause button functionality
play.addEventListener('click', () =>{
	if(isPlaying){
		pauseMusic();
	}
	else{
		playMusic();
	}
});

//Changeing Songs
const changeSong = (songs)=>{
	title.textContent = songs.title;
	artist.textContent = songs.artist;
	music.src = "music/" + songs.name;
	img.src = songs.image;
};

let songIndex = 0;

const nextSong = () =>{
	songIndex = (songIndex + 1) % songs.length;
	changeSong(songs[songIndex]);
	playMusic();
};

const prevSong = () =>{
	songIndex = (songIndex - 1 + songs.length) % songs.length;
	changeSong(songs[songIndex]);
	playMusic();
};

//Time duration JS
music.addEventListener('timeupdate',(event) =>{
	const {currentTime, duration} = event.srcElement;
	let progressTime = (currentTime/duration)*100;
	progress.style.width = `${progressTime}%`;

	// Duration Update
	let minutes = Math.floor(duration/60);
	let seconds = Math.floor(duration%60);
	let song_duration = `0${minutes}:${seconds}`;
	if(duration){
		songLength.textContent = song_duration;
	};

	//current duration update
	let current_min = Math.floor(currentTime/60);
	let current_second = Math.floor(currentTime%60);
	if(current_second<10){
		current_second = `0${current_second}`;
	}
	let total_current = `${current_min}:${current_second}`;
	current_time.textContent = total_current;
});

//music play on progress time click
progress_div.addEventListener('click',(event)=>{
	const {duration} = music;
	let move_progress = (event.offsetX/event.srcElement.clientWidth)*duration;
	music.currentTime = move_progress;
});
//to play next song when song ended
music.addEventListener('ended',nextSong);

next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);
