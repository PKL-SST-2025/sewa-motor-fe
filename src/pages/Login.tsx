import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';


const LoginPage = () => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal('');

  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError('');
    
    // Validation check
    if (!username().trim()) {
      setError('Username harus diisi');
      return;
    }
    
    if (!password().trim()) {
      setError('Kata sandi harus diisi');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', { username: username(), password: password() });
      setIsLoading(false);
      // Navigate to sewamotor page only if validation passes
      navigate('/sewamotor');
    }, 1500);
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

      {/* Left Side - Login Form */}
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 pt-24">
        <div class="w-full max-w-md">
          <div class="mb-8">
            <h2 class="text-white text-3xl font-bold mb-2">Masuk</h2>
            <p class="text-gray-400">masuk dengan akun yang sudah kamu daftarkan.</p>
          </div>

          <form onSubmit={handleSubmit} class="space-y-6">
            {/* Error Message */}
            {error() && (
              <div class="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-400 text-sm">
                {error()}
              </div>
            )}

            <div>
              <label for="username" class="block text-white text-sm font-medium mb-3">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username()}
                onInput={(e) => setUsername(e.currentTarget.value)}
                class="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label for="password" class="block text-white text-sm font-medium mb-3">
                kata sandi
              </label>
              <input
                id="password"
                type="password"
                placeholder="kata sandi"
                value={password()}
                onInput={(e) => setPassword(e.currentTarget.value)}
                class="w-full px-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div class="text-right">
              <button 
                onClick={() => navigate('/forgotpassword')}
                class="text-yellow-400 text-sm font-medium hover:text-yellow-300 transition-colors"
              >
                Lupa kata sandi?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading()}
              class="w-full bg-yellow-400 text-black font-bold py-4 px-6 rounded-xl hover:bg-yellow-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading() ? (
                <div class="flex items-center justify-center space-x-2">
                  <div class="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                  <span>Masuk...</span>
                </div>
              ) : (
                'masuk'
              )}
            </button>

            <div class="text-center">
              <span class="text-gray-400">belum memiliki akun? </span>
              <button
              onClick={() => navigate('/Register')}>/
              <a href="#" class="text-yellow-400 font-medium hover:text-yellow-300 transition-colors">
                Daftar
              </a>
              </button>
            </div>
            
          </form>
        </div>
      </div>

      {/* Right Side - Motorcycle Image */}
      <div class="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20"></div>
        <div class="h-full flex items-center justify-center p-12">
          <div class="relative">
            {/* Main Motorcycle Image - Vario */}
            <div class="w-96 h-64 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-2xl relative overflow-hidden">
              <img 
                src="/assets/vario.jpg" 
                alt="Honda Vario 125"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black/30"></div>
              <div class="absolute bottom-4 left-4 text-white z-10">
                <div class="text-xs opacity-75">Honda</div>
                <div class="font-bold">Vario 125</div>
              </div>
            </div>

            {/* Second Motorcycle - Scoopy */}
            <div class="absolute -right-8 top-8 w-80 h-56 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl shadow-xl transform rotate-3 opacity-80 overflow-hidden">
              <img 
                src="/assets/scoopy.jpg" 
                alt="Honda Scoopy"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black/30"></div>
              <div class="absolute bottom-4 left-4 text-white z-10">
                <div class="text-xs opacity-75">Honda</div>
                <div class="font-bold">Scoopy</div>
              </div>
            </div>

            {/* Third Motorcycle - Beat */}
            <div class="absolute -left-12 bottom-4 w-72 h-48 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg transform -rotate-2 opacity-70 overflow-hidden">
              <img 
                src="/assets/beat.jpg" 
                alt="Honda Beat"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-black/30"></div>
              <div class="absolute bottom-4 left-4 text-white z-10">
                <div class="text-xs opacity-75">Honda</div>
                <div class="font-bold">Beat</div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div class="absolute -top-4 -right-4 w-16 h-16 border-2 border-yellow-400/30 rounded-full animate-pulse"></div>
            <div class="absolute -bottom-8 -left-8 w-12 h-12 border border-yellow-400/20 rounded-lg rotate-45"></div>
            <div class="absolute top-1/4 -right-12 w-8 h-8 bg-yellow-400/20 rounded-full"></div>
          </div>
        </div>

        

        <div class="absolute bottom-32 right-12 bg-yellow-400/20 backdrop-blur-sm rounded-lg p-4 text-white">
          <div class="text-xs opacity-75">Mulai dari</div>
          <div class="font-bold">Rp 45k/hari</div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;