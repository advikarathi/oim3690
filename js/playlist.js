const songs = [
  "Good Days",
  "Levitating Remix",
  "Golden",
  "Blinding Lights",
  "Espresso",
];

const playlist = document.querySelector("#playlist");
const playlistForm = document.querySelector("#playlist-form");
const songInput = document.querySelector("#song-input");

function renderPlaylist() {
  playlist.innerHTML = "";

  for (const song of songs) {
    const item = document.createElement("li");
    item.textContent = song;

    if (song.includes("Remix")) {
      item.classList.add("remix");
    }

    playlist.appendChild(item);
  }
}

playlistForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newSong = songInput.value.trim();

  if (newSong !== "") {
    songs.push(newSong);
    songInput.value = "";
    renderPlaylist();
  }
});

renderPlaylist();
