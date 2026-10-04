import { PushNotificationItem } from '../types';

class NotificationService {
  private audioCtx: AudioContext | null = null;

  public requestPermission = async (): Promise<boolean> => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        return perm === 'granted';
      } catch {
        return false;
      }
    }
    return false;
  };

  public playChime = () => {
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      if (this.audioCtx) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        // Pleasant Islamic chime chord progression (F# - A# - C# harmonic)
        osc.frequency.setValueAtTime(587.33, this.audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880.0, this.audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.4);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  };

  public triggerPush = (title: string, message: string, type: 'FINANCE' | 'DAKWAH_UPDATE' | 'AUDIT' | 'INVESTOR_ALERT' = 'FINANCE'): PushNotificationItem => {
    this.playChime();

    // Trigger system browser notification if permitted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`🕌 Kaffah Ventures: ${title}`, {
          body: message,
          icon: '/favicon.ico',
        });
      } catch {
        // Ignored
      }
    }

    return {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      title,
      message,
      type,
      timestamp: 'Baru saja',
      read: false,
    };
  };
}

export const notificationService = new NotificationService();
