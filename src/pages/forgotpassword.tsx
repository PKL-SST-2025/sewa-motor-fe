import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

const ForgotPasswordPage = () => {
  const [email, setEmail] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal('');
  const [isSuccess, setIsSuccess] = createSignal(false);

  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    
    if (!email().trim()) {
      setError('Email wajib diisi');
      return;
    }

    if (!validateEmail(email())) {
      setError('Format email tidak valid');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Reset password request for:', email());
      setIsLoading(false);
      setIsSuccess(true);
      // Add your forgot password logic here
    }, 2000);
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

      {/* Left Side - Forgot Password Form */}
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 pt-24">
        <div class="w-full max-w-md">
          {!isSuccess() ? (
            <>
              <div class="mb-8">
                <h2 class="text-white text-3xl font-bold mb-2">Lupa Password</h2>
                <p class="text-gray-400">Masukkan email Anda untuk mereset password.</p>
              </div>

              <div class="space-y-6">
                <div>
                  <label for="email" class="block text-white text-sm font-medium mb-3">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email()}
                    onInput={(e) => {
                      setEmail(e.currentTarget.value);
                      if (error()) setError('');
                    }}
                    class={`w-full px-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all ${
                      error() ? 'border-red-500' : 'border-gray-600'
                    }`}
                    required
                  />
                  {error() && (
                    <p class="text-red-400 text-sm mt-2">{error()}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading()}
                  class="w-full bg-yellow-400 text-black font-bold py-4 px-6 rounded-xl hover:bg-yellow-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLoading() ? (
                    <div class="flex items-center justify-center space-x-2">
                      <div class="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span>Mengirim...</span>
                    </div>
                  ) : (
                    'Kirim Link Reset'
                  )}
                </button>

                <div class="text-center">
                  <span class="text-gray-400">ingat password Anda? </span>
                  <button 
                    onClick={() => navigate('/Login')}
                    class="text-yellow-400 font-medium hover:text-yellow-300 transition-colors"
                  >
                    Masuk
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Success State
            <div class="text-center">
              <div class="mb-6">
                <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 class="text-white text-3xl font-bold mb-2">Email Terkirim!</h2>
                <p class="text-gray-400 mb-4">
                  Kami telah mengirim link reset password ke email Anda.
                </p>
                <p class="text-gray-500 text-sm">
                  Periksa folder inbox atau spam untuk email dari kami.
                </p>
              </div>

              <div class="space-y-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    setEmail('');
                  }}
                  class="w-full bg-gray-700 text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-600 transition-all duration-300"
                >
                  Kirim Ulang
                </button>

                <div class="text-center">
                  <button 
                    onClick={() => navigate('/Login')}
                    class="text-yellow-400 font-medium hover:text-yellow-300 transition-colors"
                  >
                    Kembali ke Halaman Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Motorcycle Cards & Info */}
      <div class="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20"></div>

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
                src="/assets/beat.jpg" 
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

        {/* Security Info */}
        <div class="absolute bottom-8 left-8 bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white border border-gray-700/50">
          <div class="text-sm font-medium mb-2 flex items-center">
            <svg class="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            Keamanan Terjamin:
          </div>
          <ul class="text-xs space-y-1 opacity-90">
            <li>• Link reset berlaku 24 jam</li>
            <li>• Data pribadi aman</li>
            <li>• Enkripsi end-to-end</li>
            <li>• Verifikasi email otomatis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;