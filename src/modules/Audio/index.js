import { Howl, Howler } from 'howler';

class Audio {
  constructor() {
    // setup sound effects
    this.Howler = Howler;
    this.SOUNDS = {
      click: new Howl({
        src: [`${process.env.PUBLIC_URL}/sound/pop.mp3`],
      }),
      sfxBike1: new Howl({
        src: [`${process.env.PUBLIC_URL}/sound/bikes.mp3`],
        volume: 0.15,
      }),
      scrolling: new Howl({
        src: [`${process.env.PUBLIC_URL}/sound/zoom.mp3`],
        volume: 2
      })
    };


  }

  isPlaying(sound) {
    try {
      if (sound === 'scrolling') {
        if (!this.SOUNDS[sound].isPlaying('scrolling')) {
          this.SOUNDS[sound].play('scrolling');
        }
      }
      return this.SOUNDS[sound].isPlaying();
    } catch (e) {
      console.error('Sound not found: ' + sound);
    }
  }

  play(sound) {
    const sfx = this.SOUNDS[sound];
    sfx.play();
  }

  mute(state) {
    this.Howler.mute(state);
  }

}

export default Audio;