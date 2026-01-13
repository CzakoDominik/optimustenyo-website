'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FaTiktok, FaInstagram, FaFacebook, FaSnapchat, 
  FaYoutube, FaSpotify, FaSoundcloud, FaEnvelope,
  FaBars, FaTimes, FaPlay, FaPause, FaStepForward, FaStepBackward
} from 'react-icons/fa';

const tracks = [
  { id: 1, title: 'Tiszatenyői Éjszakák', duration: '3:45', file: '/music/track1.mp3' },
  { id: 2, title: 'Gangster Flow', duration: '4:12', file: '/music/track2.mp3' },
  { id: 3, title: 'Utcai Legendák', duration: '3:58', file: '/music/track3.mp3' },
];

const galleryImages = [
  { id: 1, src: '/images/gallery1.jpg', alt: 'OptimusTenyo 1' },
  { id: 2, src: '/images/gallery2.jpg', alt: 'OptimusTenyo 2' },
  { id: 3, src: '/images/gallery3.jpg', alt: 'OptimusTenyo 3' },
  { id: 4, src: '/images/gallery4.jpg', alt: 'OptimusTenyo 4' },
  { id: 5, src: '/images/gallery5.jpg', alt: 'OptimusTenyo 5' },
  { id: 6, src: '/images/gallery6.jpg', alt: 'OptimusTenyo 6' },
];

const socialLinks = [
  { icon: FaTiktok, url: 'https://tiktok.com/@optimustenyo', label: 'TikTok', color: 'hover:text-[#000000]' },
  { icon: FaInstagram, url: 'https://instagram.com/optimustenyo', label: 'Instagram', color: 'hover:text-[#E4405F]' },
  { icon: FaFacebook, url: 'https://facebook.com/optimustenyo', label: 'Facebook', color: 'hover:text-[#1877F2]' },
  { icon: FaSnapchat, url: 'https://snapchat.com/add/optimustenyo', label: 'Snapchat', color: 'hover:text-[#FFFC00]' },
  { icon: FaYoutube, url: 'https://youtube.com/@optimustenyo', label: 'YouTube', color: 'hover:text-[#FF0000]' },
  { icon: FaSpotify, url: 'https://open.spotify.com/artist/optimustenyo', label: 'Spotify', color: 'hover:text-[#1DB954]' },
  { icon: FaSoundcloud, url: 'https://soundcloud.com/optimustenyo', label: 'SoundCloud', color: 'hover:text-[#FF5500]' },
  { icon: FaEnvelope, url: 'mailto:optimustenyo@example.com', label: 'Email', color: 'hover:text-rapper-gold' },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const value = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(value) ? 0 : value);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      const nextIndex = (currentTrack + 1) % tracks.length;
      setCurrentTrack(nextIndex);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log('Playback error:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextIndex);
    setProgress(0);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(err => console.log('Playback error:', err));
      }, 100);
    }
  };

  const prevTrack = () => {
    const prevIndex = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prevIndex);
    setProgress(0);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current?.play().catch(err => console.log('Playback error:', err));
      }, 100);
    }
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setProgress(0);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch(err => console.log('Playback error:', err));
    }, 100);
  };

  return (
    <div className="min-h-screen smoke-bg">
      <nav className="sticky top-0 z-50 bg-rapper-dark/90 backdrop-blur-sm border-b border-rapper-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="text-2xl font-bold text-rapper-gold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              OPTIMUSTENYO
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className="text-gray-300 hover:text-rapper-gold transition">Főoldal</a>
              <a href="#music" className="text-gray-300 hover:text-rapper-gold transition">Zene</a>
              <a href="#gallery" className="text-gray-300 hover:text-rapper-gold transition">Galéria</a>
              <a href="#social" className="text-gray-300 hover:text-rapper-gold transition">Social</a>
              <Link href="/wanted" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-bold">
                KÖRÖZÉS
              </Link>
            </div>

            <button 
              className="md:hidden text-rapper-gold text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-rapper-gray/95 backdrop-blur-sm"
            >
              <div className="px-4 py-4 space-y-3">
                <a href="#hero" className="block text-gray-300 hover:text-rapper-gold transition" onClick={() => setMobileMenuOpen(false)}>Főoldal</a>
                <a href="#music" className="block text-gray-300 hover:text-rapper-gold transition" onClick={() => setMobileMenuOpen(false)}>Zene</a>
                <a href="#gallery" className="block text-gray-300 hover:text-rapper-gold transition" onClick={() => setMobileMenuOpen(false)}>Galéria</a>
                <a href="#social" className="block text-gray-300 hover:text-rapper-gold transition" onClick={() => setMobileMenuOpen(false)}>Social</a>
                <Link href="/wanted" className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-bold text-center" onClick={() => setMobileMenuOpen(false)}>
                  KÖRÖZÉS
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-rapper-gold rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="w-48 h-48 mx-auto bg-rapper-purple rounded-full flex items-center justify-center text-8xl border-4 border-rapper-gold shadow-[0_0_30px_rgba(255,215,0,0.5)]">
              🎤
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl sm:text-8xl font-bold text-rapper-gold mb-4 glitch"
          >
            OPTIMUSTENYO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl sm:text-3xl text-gray-300 mb-2"
          >
            Magyar Gangster Rapper
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-rapper-gold mb-8"
          >
            📍 Tiszatenyő
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="#music" 
              className="bg-rapper-gold hover:bg-yellow-500 text-rapper-dark px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105"
            >
              Hallgasd a Zenéket
            </a>
            <Link 
              href="/wanted" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition transform hover:scale-105"
            >
              KÖRÖZÉSI LISTA
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="music" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-rapper-gold text-center mb-12 neon-text"
          >
            🎵 Zenék
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-rapper-gray/50 backdrop-blur-sm rounded-2xl p-8 border border-rapper-gold/20"
          >
            <div className="flex items-center gap-6 mb-8">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                className="w-24 h-24 bg-rapper-purple rounded-full flex items-center justify-center text-4xl border-4 border-rapper-gold shadow-lg"
              >
                💿
              </motion.div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-rapper-gold">{tracks[currentTrack].title}</h3>
                <p className="text-gray-400">{tracks[currentTrack].duration}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="w-full bg-rapper-dark rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-rapper-gold to-rapper-purple h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex justify-center items-center gap-6 mb-8">
              <button
                onClick={prevTrack}
                className="text-rapper-gold hover:text-yellow-500 text-3xl transition transform hover:scale-110"
              >
                <FaStepBackward />
              </button>
              <button
                onClick={togglePlay}
                className="bg-rapper-gold hover:bg-yellow-500 text-rapper-dark w-16 h-16 rounded-full flex items-center justify-center text-2xl transition transform hover:scale-110"
              >
                {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
              </button>
              <button
                onClick={nextTrack}
                className="text-rapper-gold hover:text-yellow-500 text-3xl transition transform hover:scale-110"
              >
                <FaStepForward />
              </button>
            </div>

            <div className="space-y-2">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    currentTrack === index
                      ? 'bg-rapper-gold/20 border border-rapper-gold'
                      : 'hover:bg-rapper-dark/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${currentTrack === index ? 'text-rapper-gold' : 'text-gray-300'}`}>
                      {track.title}
                    </span>
                    <span className="text-gray-400 text-sm">{track.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          <audio ref={audioRef} src={tracks[currentTrack].file} />
        </div>
      </section>

      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-rapper-gold text-center mb-12 neon-text"
          >
            📸 Galéria
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square bg-rapper-gray rounded-xl overflow-hidden group cursor-pointer border-2 border-rapper-gold/20 hover:border-rapper-gold/60 transition"
                onClick={() => setLightboxImage(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rapper-gold/20 to-rapper-purple/20 flex items-center justify-center text-6xl">
                  🎤
                </div>
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <p className="text-white text-xl font-bold">Click to view</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {lightboxImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setLightboxImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl w-full aspect-square bg-rapper-gray rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rapper-gold/20 to-rapper-purple/20 flex items-center justify-center text-9xl">
                  🎤
                </div>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 text-white text-3xl hover:text-rapper-gold transition"
                >
                  <FaTimes />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section id="social" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-rapper-gold text-center mb-12 neon-text"
          >
            🔗 Kövess
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-rapper-gray/50 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center justify-center gap-3 border border-rapper-gold/20 hover:border-rapper-gold transition text-gray-300 ${social.color} transform hover:scale-110`}
              >
                <social.icon className="text-5xl" />
                <span className="font-medium">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-rapper-dark/50 border-t border-rapper-gold/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 OptimusTenyo | Tiszatenyő 🔥
          </p>
        </div>
      </footer>
    </div>
  );
}
