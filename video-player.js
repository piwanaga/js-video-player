class VideoPlayer {
    constructor(divId, width, height) {
        this.divId = divId
        this.player = null
        this.viewability = null
        this.appendPlayer(divId, width, height)
        this.setUpObserver()
    }

    appendPlayer(divId, width, height) {
        const div = document.getElementById(divId)
        const player = document.createElement('video')
        player.setAttribute('width', width)
        player.setAttribute('height', height)
        div.append(player)
        this.player = player
    }

    setUpObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
        }

        const observer = new IntersectionObserver(this.handleIntersect, options)
        observer.observe(this.player)
    }

    handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            this.viewability = entry.intersectionRatio
        })
    }

    load(url) {
        this.player.setAttribute('src', url)
    }

    play() {
        this.player.play()
    }

    pause() {
        this.player.pause()
    }

    resize(width, height) {
        this.player.setAttribute('width', width)
        this.player.setAttribute('height', height)
    }

    getHeight() {
        return this.player.height
    }

    getWidth() {
        return this.player.width
    }

    setAutoplay(autoplay) {
        this.player.setAttribute('autoplay', autoplay)
    }

    setVolume(volume) {
        this.player.volume = volume
    }

    getVolume() {
        return this.player.volume * 100
    }

    setMute(mute) {
        this.player.muted = mute
    }

    getMute() {
        return this.player.muted
    }

    getDuration() {
        return Math.trunc(this.player.duration)
    }

    setFullscreen() {
        this.player.requestFullscreen()
    }

    getPlaybackState() {
        if (this.player.ended) {
            return 'ended'
        } else if (this.player.paused) {
            return 'paused'
        } 
        return 'playing'
    }

    getViewability() {
        return Math.trunc(this.viewability * 100)
    }
}

// Instance of video player to test in the browser
const video = new VideoPlayer('1', 320, 240)


