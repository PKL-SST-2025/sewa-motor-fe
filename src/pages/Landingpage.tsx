import { Component, createSignal, onMount } from 'solid-js';
import { For } from 'solid-js';
import { useNavigate } from '@solidjs/router';

interface MotorOption {
  id: string;
  name: string;
  image: string;
  price: string;
  features: string[];
}

const App: Component = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const [selectedMotor, setSelectedMotor] = createSignal<string>('');
  const [currentSlide, setCurrentSlide] = createSignal(0);

  const navigate = useNavigate();
  

  const motorOptions: MotorOption[] = [
    {
      id: 'beat',
      name: 'BEAT NEW',
      image: '/src/assets/beat.jpg',
      price: 'Rp 50.000/hari',
      features: ['Matic', 'Irit BBM', 'Cocok untuk Harian']
    },
    {
      id: 'vario',
      name: 'VARIO 125',
      image: '/src/assets/vario.jpg',
      price: 'Rp 65.000/hari',
      features: ['Matic', 'Sporty', 'Performa Tinggi']
    },
    {
      id: 'scoopy',
      name: 'SCOOPY',
      image: '/src/assets/scoopy.jpg',
      price: 'Rp 55.000/hari',
      features: ['Matic', 'Stylish', 'Nyaman untuk Wanita']
    },
    {
      id: 'beat-street',
      name: 'BEAT STREET',
      image: '/src/assets/beat-street-1.png',
      price: 'Rp 60.000/hari',
      features: ['Matic', 'Sport Design', 'Agresif']
    },
    {
      id: 'vario-160',
      name: 'VARIO 160',
      image: '/src/assets/Vario 160 ABS_LWO_BK.png',
      price: 'Rp 75.000/hari',
      features: ['Matic', 'ABS', 'Performa Maksimal']
    },
    {
      id: 'genio',
      name: 'HONDA GENIO',
      image: '/src/assets/genio.png',
      price: 'Rp 58.000/hari',
      features: ['Matic', 'Stylish', 'Modern Design']
    }
  ];

  const itemsPerPage = 3;
  const maxSlide = Math.max(0, Math.ceil(motorOptions.length / itemsPerPage) - 1);

  const nextSlide = () => {
    setCurrentSlide(prev => prev < maxSlide ? prev + 1 : 0);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev > 0 ? prev - 1 : maxSlide);
  };

  const getVisibleMotors = () => {
    const startIndex = currentSlide() * itemsPerPage;
    return motorOptions.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleRentalClick = () => {
    // Redirect to login page for rental booking
    navigate('/login');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div class="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header class="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-yellow-500/20">
        <nav class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/src/assets/nasi gigit.png" 
                  alt="Logo" 
                  class="w-full h-full object-cover"
                />
              </div>
              <span class="text-xl font-bold text-yellow-500">SENTOR | SEWA MOTOR</span>
            </div>
            
            <div class="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                class="hover:text-yellow-500 transition-colors"
              >
                HOME
              </button>
              <button 
                onClick={() => navigate('/contact')}
                class="hover:text-yellow-500 transition-colors"
              >
                CONTAC PERSON
              </button>
              <button 
                onClick={() => navigate('/gallery')}
                class="hover:text-yellow-500 transition-colors"
              >
                GALLERY
              </button>
              <button
      onClick={() => navigate('/login')}
      class="bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-400 transition-colors"
    >
      SEWA
    </button>
            </div>

            <button 
              class="md:hidden text-yellow-500"
              onClick={() => setIsMenuOpen(!isMenuOpen())}
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div class={`md:hidden mt-4 ${isMenuOpen() ? 'block' : 'hidden'}`}>
            <div class="flex flex-col space-y-4 pb-4">
              <button 
                onClick={() => scrollToSection('home')}
                class="text-left hover:text-yellow-500 transition-colors"
              >
                HOME
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                class="text-left hover:text-yellow-500 transition-colors"
              >
                CONTAC PERSON
              </button>
              <button 
                onClick={() => navigate('/gallery')}
                class="text-left hover:text-yellow-500 transition-colors"
              >
                GALLERY
              </button>
              <button 
                onClick={() => navigate('/login')}
                class="bg-yellow-500 text-black px-6 py-2 rounded-full hover:bg-yellow-400 transition-colors w-fit"
              >
                SEWA
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
        <div 
          class="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style="background-image: url('/api/placeholder/1920/1080')"
        ></div>
        
        <div class="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span class="text-yellow-500">RENTAL MOTOR</span><br/>
            <span class="text-white">Bebaskan Perjalananmu, </span><br/>
            <span class="text-white">Mulai  dari Satu Tarikan Gas!</span>
          </h1>
          
          <p class="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Solusi terpercaya untuk kebutuhan transportasi Anda di Purwokerto. 
            Motor berkualitas, harga terjangkau, pelayanan terbaik.
          </p>
          
          <button 
            onClick={() => navigate('/login')}
            class="bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
          >
            SEWA SEKARANG
          </button>
        </div>

        {/* Scroll Indicator */}
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div class="w-6 h-10 border-2 border-yellow-500 rounded-full flex justify-center">
            <div class="w-1 h-3 bg-yellow-500 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section class="py-20 bg-gray-900">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="order-2 md:order-1">
              <div class="bg-black border-2 border-yellow-500 rounded-3xl p-8 text-center">
                <h2 class="text-2xl md:text-3xl font-bold mb-4">
                  <span class="text-yellow-500">Mudah, Praktis, dan Hemat:</span><br/>
                  <span class="text-white">Solusi Rental Motor Cepat</span>
                </h2>
                <h3 class="text-3xl md:text-4xl font-bold text-yellow-500 mb-6">
                  RENTAL SEKARANG
                </h3>
                <p class="text-gray-300 mb-6">Mulai dari 60rb/hari</p>
                <button 
                  onClick={() => navigate('/login')}
                  class="bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
                >
                  SEWA
                </button>
              </div>
            </div>
            
            <div class="order-1 md:order-2">
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-yellow-500 text-black p-6 rounded-lg text-center">
                  <h4 class="font-bold mb-2">FREE DELIVERY</h4>
                  <p class="text-sm">Antar langsung ke lokasi Anda</p>
                </div>
                <div class="bg-yellow-500 text-black p-6 rounded-lg text-center">
                  <h4 class="font-bold mb-2">SECURE TRANSACTION</h4>
                  <p class="text-sm">Transaksi aman dan terpercaya</p>
                </div>
                <div class="bg-yellow-500 text-black p-6 rounded-lg text-center">
                  <h4 class="font-bold mb-2">24/7 SUPPORT</h4>
                  <p class="text-sm">Bantuan kapan saja dibutuhkan</p>
                </div>
                <div class="bg-yellow-500 text-black p-6 rounded-lg text-center">
                  <h4 class="font-bold mb-2">FLEXIBLE</h4>
                  <p class="text-sm">Rental harian, mingguan, bulanan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Motor Selection */}
      <section id="motors" class="py-20 bg-black">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
            <span class="text-yellow-500">Pilihan Motor</span>
          </h2>
          
          {/* Carousel Container */}
          <div class="relative">
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-yellow-500 hover:bg-yellow-400 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              disabled={motorOptions.length <= itemsPerPage}
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <button 
              onClick={nextSlide}
              class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-yellow-500 hover:bg-yellow-400 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              disabled={motorOptions.length <= itemsPerPage}
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            {/* Motor Cards */}
            <div class="overflow-hidden mx-12">
              <div 
                class="flex transition-transform duration-500 ease-in-out"
                style={`transform: translateX(-${currentSlide() * 100}%)`}
              >
                <For each={motorOptions}>
                  {(motor) => (
                    <div class="w-full md:w-1/3 flex-shrink-0 px-4">
                      <div class="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
                        <div class="aspect-video bg-gray-800 relative overflow-hidden">
                          <img 
                            src={motor.image} 
                            alt={motor.name}
                            class="w-full h-full object-cover"
                          />
                          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                        
                        <div class="p-6">
                          <h3 class="text-xl font-bold text-yellow-500 mb-2">{motor.name}</h3>
                          <p class="text-2xl font-bold text-white mb-4">{motor.price}</p>
                          
                          <ul class="space-y-2 mb-6">
                            <For each={motor.features}>
                              {(feature) => (
                                <li class="flex items-center text-gray-300">
                                  <span class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                                  {feature}
                                </li>
                              )}
                            </For>
                          </ul>
                          
                          
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              </div>
            </div>

            {/* Slide Indicators */}
            <div class="flex justify-center mt-8 space-x-2">
              <For each={Array(maxSlide + 1).fill(0)}>
                {(_, index) => (
                  <button
                    onClick={() => setCurrentSlide(index())}
                    class={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentSlide() === index() 
                        ? 'bg-yellow-500 scale-125' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                )}
              </For>
            </div>
          </div>

          {/* View All Motors Button */}
          <div class="text-center mt-12">
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section class="py-20 bg-gray-900">
        <div class="container mx-auto px-4 text-center">
          <div class="max-w-2xl mx-auto">
            <div class="bg-black border-2 border-yellow-500 rounded-3xl p-8">
              <p class="text-lg mb-4 text-gray-300">Tersedia di Purwokerto</p>
              <h2 class="text-4xl md:text-5xl font-bold text-yellow-500 mb-6">
                Purwokerto
              </h2>
              <p class="text-gray-300 mb-6">
                Melayani seluruh area Purwokerto dan sekitarnya. 
                Pengantaran gratis untuk rental minimal 3 hari.
              </p>
              <div class="flex flex-wrap justify-center gap-4 text-sm">
                <span class="bg-yellow-500 text-black px-4 py-2 rounded-full">Purwokerto Utara</span>
                <span class="bg-yellow-500 text-black px-4 py-2 rounded-full">Purwokerto Selatan</span>
                <span class="bg-yellow-500 text-black px-4 py-2 rounded-full">Purwokerto Barat</span>
                <span class="bg-yellow-500 text-black px-4 py-2 rounded-full">Purwokerto Timur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" class="py-20 bg-black">
        <div class="container mx-auto px-4 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-8">
            <span class="text-white">Siap untuk </span>
            <span class="text-yellow-500">Petualangan Anda?</span>
          </h2>
          <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk booking motor pilihan Anda. 
            Proses cepat, harga transparan, motor terawat.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleRentalClick}
              class="bg-yellow-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-400 transform hover:scale-105 transition-all duration-300"
            >
              📱 WhatsApp Sekarang
            </button>
            <button 
              onClick={() => navigate('/login')}
              class="border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-500 hover:text-black transition-all duration-300"
            >
              Lihat Semua Motor
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-gray-900 py-12 border-t border-yellow-500/20">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-3 gap-8">
            <div>
              <div class="flex items-center space-x-2 mb-4">
                <div class="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/src/assets/nasi gigit.png" 
                    alt="Logo" 
                    class="w-full h-full object-cover"
                  />
                </div>
                <span class="text-xl font-bold text-yellow-500">SENTOR</span>
              </div>
              <p class="text-gray-400">
                Rental motor terpercaya di Purwokerto. 
                Kualitas terbaik, harga terjangkau.
              </p>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold text-yellow-500 mb-4">Layanan</h4>
              <ul class="space-y-2 text-gray-400">
                <li>Rental Harian</li>
                <li>Rental Mingguan</li>
                <li>Rental Bulanan</li>
                <li>Antar Jemput</li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-lg font-semibold text-yellow-500 mb-4">Kontak</h4>
              <ul class="space-y-2 text-gray-400">
                <li>📍 Purwokerto, Jawa Tengah</li>
                <li>📱 +62 882-003-746-145</li>
                <li>⏰ 24/7 Available</li>
              </ul>
            </div>
          </div>
          
          <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Sentor Sewa Motor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;