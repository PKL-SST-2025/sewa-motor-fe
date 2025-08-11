import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

interface FormData {
  namaLengkap: string;
  username: string;
  email: string;
  nomorTelepon: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const [formData, setFormData] = createSignal<FormData>({
    namaLengkap: '',
    username: '',
    email: '',
    nomorTelepon: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = createSignal(false);
  const [errors, setErrors] = createSignal<Partial<FormData>>({});

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors()[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

    const navigate = useNavigate();
    
  const validateForm = (): boolean => {
    const data = formData();
    const newErrors: Partial<FormData> = {};

    if (!data.namaLengkap.trim()) {
      newErrors.namaLengkap = 'Nama lengkap wajib diisi';
    }

    if (!data.username.trim()) {
      newErrors.username = 'Username wajib diisi';
    } else if (data.username.length < 3) {
      newErrors.username = 'Username minimal 3 karakter';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!data.nomorTelepon.trim()) {
      newErrors.nomorTelepon = 'Nomor telepon wajib diisi';
    } else if (!/^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(data.nomorTelepon)) {
      newErrors.nomorTelepon = 'Format nomor telepon tidak valid';
    }

    if (!data.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (data.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsLoading(true);
  setErrors({});

  try {
    console.log('=== REGISTER ATTEMPT ===');
    console.log('Form data:', formData());
    
    // Try different possible register endpoints
    const endpoints = [
      'http://localhost:8000/api/auth/register',
      'http://localhost:8000/auth/register', 
      'http://localhost:8000/api/register',
      'http://localhost:8000/register'
    ];
    
    let registerSuccess = false;
    let lastError = '';
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying register endpoint: ${endpoint}`);
        
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: formData().namaLengkap,
            username: formData().username,
            email: formData().email,
            phone: formData().nomorTelepon,
            password: formData().password,
            // Alternative field names
            nama: formData().namaLengkap,
            no_hp: formData().nomorTelepon
          }),
        });

        console.log(`${endpoint} - Response status:`, res.status);

        if (res.ok) {
          console.log('Register successful at', endpoint);
          navigate("/login");
          registerSuccess = true;
          break;
        } else {
          const errorData = await res.text();
          console.log(`${endpoint} failed:`, res.status, errorData);
          lastError = `${endpoint}: ${res.status} - ${errorData}`;
        }
      } catch (err) {
        console.log(`Error with ${endpoint}:`, err);
        lastError = `${endpoint}: ${(err as Error).message}`;
      }
    }
    
    if (!registerSuccess) {
      throw new Error(`Register gagal di semua endpoint. Last error: ${lastError}`);
    }

  } catch (error) {
    console.error('Register error:', error);
    // tampilkan error umum
    setErrors({ email: (error as Error).message });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div class="min-h-screen bg-black flex">
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
                TENTANG KAMI
              </button>
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

      {/* Left Side - Registration Form */}
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 pt-24 overflow-y-auto">
        <div class="w-full max-w-md">
          <div class="mb-8">
            <h2 class="text-white text-3xl font-bold mb-2">Daftar Akun</h2>
            <p class="text-gray-400">Buat akun baru untuk mulai menyewa motor.</p>
          </div>

          <div class="space-y-5">
            <div>
              <label for="namaLengkap" class="block text-white text-sm font-medium mb-2">
                Nama Lengkap
              </label>
              <input
                id="namaLengkap"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData().namaLengkap}
                onInput={(e) => updateField('namaLengkap', e.currentTarget.value)}
                class={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all ${
                  errors().namaLengkap ? 'border-red-500' : 'border-gray-600'
                }`}
                required
              />
              {errors().namaLengkap && (
                <p class="text-red-400 text-xs mt-1">{errors().namaLengkap}</p>
              )}
            </div>

            <div>
              <label for="username" class="block text-white text-sm font-medium mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Pilih username unik"
                value={formData().username}
                onInput={(e) => updateField('username', e.currentTarget.value)}
                class={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all ${
                  errors().username ? 'border-red-500' : 'border-gray-600'
                }`}
                required
              />
              {errors().username && (
                <p class="text-red-400 text-xs mt-1">{errors().username}</p>
              )}
            </div>

            <div>
              <label for="email" class="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={formData().email}
                onInput={(e) => updateField('email', e.currentTarget.value)}
                class={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all ${
                  errors().email ? 'border-red-500' : 'border-gray-600'
                }`}
                required
              />
              {errors().email && (
                <p class="text-red-400 text-xs mt-1">{errors().email}</p>
              )}
            </div>

            <div>
              <label for="nomorTelepon" class="block text-white text-sm font-medium mb-2">
                Nomor Telepon
              </label>
              <input
                id="nomorTelepon"
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={formData().nomorTelepon}
                onInput={(e) => updateField('nomorTelepon', e.currentTarget.value)}
                class={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all ${
                  errors().nomorTelepon ? 'border-red-500' : 'border-gray-600'
                }`}
                required
              />
              {errors().nomorTelepon && (
                <p class="text-red-400 text-xs mt-1">{errors().nomorTelepon}</p>
              )}
            </div>

            <div>
              <label for="password" class="block text-white text-sm font-medium mb-2">
                Kata Sandi
              </label>
              <input
                id="password"
                type="password"
                placeholder="Minimal 6 karakter"
                value={formData().password}
                onInput={(e) => updateField('password', e.currentTarget.value)}
                class={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all ${
                  errors().password ? 'border-red-500' : 'border-gray-600'
                }`}
                required
              />
              {errors().password && (
                <p class="text-red-400 text-xs mt-1">{errors().password}</p>
              )}
            </div>

            <div>
              <label for="confirmPassword" class="block text-white text-sm font-medium mb-2">
                Konfirmasi Kata Sandi
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Ulangi kata sandi"
                value={formData().confirmPassword}
                onInput={(e) => updateField('confirmPassword', e.currentTarget.value)}
                class={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all ${
                  errors().confirmPassword ? 'border-red-500' : 'border-gray-600'
                }`}
                required
              />
              {errors().confirmPassword && (
                <p class="text-red-400 text-xs mt-1">{errors().confirmPassword}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading()}
              class="w-full bg-yellow-400 text-black font-bold py-4 px-6 rounded-xl hover:bg-yellow-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading() ? (
                <div class="flex items-center justify-center space-x-2">
                  <div class="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>Mendaftar...</span>
                </div>
              ) : (
                'Daftar Sekarang'
              )}
              
            </button>

            <div class="text-center">
              <span class="text-gray-400">sudah memiliki akun? </span>
              <button
              onClick={() => navigate('/Login')}>/
              <a href="#" class="text-yellow-400 font-medium hover:text-yellow-300 transition-colors">
                Masuk
              </a>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Motorcycle Cards & Info */}
      <div class="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20"></div>
        
        {/* Info Card - Top Right */}
        <div class="absolute top-24 right-8 bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 text-white border border-gray-700">
          <div class="text-xs opacity-75">Tersedia</div>
          <div class="font-bold">50+ Motor</div>
        </div>

        {/* Price Card - Bottom Right */}
        <div class="absolute bottom-32 right-12 bg-yellow-400/20 backdrop-blur-sm rounded-lg p-4 text-white border border-yellow-400/30">
          <div class="text-xs opacity-75">Mulai dari</div>
          <div class="font-bold">Rp 45k/hari</div>
        </div>

        {/* Main Motorcycle Cards */}
        <div class="h-full flex items-center justify-center p-12">
          <div class="relative">
            {/* Honda Beat Card */}
            <div class="w-80 h-56 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl relative overflow-hidden border border-blue-500/30">
              <img 
                src="/src/assets/beat.jpg" 
                alt="Honda Beat"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black/40"></div>
              <div class="absolute bottom-4 left-4 text-white z-10">
                <div class="text-xs opacity-75">Honda</div>
                <div class="font-bold text-lg">Beat</div>
              </div>
            </div>

            {/* Honda Vario Card */}
            <div class="absolute -right-8 top-8 w-80 h-56 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-xl transform rotate-3 opacity-90 border border-purple-500/30 overflow-hidden">
              <img 
                src="/assets/vario.jpg" 
                alt="Honda Vario 125"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black/40"></div>
              <div class="absolute bottom-4 left-4 text-white z-10">
                <div class="text-xs opacity-75">Honda</div>
                <div class="font-bold text-lg">Vario 125</div>
              </div>
            </div>

            {/* Honda Scoopy Card */}
            <div class="absolute -left-12 bottom-4 w-80 h-56 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl shadow-lg transform -rotate-2 opacity-80 border border-red-500/30 overflow-hidden">
              <img 
                src="/assets/scoopy.jpg" 
                alt="Honda Scoopy"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black/40"></div>
              <div class="absolute bottom-4 left-4 text-white z-10">
                <div class="text-xs opacity-75">Honda</div>
                <div class="font-bold text-lg">Scoopy</div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div class="absolute -top-4 -right-4 w-16 h-16 border-2 border-yellow-400/30 rounded-full animate-pulse"></div>
            <div class="absolute -bottom-8 -left-8 w-12 h-12 border border-yellow-400/20 rounded-lg rotate-45"></div>
            <div class="absolute top-1/4 -right-12 w-8 h-8 bg-yellow-400/20 rounded-full animate-bounce"></div>
            <div class="absolute bottom-1/3 -left-16 w-6 h-6 bg-blue-400/30 rounded-full"></div>
          </div>
        </div>

        {/* Features List */}
        <div class="absolute bottom-8 left-8 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white border border-gray-700/50">
          <div class="text-sm font-medium mb-2">Keuntungan Bergabung:</div>
          <ul class="text-xs space-y-1 opacity-90">
            <li>• Proses sewa cepat & mudah</li>
            <li>• Motor terawat & berkualitas</li>
            <li>• Harga terjangkau</li>
            <li>• Layanan 24/7</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;