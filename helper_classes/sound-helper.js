export class SoundHub {
    // Audio
    static jump = new Audio("../assets/sounds/character/characterJump.wav");
    static run = new Audio("../assets/sounds/character/characterRun.mp3");
    static damage = new Audio ("../assets/sounds/character/characterDamage.mp3");


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