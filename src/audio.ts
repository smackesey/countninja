// ########################
// ##### AUDIO
// ########################

// const PACMAN_SONG_URL = 'https://vgmsite.com/soundtracks/pac-man-40th-anniversary-album-join-the-pac/dlvnyxzsmu/1-01.%20PAC-MAN%20-%20Join%20the%20PAC.mp3';
const PACMAN_SONG_URL =
  'https://vgmsite.com/soundtracks/pac-man-40th-anniversary-album-join-the-pac/dlvnyxzsmu/1-08.%20PAC%20IS%20BACK%21.mp3';

export const CORRECT_SOUND = new Audio('correct.wav');
export const WRONG_SOUND = new Audio('wrong.wav');
// export const VICTORY_SONG = new Audio('victory.mp3');
// export const VICTORY_SONG = new Audio('https://vgmsite.com/soundtracks/pac-man-40th-anniversary-album-join-the-pac/dlvnyxzsmu/1-08.%20PAC%20IS%20BACK%21.mp3');
export const VICTORY_SONG = new Audio(PACMAN_SONG_URL);

export function playSound(sound: HTMLAudioElement) {
  sound.currentTime = 0;
  sound.play();
}
