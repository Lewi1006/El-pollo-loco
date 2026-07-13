export class SoundHub {
    // #region Audio
    static jump = new Audio("../assets/sounds/character/characterJump.wav");
    static run = new Audio("../assets/sounds/character/characterRun.mp3");
    static damage = new Audio("../assets/sounds/character/characterDamage.mp3");
    static dead = new Audio("../assets/sounds/character/characterDead.wav");
    static snore = new Audio("../assets/sounds/character/characterSnoring.mp3");
    static chickenDead = new Audio("../assets/sounds/chicken/chickenDead.mp3");
    static bottle = new Audio(
        "../assets/sounds/collectibles/bottleCollectSound.wav",
    );
    static break = new Audio("../assets/sounds/throwable/bottleBreak.mp3");
    static coin = new Audio("../assets/sounds/collectibles/collectSound.wav");
    static endbossApproaching = new Audio(
        "../assets/sounds/endboss/endbossApproachLoud.wav",
    );
    static endbossHit = new Audio("../assets/sounds/endboss/endbossHit2.wav");
    static endbossAttack = new Audio(
        "../assets/sounds/endboss/endbossAttack.wav",
    );
    static start = new Audio("../assets/sounds/game/gameStart.mp3");
    static babyChickenDead = new Audio(
        "../assets/sounds/baby_chicken/babyChickenDeadShort.wav",
    );
    // #endregion

    // Array containing all audio files
    static allSounds = [
        SoundHub.jump,
        SoundHub.run,
        SoundHub.damage,
        SoundHub.dead,
        SoundHub.snore,
        SoundHub.chickenDead,
        SoundHub.bottle,
        SoundHub.break,
        SoundHub.coin,
        SoundHub.endbossApproaching,
        SoundHub.endbossAttack,
        SoundHub.start,
        SoundHub.babyChickenDead,
    ];

    static isMuted = false;

    // plays a single audio file
    static playOne(sound, volume) {
        if (SoundHub.isMuted) return;

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

    static saveSoundToLocalStorage() {
        localStorage.setItem("soundMuted", JSON.stringify(SoundHub.isMuted));
    }

    static getSoundFromLocalStorage() {
        const storedSound = localStorage.getItem("soundMuted");

        if (storedSound !== null) {
            SoundHub.isMuted = JSON.parse(storedSound);
        }
    }

    static toggleSound() {
        //    https://stackoverflow.com/questions/11604409/how-to-toggle-a-boolean?
        SoundHub.isMuted = !SoundHub.isMuted;

        // save the state to storage
        SoundHub.saveSoundToLocalStorage();

        if (SoundHub.isMuted) {
            SoundHub.pauseAll();
        }
    }
}
SoundHub.snore.loop = true;
SoundHub.endbossAttack.loop = true;
