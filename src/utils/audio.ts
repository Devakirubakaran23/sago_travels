/**
 * Procedural Web Audio Engine for Sago Travels Pondicherry.
 * Generates low-frequency luxury EV powertrain hum and subtle glass acoustic chimes
 * without requiring external audio assets.
 */
class SoundEngine {
  private ctx: AudioContext | null = null
  private isMuted: boolean = true
  private ambientOsc: OscillatorNode | null = null
  private ambientGain: GainNode | null = null

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
  }

  public toggleMute(): boolean {
    this.initContext()
    this.isMuted = !this.isMuted

    if (this.isMuted) {
      this.stopAmbience()
    } else {
      this.startAmbience()
      this.playChime(640, 0.08)
    }

    return this.isMuted
  }

  public getMuted(): boolean {
    return this.isMuted
  }

  public startAmbience() {
    if (this.isMuted || !this.ctx) return

    try {
      if (this.ambientOsc) return

      // Deep cinematic studio sub-drone (45Hz + gentle harmonic filter)
      this.ambientOsc = this.ctx.createOscillator()
      this.ambientOsc.type = 'sine'
      this.ambientOsc.frequency.setValueAtTime(48, this.ctx.currentTime)

      const filter = this.ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(120, this.ctx.currentTime)

      this.ambientGain = this.ctx.createGain()
      this.ambientGain.gain.setValueAtTime(0.001, this.ctx.currentTime)
      this.ambientGain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 3.0)

      this.ambientOsc.connect(filter)
      filter.connect(this.ambientGain)
      this.ambientGain.connect(this.ctx.destination)

      this.ambientOsc.start()
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public stopAmbience() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5)
        setTimeout(() => {
          this.ambientOsc?.stop()
          this.ambientOsc?.disconnect()
          this.ambientOsc = null
        }, 550)
      } catch {
        this.ambientOsc = null
      }
    }
  }

  public playChime(freq: number = 880, volume: number = 0.05) {
    if (this.isMuted || !this.ctx) return

    try {
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, this.ctx.currentTime + 0.4)

      gain.gain.setValueAtTime(volume, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.45)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.5)
    } catch {
      // Ignore audio error
    }
  }
}

export const sound = new SoundEngine()
