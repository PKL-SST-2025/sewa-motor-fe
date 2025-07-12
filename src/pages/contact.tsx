import { Component, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

const ContactPage: Component = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const [formData, setFormData] = createSignal({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Pesan Anda telah terkirim! Kami akan menghubungi Anda segera.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div class="min-h-screen bg-black text-white">
      {/* Header */}
      <header class="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-yellow-500/20">
        <nav class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 bg--500 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/assets/nasi gigit.png" 
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
          Contact Person
        </h1>

        <div class="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div class="space-y-8">
            <div class="bg-gray-900 rounded-xl p-8 border border-gray-700">
              <h2 class="text-2xl font-bold text-yellow-500 mb-6">Informasi Kontak</h2>
              
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-yellow-500">Telepon / WhatsApp</h3>
                    <p class="text-gray-300">+62 882-003-746-145</p>
                    <p class="text-sm text-gray-400">Tersedia 24/7 untuk konsultasi</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-yellow-500">Alamat</h3>
                    <p class="text-gray-300">Purwokerto, Jawa Tengah</p>
                    <p class="text-sm text-gray-400">Melayani seluruh area Purwokerto</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-yellow-500">Jam Operasional</h3>
                    <p class="text-gray-300">24/7 Available</p>
                    <p class="text-sm text-gray-400">Siap melayani kapan saja</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-yellow-500">Email</h3>
                    <p class="text-gray-300">sentor.rental@gmail.com</p>
                    <p class="text-sm text-gray-400">Untuk pertanyaan dan booking</p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div class="mt-8 space-y-4">
                <button 
                  onClick={() => window.open('https://wa.me/6288200374645', '_blank')}
                  class="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488"/>
                  </svg>
                  <span>Chat WhatsApp</span>
                </button>
                
                <button 
                  onClick={() => window.open('tel:+6288200374645', '_blank')}
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>Telepon Sekarang</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div class="bg-gray-900 rounded-xl p-8 border border-gray-700">
            <h2 class="text-2xl font-bold text-yellow-500 mb-6">Kirim Pesan</h2>
            
            <form onSubmit={handleSubmit} class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData().name}
                  onInput={(e) => updateForm('name', e.currentTarget.value)}
                  required
                  class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData().email}
                  onInput={(e) => updateForm('email', e.currentTarget.value)}
                  required
                  class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  placeholder="contoh@email.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  value={formData().phone}
                  onInput={(e) => updateForm('phone', e.currentTarget.value)}
                  required
                  class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">
                  Pesan
                </label>
                <textarea
                  value={formData().message}
                  onInput={(e) => updateForm('message', e.currentTarget.value)}
                  required
                  rows="5"
                  class="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none resize-none"
                  placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                ></textarea>
              </div>

              <button
                type="submit"
                class="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>

        {/* Service Areas */}
        <div class="mt-16 bg-gray-900 rounded-xl p-8 border border-gray-700">
          <h2 class="text-2xl font-bold text-yellow-500 mb-6 text-center">Area Layanan</h2>
          <div class="grid md:grid-cols-4 gap-4">
            <div class="bg-yellow-500 text-black px-4 py-3 rounded-lg text-center font-semibold">
              Purwokerto Utara
            </div>
            <div class="bg-yellow-500 text-black px-4 py-3 rounded-lg text-center font-semibold">
              Purwokerto Selatan
            </div>
            <div class="bg-yellow-500 text-black px-4 py-3 rounded-lg text-center font-semibold">
              Purwokerto Barat
            </div>
            <div class="bg-yellow-500 text-black px-4 py-3 rounded-lg text-center font-semibold">
              Purwokerto Timur
            </div>
          </div>
          <p class="text-center text-gray-400 mt-4">
            Pengantaran gratis untuk rental minimal 3 hari
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer class="bg-gray-900 py-12 border-t border-yellow-500/20">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-3 gap-8">
            <div>
              <div class="flex items-center space-x-2 mb-4">
                <div class="w-10 h-10 bg--500 rounded-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/nasi gigit.png" 
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

export default ContactPage;
