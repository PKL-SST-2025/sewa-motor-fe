import { Component, createSignal, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';

interface UserProfile {
  id?: string;
  username: string;
  nama: string;
  email: string;
  no_hp: string;
  alamat: string;
  avatar?: string;
}

const ProfilePage: Component = () => {
  const [isLoading, setIsLoading] = createSignal(true);
  const [isEditing, setIsEditing] = createSignal(false);
  const [isSaving, setIsSaving] = createSignal(false);
  const [error, setError] = createSignal('');
  const navigate = useNavigate();
  const [profile, setProfile] = createSignal<UserProfile>({
    username: '',
    nama: '',
    email: '',
    no_hp: '',
    alamat: ''
  });

  // Load profile data from backend
  onMount(async () => {
    await fetchProfile();
  });

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const token = localStorage.getItem('jwt');
      
      console.log('=== DEBUG FETCH PROFILE ===');
      console.log('Token exists:', !!token);
      console.log('Token:', token);
      
      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/login');
        return;
      }

      // Try multiple possible profile endpoints
      const endpoints = [
        'http://localhost:8000/api/auth/me',
        'http://localhost:8000/api/users/me', 
        'http://localhost:8000/api/user/current',
        'http://localhost:8000/api/profile/current',
        'http://localhost:8000/api/profils/me',
        'http://localhost:8000/api/profils/current'
      ];
      
      let profileSuccess = false;
      let lastError = '';
      
      for (const endpoint of endpoints) {
        try {
          console.log(`Trying profile endpoint: ${endpoint}`);
          
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          console.log(`${endpoint} - Response status:`, response.status);

          if (response.ok) {
            const data = await response.json();
            console.log('Profile data received from', endpoint, ':', data);

            // Handle different response formats
            let profileData = null;
            
            if (data.success && data.profil) {
              // Format: {success: true, profil: {...}}
              profileData = data.profil;
            } else if (data.user) {
              // Format: {user: {...}}
              profileData = data.user;
            } else if (data.data) {
              // Format: {data: {...}}
              profileData = data.data;
            } else if (data.id || data.username || data.email) {
              // Direct user object
              profileData = data;
            }

            if (profileData) {
              // Set profile data dengan berbagai kemungkinan field names
              setProfile({
                id: profileData.id || profileData._id,
                username: profileData.username || profileData.nama || 'user',
                nama: profileData.nama || profileData.full_name || profileData.name || '',
                email: profileData.email || '',
                no_hp: profileData.no_hp || profileData.phone || profileData.nomorTelepon || '',
                alamat: profileData.alamat || profileData.address || 'Alamat belum tersedia'
              });
              
              console.log('Profile set successfully:', profile());
              profileSuccess = true;
              break;
            }
          } else {
            if (response.status === 401) {
              console.log('Unauthorized, redirecting to login');
              localStorage.removeItem('jwt');
              localStorage.removeItem('userId');
              navigate('/login');
              return;
            }
            
            const errorText = await response.text();
            console.log(`${endpoint} failed:`, response.status, errorText);
            lastError = `${endpoint}: ${response.status} - ${errorText}`;
          }
        } catch (err) {
          console.log(`Error with ${endpoint}:`, err);
          lastError = `${endpoint}: ${(err as Error).message}`;
        }
      }
      
      if (!profileSuccess) {
        throw new Error(`Gagal mengambil profil dari semua endpoint. Last error: ${lastError}`);
      }
      
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError((err as Error).message);
      
      // Set default data jika error
      setProfile({
        username: 'user',
        nama: 'Data tidak tersedia',
        email: 'Data tidak tersedia',
        no_hp: 'Data tidak tersedia',
        alamat: 'Data tidak tersedia'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit mode toggle
  const handleEditToggle = () => {
    setIsEditing(!isEditing());
    setError(''); // Clear any errors when entering edit mode
  };

  // Update profile field
  const updateProfileField = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Save profile changes to database
  const handleSaveProfile = async () => {
    if (isSaving()) return; // Prevent double submission
    
    try {
      setIsSaving(true);
      setError('');
      
      const token = localStorage.getItem('jwt');
      if (!token) {
        navigate('/login');
        return;
      }

      const currentProfile = profile();
      
      // Validate required fields
      if (!currentProfile.nama.trim()) {
        throw new Error('Nama lengkap harus diisi');
      }
      if (!currentProfile.email.trim()) {
        throw new Error('Email harus diisi');
      }
      if (!currentProfile.no_hp.trim()) {
        throw new Error('Nomor HP harus diisi');
      }

      console.log('=== SAVING PROFILE TO DATABASE ===');
      console.log('Profile data:', currentProfile);
      
      // Prepare data for backend (multiple field formats)
      const profileData = {
        // Snake case (Laravel standard)
        nama: currentProfile.nama,
        email: currentProfile.email,
        no_hp: currentProfile.no_hp,
        alamat: currentProfile.alamat,
        
        // Alternative field names
        full_name: currentProfile.nama,
        phone: currentProfile.no_hp,
        address: currentProfile.alamat,
        nomorTelepon: currentProfile.no_hp,
        
        // Include ID if available
        ...(currentProfile.id && { id: currentProfile.id })
      };

      // Try multiple endpoints for updating profile
      const endpoints = [
        'http://localhost:8000/api/profils/current',
        'http://localhost:8000/api/profiles/current',
        'http://localhost:8000/api/user/profile',
        'http://localhost:8000/api/auth/profile',
        ...(currentProfile.id ? [
          `http://localhost:8000/api/profils/${currentProfile.id}`,
          `http://localhost:8000/api/profiles/${currentProfile.id}`,
          `http://localhost:8000/api/users/${currentProfile.id}`
        ] : [])
      ];

      let updateSuccess = false;
      let lastError = '';

      for (const endpoint of endpoints) {
        try {
          console.log(`Trying PUT to: ${endpoint}`);
          console.log('Payload:', profileData);
          
          const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData)
          });

          console.log(`${endpoint} response status:`, response.status);

          if (response.ok) {
            const result = await response.json();
            console.log(`SUCCESS: Profile updated at ${endpoint}`, result);
            
            // Update local profile data with response
            if (result.success && result.profil) {
              setProfile(prev => ({
                ...prev,
                id: result.profil.id || prev.id,
                nama: result.profil.nama || prev.nama,
                email: result.profil.email || prev.email,
                no_hp: result.profil.no_hp || prev.no_hp,
                alamat: result.profil.alamat || prev.alamat
              }));
            } else if (result.data) {
              setProfile(prev => ({
                ...prev,
                id: result.data.id || prev.id,
                nama: result.data.nama || prev.nama,
                email: result.data.email || prev.email,
                no_hp: result.data.no_hp || prev.no_hp,
                alamat: result.data.alamat || prev.alamat
              }));
            }
            
            updateSuccess = true;
            break;
          } else if (response.status === 401) {
            console.log('Unauthorized, redirecting to login');
            localStorage.removeItem('jwt');
            localStorage.removeItem('userId');
            navigate('/login');
            return;
          } else {
            const errorText = await response.text();
            console.log(`${endpoint} failed:`, response.status, errorText);
            lastError = `${endpoint}: ${response.status} - ${errorText}`;
          }
        } catch (err) {
          console.log(`Error with ${endpoint}:`, err);
          lastError = `${endpoint}: ${(err as Error).message}`;
        }
      }

      if (!updateSuccess) {
        // If PUT failed, try POST for creating new profile
        console.log('PUT failed, trying POST to create new profile...');
        
        const createEndpoints = [
          'http://localhost:8000/api/profils',
          'http://localhost:8000/api/profiles',
          'http://localhost:8000/api/user/profile'
        ];

        for (const endpoint of createEndpoints) {
          try {
            console.log(`Trying POST to: ${endpoint}`);
            
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(profileData)
            });

            if (response.ok) {
              const result = await response.json();
              console.log(`SUCCESS: Profile created at ${endpoint}`, result);
              
              // Update local profile with new ID
              if (result.success && result.profil) {
                setProfile(prev => ({
                  ...prev,
                  id: result.profil.id
                }));
              } else if (result.data) {
                setProfile(prev => ({
                  ...prev,
                  id: result.data.id
                }));
              }
              
              updateSuccess = true;
              break;
            }
          } catch (err) {
            console.log(`Error creating profile at ${endpoint}:`, err);
          }
        }
      }

      if (!updateSuccess) {
        throw new Error(`Gagal menyimpan profil. Last error: ${lastError}`);
      }

      // Success - exit edit mode
      setIsEditing(false);
      alert('Profil berhasil disimpan!');
      
    } catch (err) {
      console.error('Error saving profile:', err);
      setError((err as Error).message);
      alert(`Gagal menyimpan profil: ${(err as Error).message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    navigate('/login');
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
            
            {/* Error Message */}
            {error() && (
              <div class="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
                <p class="text-red-300">Error: {error()}</p>
                <button 
                  onClick={fetchProfile}
                  class="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Coba Lagi
                </button>
              </div>
            )}
            
            {/* Loading State */}
            {isLoading() ? (
              <div class="bg-gray-900 rounded-2xl p-8 border border-gray-700 flex items-center justify-center">
                <div class="text-center">
                  <div class="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p class="text-gray-300">Memuat profil...</p>
                </div>
              </div>
            ) : (
              <div class="bg-gray-900 rounded-2xl p-8 border border-gray-700">
                <div class="flex justify-between items-center mb-6">
                  <div>
                    <h2 class="text-xl font-semibold text-yellow-500">Profil Information</h2>
                    {isEditing() && (
                      <p class="text-sm text-orange-400 mt-1">✏️ Mode edit - silakan ubah data dan klik Simpan</p>
                    )}
                  </div>
                  <div class="flex gap-2">
                    {!isEditing() ? (
                      <>
                        <button
                          onClick={handleEditToggle}
                          class="px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                        >
                          Edit Profil
                        </button>
                        <button
                          onClick={fetchProfile}
                          class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          Refresh
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleSaveProfile}
                          disabled={isSaving()}
                          class={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                            isSaving() 
                              ? 'bg-gray-500 cursor-not-allowed text-gray-300' 
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {isSaving() ? (
                            <>
                              <div class="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                              <span>Menyimpan...</span>
                            </>
                          ) : (
                            <span>Simpan</span>
                          )}
                        </button>
                        <button
                          onClick={handleEditToggle}
                          disabled={isSaving()}
                          class="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >
                          Batal
                        </button>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                <div class="flex items-start space-x-8">
                  {/* Avatar */}
                  <div class="flex flex-col items-center">
                    <div class="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4 border-2 border-yellow-500 overflow-hidden">
                      <img 
                        src="/assets/0081ad1c-321d-47e1-976d-d3cd6a95f0ed.jpg" 
                        alt="Profile Picture"
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <span class="text-yellow-500 font-medium">{profile().username}</span>
                  </div>

                  {/* Profile Fields - Editable/Display */}
                  <div class="flex-1 space-y-4">
                    <div class="grid grid-cols-1 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">
                          Nama Lengkap:
                          {isEditing() && <span class="text-red-500 ml-1">*</span>}
                        </label>
                        {isEditing() ? (
                          <input
                            type="text"
                            value={profile().nama}
                            onInput={(e) => updateProfileField('nama', e.currentTarget.value)}
                            class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            placeholder="Masukkan nama lengkap"
                          />
                        ) : (
                          <div class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white">
                            {profile().nama || 'Belum diisi'}
                          </div>
                        )}
                      </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">
                          Email:
                          {isEditing() && <span class="text-red-500 ml-1">*</span>}
                        </label>
                        {isEditing() ? (
                          <input
                            type="email"
                            value={profile().email}
                            onInput={(e) => updateProfileField('email', e.currentTarget.value)}
                            class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            placeholder="Masukkan alamat email"
                          />
                        ) : (
                          <div class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white">
                            {profile().email || 'Belum diisi'}
                          </div>
                        )}
                      </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">
                          No. HP:
                          {isEditing() && <span class="text-red-500 ml-1">*</span>}
                        </label>
                        {isEditing() ? (
                          <input
                            type="tel"
                            value={profile().no_hp}
                            onInput={(e) => updateProfileField('no_hp', e.currentTarget.value)}
                            class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            placeholder="Masukkan nomor HP"
                          />
                        ) : (
                          <div class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white">
                            {profile().no_hp || 'Belum diisi'}
                          </div>
                        )}
                      </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-300 mb-1">Alamat:</label>
                        {isEditing() ? (
                          <textarea
                            value={profile().alamat}
                            onInput={(e) => updateProfileField('alamat', e.currentTarget.value)}
                            rows={3}
                            class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                            placeholder="Masukkan alamat lengkap"
                          />
                        ) : (
                          <div class="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white min-h-[80px]">
                            {profile().alamat || 'Alamat belum diisi'}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Validation info in edit mode */}
                    {isEditing() && (
                      <div class="bg-blue-500/20 border border-blue-500 rounded-lg p-3 mt-4">
                        <p class="text-blue-300 text-sm">
                          <span class="text-red-500">*</span> Field yang wajib diisi
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;