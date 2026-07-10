export class SoundHub {
    // Audio
    // #region character
    static jump = new Audio("../assets/sounds/character/characterJump.wav");
    static run = new Audio("../assets/sounds/character/characterRun.mp3");
    static damage = new Audio ("../assets/sounds/character/characterDamage.mp3");
    static dead = new Audio ("../assets/sounds/character/characterDead.wav");
    static snore = new Audio ("../assets/sounds/character/characterSnoring.mp3");
    // #endregion

    static chickenDead = new Audio("../assets/sounds/chicken/chickenDead.mp3");
   
    // #region collectibles
    static bottle = new Audio("../assets/sounds/collectibles/bottleCollectSound.wav");
    static coin = new Audio("../assets/sounds/collectibles/collectSound.wav");
    // #endregion


   
    // Array containing all audio files
    static allSounds = [ SoundHub.jump, SoundHub.run, SoundHub.damage];


    // plays a single audio file
    static playOne(sound) {  
        sound.volume = 0.2; 
        sound.currentTime = 0; 
        sound.play();  
    }

    // pauses all audio files
    static pauseAll() {
        SoundHub.allSounds.forEach(sound => {
            sound.pause();  
        });
    }

    //pauses a single audio file
    static pauseOne(sound) {
        sound.pause();  
    }
}

 SoundHub.snore.loop = true;