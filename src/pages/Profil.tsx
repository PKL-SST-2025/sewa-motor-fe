import { Component, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  username: string;
  avatar?: string;
}

const ProfilePage: Component = () => {
  const [isEditing, setIsEditing] = createSignal(false);
  const navigate = useNavigate();
  const [profile, setProfile] = createSignal<UserProfile>({
    name: 'icallmuhamad',
    email: 'ical@gmail.com',
    phone: '089954673391',
    username: 'ikshzxe'
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing());
  };

  const handleSave = () => {
    setIsEditing(false);
    // Logic untuk menyimpan data bisa ditambahkan di sini
  };

  const updateProfile = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
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
                  src="/src/assets/nasi gigit.png" 
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
              <a href="/orderan" class="hover:text-yellow-500 transition-colors">RIWAYAT</a>
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

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div class="flex justify-between items-start">
          {/* Profile Section */}
          <div class="flex-1 max-w-2xl">
            <h1 class="text-3xl font-bold mb-8 text-yellow-500">PROFIL</h1>
            
            <div class="bg-gray-900 rounded-2xl p-8 border border-gray-700">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold text-yellow-500">Profil Information</h2>
                <button
                  onClick={handleEditToggle}
                  class="px-6 py-2 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                >
                  {isEditing() ? 'Cancel' : 'Edit profil'}
                </button>
              </div>

              <div class="flex items-start space-x-8">
                {/* Avatar */}
                <div class="flex flex-col items-center">
                  <div class="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4 border-2 border-yellow-500 overflow-hidden">
                    <img 
                      src="/src/assets/0081ad1c-321d-47e1-976d-d3cd6a95f0ed.jpg" 
                      alt="Profile Picture"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <span class="text-yellow-500 font-medium">{profile().username}</span>
                </div>

                {/* Profile Fields */}
                <div class="flex-1 space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-300 mb-1">Nama:</label>
                      {isEditing() ? (
                        <input
                          type="text"
                          value={profile().name}
                          onInput={(e) => updateProfile('name', e.currentTarget.value)}
                          class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                        />
                      ) : (
                        <div class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg">
                          {profile().name}
                        </div>
                      )}
                    </div>
                    <div></div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-300 mb-1">Email:</label>
                      {isEditing() ? (
                        <input
                          type="email"
                          value={profile().email}
                          onInput={(e) => updateProfile('email', e.currentTarget.value)}
                          class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                        />
                      ) : (
                        <div class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg">
                          {profile().email}
                        </div>
                      )}
                    </div>
                    <div></div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-300 mb-1">No.Hp:</label>
                      {isEditing() ? (
                        <input
                          type="tel"
                          value={profile().phone}
                          onInput={(e) => updateProfile('phone', e.currentTarget.value)}
                          class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500"
                        />
                      ) : (
                        <div class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg">
                          {profile().phone}
                        </div>
                      )}
                    </div>
                    <div></div>
                  </div>

                  {isEditing() && (
                    <div class="pt-4">
                      <button
                        onClick={handleSave}
                        class="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors mr-3"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;