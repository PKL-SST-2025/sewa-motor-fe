import { Component, createSignal, For } from 'solid-js';
import { useNavigate } from '@solidjs/router';

interface MotorOption {
  id: string;
  name: string;
  price: string;
  image: string;
  features: string[];
}

const App: Component = () => {
  const [selectedMotor, setSelectedMotor] = createSignal<string>('');
  const navigate = useNavigate();

  const motorOptions: MotorOption[] = [
    {
      id: 'beat-new',
      name: 'BEAT NEW',
      price: 'Rp 50.000/hari',
      image: '/assets/beat.jpg',
      features: ['Matic', 'Irit BBM', 'Cocok untuk Harian']
    },
    {
      id: 'vario-125',
      name: 'VARIO 125',
      price: 'Rp 65.000/hari',
      image: '/assets/vario.jpg',
      features: ['Matic', 'Sporty', 'Performa Tinggi']
    },
    {
      id: 'scoopy',
      name: 'SCOOPY',
      price: 'Rp 55.000/hari',
      image: '/assets/scoopy.jpg',
      features: ['Matic', 'Stylish', 'Nyaman untuk Wanita']
    },
    {
      id: 'beat-street',
      name: 'BEAT STREET',
      price: 'Rp 60.000/hari',
      image: '/assets/beat-street-1.png',
      features: ['Matic', 'Sport Design', 'Agresif']
    },
    {
      id: 'vario-160',
      name: 'VARIO 160',
      price: 'Rp 75.000/hari',
      image: '/assets/Vario 160 ABS_LWO_BK.png',
      features: ['Matic', 'ABS', 'Performa Maksimal']
    },
    {
      id: 'genio',
      name: 'HONDA GENIO',
      price: 'Rp 58.000/hari',
      image: '/assets/genio.png',
      features: ['Matic', 'Stylish', 'Modern Design']
    },
    {
      id: 'cbr-150',
      name: 'CBR 150',
      price: 'Rp 85.000/hari',
      image: '/assets/cbr.png',
      features: ['Sport', 'Manual', 'Racing Style']
    },
    {
      id: 'mio-m3',
      name: 'MIO M3',
      price: 'Rp 45.000/hari',
      image: '/assets/Mio-M3-Metallic-Red-1.png',
      features: ['Matic', 'Ekonomis', 'Yamaha Quality']
    },
    {
      id: 'vespa-sprint',
      name: 'VESPA SPRINT',
      price: 'Rp 95.000/hari',
      image: '/assets/Sprint-S-White-Innocente.png',
      features: ['Classic', 'Premium', 'Italian Style']
    }
  ];

  const handleRentalClick = (motorId: string) => {
    setSelectedMotor(motorId);
    console.log(`Selected motor: ${motorId}`);
  };

  return (
    <div class="min-h-screen bg-black text-white">
      {/* Header */}
      <header class="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-yellow-500/20">
        <nav class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10 bg-500 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src="/assets/nasi gigit.png" 
                  alt="Logo" 
                  class="w-full h-full object-cover"
                />
              </div>
              <span class="text-xl font-bold text-yellow-500">SENTOR | SEWA MOTOR</span>
            </div>
            
            <div class="hidden md:flex space-x-8">
              <a href="/" class="hover:text-yellow-500 transition-colors">TENTANG KAMI</a>
              <button 
                onClick={() => navigate('/sewamotor')}
                class="hover:text-yellow-500 transition-colors"
              >
                ORDER
              </button>
              <a href="/orderan" class="hover:text-yellow-500 transition-colors">RIWAYAT </a>
              <a href="/profil" class="hover:text-yellow-500 transition-colors">PROFIL</a>
            </div>

            <button 
              class="md:hidden text-yellow-500"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main class="max-w-7xl mx-auto px-6 py-16 pt-24">
        <h1 class="text-5xl font-bold text-center text-yellow-400 mb-16">
          Pilihan Motor
        </h1>

        {/* Motor Selection */}
        <section id="motors" class="py-8">
          <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8">
              <For each={motorOptions}>
                {(motor) => (
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
                      
                      <button 
                        onClick={() => {
                          handleRentalClick(motor.id);
                          navigate('/sewa');
                        }}
                        class={`w-full py-3 rounded-lg font-semibold transition-colors ${
                          selectedMotor() === motor.id
                            ? 'bg-yellow-600 text-black'
                            : 'bg-yellow-500 text-black hover:bg-yellow-400'
                        }`}
                      >
                        PILIH MOTOR INI
                      </button>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </section>

        {/* Selected Motor Display */}
        {selectedMotor() && (
          <div class="mt-16 text-center">
            <div class="bg-gray-800 rounded-xl p-8 max-w-md mx-auto">
              <h3 class="text-xl font-bold text-yellow-400 mb-2">Motor Terpilih:</h3>
              <p class="text-2xl font-semibold text-white">
                {motorOptions.find(m => m.id === selectedMotor())?.name}
              </p>
              <p class="text-lg text-gray-300 mt-2">
                {motorOptions.find(m => m.id === selectedMotor())?.price}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer class="bg-gray-800 py-8 px-6 mt-16">
        <div class="max-w-7xl mx-auto text-center">
          <p class="text-gray-400">
            © 2025 Sentor Sewa Motor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
