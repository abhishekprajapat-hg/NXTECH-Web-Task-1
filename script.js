const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const backwardBtn = document.getElementById('backwardBtn');
const forwardBtn = document.getElementById('forwardBtn');
const songRange = document.getElementById('songRange');
const albumArt = document.getElementById('albumArt');
const songTitle = document.getElementById('songTitle');
const artist = document.getElementById('artist');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');

let isPlaying = false;

const songs = [
  {
    title: 'Keshariya',
    artist: 'Arijit Singh',
    albumArt: 'image/cover 1.jpg',
    src: 'audio/song 1.mp3'
},
{
  title: 'Kya Loge Tum',
  artist: 'B Parak',
  albumArt: 'image/cover 3.jpg',
  src: 'audio/song 3.mp3'
},
  {
      title: 'Raatan Lambiyan',
      artist: 'Jubin',
    albumArt: 'image/cover 2.jpg',
    src: 'audio/song 2.mp3'
  },
  {
      title: 'Ram Siya Ram',
      artist: 'Sachet Tondon & Parampara Tondon',
    albumArt: 'image/cover 4.jpeg',
    src: 'audio/song 4.mp3'
  },
  {
      title: 'Tere Pyaar Mein',
      artist: 'Arijit Singh',
    albumArt: 'image/cover 5.jpeg',
    src: 'audio/song 5.mp3'
  }
];

let currentSongIndex = 0;

function loadSong() {
  songTitle.textContent = songs[currentSongIndex].title;
  artist.textContent = songs[currentSongIndex].artist;
  albumArt.src = songs[currentSongIndex].albumArt;
  audio.src = songs[currentSongIndex].src;
}

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = 'Play';
  } else {
    audio.play();
    playPauseBtn.textContent = 'Pause';
  }
  isPlaying = !isPlaying;
}

function backward() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong();
  audio.play();
  playPauseBtn.textContent = 'Pause';
}

function forward() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong();
  audio.play();
  playPauseBtn.textContent = 'Pause';
}

function updateTime() {
  const { currentTime: currentTimeValue, duration: durationValue } = audio;
  const minutesCurrent = Math.floor(currentTimeValue / 60);
  const secondsCurrent = Math.floor(currentTimeValue % 60);
  const minutesDuration = Math.floor(durationValue / 60);
  const secondsDuration = Math.floor(durationValue % 60);
  currentTime.textContent = `${minutesCurrent}:${secondsCurrent < 10 ? '0' : ''}${secondsCurrent}`;
  duration.textContent = `${minutesDuration}:${secondsDuration < 10 ? '0' : ''}${secondsDuration}`;
  songRange.value = (currentTimeValue / durationValue) * 100;
}

loadSong();

audio.addEventListener('ended', forward);
songRange.addEventListener('input', () => {
  audio.currentTime = (songRange.value / 100) * audio.duration;
});
