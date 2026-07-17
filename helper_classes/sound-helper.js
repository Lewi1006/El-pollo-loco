/**
 * Manages all game audio.
 *
 * SoundHub provides centralized access to all sound effects and controls
 * playing, pausing, muting, and saving the sound settings.
 *
 * All audio files are stored as static properties so they can be accessed
 * from any game object without creating a SoundHub instance.
 *
 * @class SoundHub
 */
export class SoundHub {
    // #region Audio
    static jump = new Audio("./assets/sounds/character/characterJump.wav");
    static run = new Audio("./assets/sounds/character/characterRun.mp3");
    static damage = new Audio("./assets/sounds/character/characterDamage.mp3");
    static dead = new Audio("./assets/sounds/character/characterDead.wav");
    static snore = new Audio("./assets/sounds/character/characterSnoring.mp3");
    static chickenDead = new Audio("./assets/sounds/chicken/chickenDead.mp3");
    static bottle = new Audio(
        "./assets/sounds/collectibles/bottleCollectSound.wav",
    );
    static break = new Audio("./assets/sounds/throwable/bottleBreak.mp3");
    static coin = new Audio("./assets/sounds/collectibles/collectSound.wav");
    static endbossApproaching = new Audio(
        "./assets/sounds/endboss/endbossApproachLoud.wav",
    );
    static endbossHit = new Audio("./assets/sounds/endboss/endbossHit2.wav");
    static endbossAttack = new Audio(
        "./assets/sounds/endboss/endbossAttack.wav",
    );
    static start = new Audio("./assets/sounds/game/gameStart.mp3");
    static babyChickenDead = new Audio(
        "./assets/sounds/baby_chicken/babyChickenDeadShort.wav",
    );
    static background = new Audio("./assets/sounds/background/background3.mp3");
    // #endregion

    // Array containing all audio objects
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
        SoundHub.background,
    ];

    // Stores the current mute state
    static isMuted = false;

    /**
     * Plays one sound effect.
     *
     * Resets the audio position before playing and ignores playback when sound
     * is muted.
     *
     * @param {HTMLAudioElement} sound - Audio object that should be played.
     * @param {number} volume - Volume level between 0 and 1.
     *
     * @returns {void}
     */
    static playOne(sound, volume) {
        if (SoundHub.isMuted) return;

        sound.volume = volume;
        sound.currentTime = 0;
        sound.play();
    }

    /**
     * Pauses all registered sounds.
     *
     * Iterates through all sounds stored in allSounds and pauses each one.
     *
     * @returns {void}
     */
    static pauseAll() {
        SoundHub.allSounds.forEach((sound) => {
            sound.pause();
        });
    }

    /**
     * Pauses a single sound.
     *
     * @param {HTMLAudioElement} sound - Audio object that should be paused.
     *
     * @returns {void}
     */
    static pauseOne(sound) {
        sound.pause();
    }

    /**
     * Starts the background music.
     *
     * Plays the background music continuously when the game starts.
     *
     * @returns {void}
     */
    static playBackground() {
        if (SoundHub.isMuted) return;

        SoundHub.background.loop = true;
        SoundHub.background.volume = 0.7;
        SoundHub.background.play();
    }

    /**
     * Stops the background music.
     *
     * Pauses the background track and resets it to the beginning.
     *
     * @returns {void}
     */
    static stopBackground() {
        SoundHub.background.pause();
        SoundHub.background.currentTime = 0;
    }

    /**
     * Saves the current mute state to local storage.
     *
     * Allows the sound preference to remain after reloading the page.
     *
     * @returns {void}
     */
    static saveSoundToLocalStorage() {
        localStorage.setItem("soundMuted", JSON.stringify(SoundHub.isMuted));
    }

    /**
     * Loads the saved mute state from local storage.
     *
     * Restores the previous sound preference and updates the sound icon.
     *
     * @returns {void}
     */
    static getSoundFromLocalStorage() {
        const storedSound = localStorage.getItem("soundMuted");
        if (storedSound !== null) {
            SoundHub.isMuted = JSON.parse(storedSound);
        }

        SoundHub.toggleSoundIcon();
    }

    /**
     * Toggles sound on or off.
     *
     * Updates the mute state, saves the preference, and pauses all sounds
     * when sound is muted.
     *
     * @returns {void}
     */
    static toggleSound() {
        //    https://stackoverflow.com/questions/11604409/how-to-toggle-a-boolean?
        SoundHub.isMuted = !SoundHub.isMuted;

        // save the state to storage
        SoundHub.saveSoundToLocalStorage();

        if (SoundHub.isMuted) {
            SoundHub.pauseAll();
        } else {
            SoundHub.playBackground();
        }
    }

    /**
     * Updates the sound icon depending on the current mute state.
     *
     * Shows the sound-off icon when muted and the sound-on icon otherwise.
     *
     * @returns {void}
     */
    static toggleSoundIcon() {
        const soundIconRef = document.getElementById(`sound-icon`);
        if (SoundHub.isMuted) {
            soundIconRef.src = "./assets/icons/sound_off.png";
        } else {
            soundIconRef.src = "./assets/icons/sound_on.png";
        }
    }
}

// Sounds that should continue playing until manually stopped
SoundHub.snore.loop = true;
SoundHub.endbossAttack.loop = true;
