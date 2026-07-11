export class SoundHub {
    // Audio
    // #region character
    static jump = new Audio("../assets/sounds/character/characterJump.wav");
    static run = new Audio("../assets/sounds/character/characterRun.mp3");
    static damage = new Audio("../assets/sounds/character/characterDamage.mp3");
    static dead = new Audio("../assets/sounds/character/characterDead.wav");
    static snore = new Audio("../assets/sounds/character/characterSnoring.mp3");
    // #endregion

    static chickenDead = new Audio("../assets/sounds/chicken/chickenDead.mp3");

    // #region collectibles
    static bottle = new Audio(
        "../assets/sounds/collectibles/bottleCollectSound.wav",
    );
    static break = new Audio("../assets/sounds/throwable/bottleBreak.mp3");
    static coin = new Audio("../assets/sounds/collectibles/collectSound.wav");
    // #endregion

    // #region endboss
    static endbossApproaching = new Audio(
        "../assets/sounds/endboss/endbossApproach.wav",
    );
    // #endregion

    static start = new Audio("../assets/sounds/game/gameStart.mp3");

    static babyChickenDead = new Audio(
        "../assets/sounds/baby_chicken/babyChickenDeadShort.wav",
    );

    // Array containing all audio files
    static allSounds = [SoundHub.jump, SoundHub.run, SoundHub.damage];

    // plays a single audio file
    static playOne(sound, volume) {
        sound.volume = volume;
        sound.currentTime = 0;
        sound.play();
    }

    // pauses all audio files
    static pauseAll() {
        SoundHub.allSounds.forEach((sound) => {
            sound.pause();
        });
    }

    //pauses a single audio file
    static pauseOne(sound) {
        sound.pause();
    }
}

SoundHub.snore.loop = true;
// SoundHub.coin.volume = 0;
// SoundHub.endbossApproaching.volume = 1;
