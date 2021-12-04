import { Track } from "../redux/types";

const SAMPLE_MEDIA = [
  new Track(1, "/static/coverArt/panda-hi.jpg", "Billionaire", "Bruno Mars", "Album A", "/static/audio/Billionaire.mp3"),
  new Track(2, "/static/coverArt/red-panda.jpg", "Ashita No Joe", "IDK", "Album A", "/static/audio/Ashita no Joe.mp3"),
  new Track(3, "/static/coverArt/baby-panda.jpg", "Billie Jean", "Michael Jackson", "Album B", "/static/audio/Billie Jean.mp3"),
  new Track(4, "/static/coverArt/panda-hi.jpg", "Break The Ice", "IDK", "Album B", "/static/audio/Break The Ice.mp3"),
  new Track(5, "/static/coverArt/red-panda.jpg", "Broken Hearted Girl", "IDK", "Album A", "/static/audio/Broken Hearted Girl.mp3"),
];

export { SAMPLE_MEDIA };
