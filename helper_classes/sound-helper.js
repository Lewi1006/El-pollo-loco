class SoundHub {
    // Audio
    static jump = new Audio();

    // Array containing all audio files
    static allSounds = [SoundHub.piano, SoundHub.guitar, SoundHub.drums];


    // plays a single audio file
    static playOne(sound, instrumentId) {  
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
    static pauseOne(sound, instrumentId) {
        sound.pause();  
    }
}