import { Component, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

const GalleryPage: Component = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const navigate = useNavigate();

  return (
    <div class="min-h-screen bg-black text-white">
      {/* Header */}
      <header class="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-yellow-500/20">
        <nav class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 bg--500 rounded-lg flex items-center justify-center overflow-hidden">
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
                onClick={() => navigate('/')}
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
      onClick={() => navigate('/sewamotor')}
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
                onClick={() => navigate('/')}
                class="text-left hover:text-yellow-500 transition-colors"
              >
                TENTANG KAMI
              </button>
              <button 
                onClick={() => navigate('/sewamotor')}
                class="text-left hover:text-yellow-500 transition-colors"
              >
                ORDER
              </button>
              <button 
                onClick={() => navigate('/orderan')}
                class="text-left hover:text-yellow-500 transition-colors"
              >
                RIWAYAT
              </button>
              <button 
                onClick={() => navigate('/profil')}
                class="text-left hover:text-yellow-500 transition-colors"
              >
                PROFIL
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main class="max-w-7xl mx-auto px-6 py-16 pt-24">
        <h1 class="text-5xl font-bold text-center text-yellow-400 mb-16">
          Gallery Motor
        </h1>

        {/* Gallery Content */}
        <div class="grid md:grid-cols-3 gap-8">
          {/* Beat Gallery */}
          <div class="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
            <div class="aspect-video bg-gray-800 relative overflow-hidden">
              <img 
                src="/src/assets/beat.jpg" 
                alt="Honda Beat"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-yellow-500 mb-2">Honda Beat</h3>
              <p class="text-gray-300">Motor matic yang cocok untuk kebutuhan harian dengan konsumsi BBM yang irit.</p>
            </div>
          </div>

          {/* Vario Gallery */}
          <div class="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
            <div class="aspect-video bg-gray-800 relative overflow-hidden">
              <img 
                src="/src/assets/vario.jpg" 
                alt="Honda Vario 125"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-yellow-500 mb-2">Honda Vario 125</h3>
              <p class="text-gray-300">Motor sporty dengan performa tinggi, cocok untuk perjalanan jauh.</p>
            </div>
          </div>

          {/* Scoopy Gallery */}
          <div class="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
            <div class="aspect-video bg-gray-800 relative overflow-hidden">
              <img 
                src="/src/assets/scoopy.jpg" 
                alt="Honda Scoopy"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-yellow-500 mb-2">Honda Scoopy</h3>
              <p class="text-gray-300">Motor stylish yang nyaman, terutama untuk wanita dengan desain yang menarik.</p>
            </div>
          </div>

          {/* Beat Street */}
          <div class="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
            <div class="aspect-video bg-gray-800 relative overflow-hidden">
              <img 
                src="/src/assets/beat-street-1.png" 
                alt="Honda Beat Street"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-yellow-500 mb-2">Honda Beat Street</h3>
              <p class="text-gray-300">Varian sport dari Beat dengan desain yang lebih agresif dan performa optimal.</p>
            </div>
          </div>

          {/* Vario 160 */}
          <div class="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
            <div class="aspect-video bg-gray-800 relative overflow-hidden">
              <img 
                src="/src/assets/Vario 160 ABS_LWO_BK.png" 
                alt="Honda Vario 160"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-yellow-500 mb-2">Honda Vario 160</h3>
              <p class="text-gray-300">Upgrade dari Vario 125 dengan mesin yang lebih bertenaga untuk performa maksimal.</p>
            </div>
          </div>

          {/* Scoopy Stylish */}
          <div class="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
            <div class="aspect-video bg-gray-800 relative overflow-hidden">
              <img 
                src="/src/assets/genio.png" 
                alt="Honda Genio"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-yellow-500 mb-2">Honda Genio</h3>
              <p class="text-gray-300">Edisi khusus Scoopy dengan fitur tambahan dan desain yang lebih elegan.</p>
            </div>
          </div>

          {/* Beat FI */}
          <div class="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
            <div class="aspect-video bg-gray-800 relative overflow-hidden">
              <img 
                src="/src/assets/cbr.png" 
                alt="Honda cbr 150"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-yellow-500 mb-2">Honda Cbr 150</h3>
              <p class="text-gray-300">Beat dengan teknologi Fuel Injection untuk efisiensi bahan bakar yang lebih baik.</p>
            </div>
          </div>

          {/* Vario Techno */}
          <div class="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
            <div class="aspect-video bg-gray-800 relative overflow-hidden">
              <img 
                src="/src/assets/Mio-M3-Metallic-Red-1.png" 
                alt="Honda Vario Techno"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-yellow-500 mb-2">Mio M3</h3>
              <p class="text-gray-300">Vario dengan teknologi terdepan dan fitur-fitur canggih untuk kenyamanan berkendara.</p>
            </div>
          </div>

          {/* Scoopy Fashion */}
          <div class="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
            <div class="aspect-video bg-gray-800 relative overflow-hidden">
              <img 
                src="/src/assets/Sprint-S-White-Innocente.png" 
                alt="Vespa"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-yellow-500 mb-2">Honda Scoopy Fashion</h3>
              <p class="text-gray-300">Scoopy dengan warna dan aksesoris fashion terbaru untuk tampil lebih menarik.</p>
            </div>
          </div>

          {/* Beat ESP */}
          <div class="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
            <div class="aspect-video bg-gray-800 relative overflow-hidden">
              <img 
                src="/src/assets/beat.jpg" 
                alt="Honda Beat ESP"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-yellow-500 mb-2">Honda Beat ESP</h3>
              <p class="text-gray-300">Beat dengan Enhanced Smart Power untuk performa yang lebih responsif dan efisien.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer class="bg-gray-900 py-12 border-t border-yellow-500/20">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-3 gap-8">
            <div>
              <div class="flex items-center space-x-2 mb-4">
                <div class="w-10 h-10  rounded-lg flex items-center justify-center overflow-hidden">
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

export default GalleryPage;
