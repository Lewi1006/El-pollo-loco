export class SoundHub {
    // Audio
    static jump = new Audio("../assets/sounds/character/characterJump.wav");

    // Array containing all audio files
    static allSounds = [ SoundHub.jump,];


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