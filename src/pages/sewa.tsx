import { Component, createSignal, For } from 'solid-js';
import { useNavigate } from '@solidjs/router';

interface BookingData {
  tanggalPeminjaman: string;
  jamPeminjaman: string;
  alamatPengantaran: string;
  tanggalPengembalian: string;
  jamPengembalian: string;
  alamatPengembalian: string;
  pilihCabang: string;
  pilihMotor: string;
}

interface MotorOption {
  id: string;
  name: string;
  price: string;
  year: string;
  available: boolean;
}

const MotorBookingForm: Component = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [bookingData, setBookingData] = createSignal<BookingData>({
    tanggalPeminjaman: '',
    jamPeminjaman: '',
    alamatPengantaran: '',
    tanggalPengembalian: '',
    jamPengembalian: '',
    alamatPengembalian: '',
    pilihCabang: '',
    pilihMotor: ''
  });

  const motorOptions: MotorOption[] = [
    { id: 'beat-new', name: 'BEAT NEW', price: 'Rp 50.000/hari', year: '2023', available: true },
    { id: 'vario-125', name: 'VARIO 125', price: 'Rp 65.000/hari', year: '2023', available: true },
    { id: 'scoopy', name: 'SCOOPY', price: 'Rp 55.000/hari', year: '2023', available: true },
    { id: 'beat-street', name: 'BEAT STREET', price: 'Rp 60.000/hari', year: '2023', available: true },
    { id: 'vario-160', name: 'VARIO 160', price: 'Rp 75.000/hari', year: '2023', available: true },
    { id: 'genio', name: 'HONDA GENIO', price: 'Rp 58.000/hari', year: '2023', available: true },
    { id: 'cbr-150', name: 'CBR 150', price: 'Rp 85.000/hari', year: '2023', available: true },
    { id: 'mio-m3', name: 'MIO M3', price: 'Rp 45.000/hari', year: '2023', available: true },
    { id: 'vespa-sprint', name: 'VESPA SPRINT', price: 'Rp 95.000/hari', year: '2023', available: true }
  ];

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (isSubmitting()) return; // Prevent double submission
    
    const data = bookingData();
    
    // Validate required fields
    if (!data.tanggalPeminjaman || !data.jamPeminjaman || !data.alamatPengantaran || 
        !data.tanggalPengembalian || !data.jamPengembalian || !data.alamatPengembalian || 
        !data.pilihCabang || !data.pilihMotor) {
      alert('Mohon lengkapi semua field yang diperlukan!');
      return;
    }

    setIsSubmitting(true);

    // Get selected motor details
    const selectedMotor = motorOptions.find(m => m.id === data.pilihMotor);
    const motorName = selectedMotor ? selectedMotor.name : data.pilihMotor;
    const motorPrice = selectedMotor ? selectedMotor.price : '-';

    // Generate booking ID
    const bookingId = 'BWK' + Date.now().toString().slice(-6);

    // Create booking record
    const bookingRecord = {
      id: bookingId,
      tanggalPeminjaman: data.tanggalPeminjaman,
      jamPeminjaman: data.jamPeminjaman,
      alamatPengantaran: data.alamatPengantaran,
      tanggalPengembalian: data.tanggalPengembalian,
      jamPengembalian: data.jamPengembalian,
      alamatPengembalian: data.alamatPengembalian,
      pilihCabang: data.pilihCabang,
      pilihMotor: motorName,
      motorPrice: motorPrice,
      status: 'Menunggu Konfirmasi',
      tanggalBooking: new Date().toISOString().split('T')[0],
      waktuBooking: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    console.log('=== SUBMITTING BOOKING TO DATABASE ===');
    console.log('Booking data:', bookingRecord);
    
    try {
      // Save to backend database
      await saveBookingToDatabase(bookingRecord);
      
      // Also save to localStorage for backup
      try {
        const existingOrders = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
        existingOrders.unshift(bookingRecord);
        localStorage.setItem('bookingHistory', JSON.stringify(existingOrders));
        console.log('Backup saved to localStorage');
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }

      // Create URL with booking data as search parameters
      const params = new URLSearchParams({
        tanggalPeminjaman: data.tanggalPeminjaman,
        jamPeminjaman: data.jamPeminjaman,
        alamatPengantaran: data.alamatPengantaran,
        tanggalPengembalian: data.tanggalPengembalian,
        jamPengembalian: data.jamPengembalian,
        alamatPengembalian: data.alamatPengembalian,
        pilihCabang: data.pilihCabang,
        pilihMotor: motorName,
        bookingId: bookingId
      });

      // Navigate to success page
      navigate(`/kirimdata?${params.toString()}`);
      
    } catch (error) {
      console.error('Error saving booking:', error);
      alert(`Gagal menyimpan booking: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to save booking to backend database
  const saveBookingToDatabase = async (bookingRecord: any) => {
    const token = localStorage.getItem('jwt');
    
    console.log('=== SAVE TO DATABASE ===');
    console.log('Token exists:', !!token);
    console.log('Booking record:', bookingRecord);
    
    if (!token) {
      throw new Error('No authentication token. Please login first.');
    }

    // Prepare data for backend (multiple field name formats)
    const backendData = {
      // Standard field names
      tanggal_peminjaman: bookingRecord.tanggalPeminjaman,
      jam_peminjaman: bookingRecord.jamPeminjaman,
      alamat_pengantaran: bookingRecord.alamatPengantaran,
      tanggal_pengembalian: bookingRecord.tanggalPengembalian,
      jam_pengembalian: bookingRecord.jamPengembalian,
      alamat_pengembalian: bookingRecord.alamatPengembalian,
      pilih_cabang: bookingRecord.pilihCabang,
      pilih_motor: bookingRecord.pilihMotor,
      motor_price: bookingRecord.motorPrice,
      status: bookingRecord.status,
      tanggal_booking: bookingRecord.tanggalBooking,
      waktu_booking: bookingRecord.waktuBooking,
      
      // Alternative field names (camelCase)
      tanggalPeminjaman: bookingRecord.tanggalPeminjaman,
      jamPeminjaman: bookingRecord.jamPeminjaman,
      alamatPengantaran: bookingRecord.alamatPengantaran,
      tanggalPengembalian: bookingRecord.tanggalPengembalian,
      jamPengembalian: bookingRecord.jamPengembalian,
      alamatPengembalian: bookingRecord.alamatPengembalian,
      pilihCabang: bookingRecord.pilihCabang,
      pilihMotor: bookingRecord.pilihMotor,
      motorPrice: bookingRecord.motorPrice,
      
      // Additional fields
      booking_id: bookingRecord.id,
      id: bookingRecord.id
    };

    // Try multiple endpoints
    const endpoints = [
      'http://localhost:8000/api/bookings',
      'http://localhost:8000/api/orders',
      'http://localhost:8000/api/sewa',
      'http://localhost:8000/api/peminjaman'
    ];

    let lastError = '';
    
    for (const endpoint of endpoints) {
      try {
        console.log(`Trying POST to: ${endpoint}`);
        console.log('Payload:', backendData);
        
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(backendData)
        });

        console.log(`${endpoint} response status:`, response.status);
        console.log(`${endpoint} response ok:`, response.ok);

        if (response.ok) {
          const result = await response.json();
          console.log(`SUCCESS: Booking saved to ${endpoint}`, result);
          return result;
        } else {
          const errorText = await response.text();
          console.log(`${endpoint} failed:`, response.status, errorText);
          lastError = `${endpoint}: ${response.status} - ${errorText}`;
        }
      } catch (error) {
        console.error(`Error with ${endpoint}:`, error);
        lastError = `${endpoint}: ${(error as Error).message}`;
      }
    }
    
    throw new Error(`All endpoints failed. Last error: ${lastError}`);
  };

  return (
    <div class="min-h-screen bg-black text-white">
      {/* Header */}
      <header class="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-yellow-500/20">
        <nav class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-10 h-10  rounded-lg flex items-center justify-center overflow-hidden">
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
              
              <a href="/sewamotor" class="hover:text-yellow-500 transition-colors">ORDER</a>
              <a href="/orderan" class="hover:text-yellow-500 transition-colors">RIWAYAT</a>
              <a href="/profil" class="hover:text-yellow-500 transition-colors">PROFIL</a>
            </div>

            <button class="md:hidden text-yellow-500">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main class="max-w-4xl mx-auto px-6 py-12 pt-24">
        <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
          <h1 class="text-3xl font-bold text-yellow-500 mb-8">PESAN MOTOR</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div class="space-y-6">
              {/* Tanggal Peminjaman */}
              <div>
                <label class="block text-white font-semibold mb-3">Tanggal Peminjaman</label>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-gray-400 text-sm mb-1">Tanggal</label>
                    <input
                      type="date"
                      value={bookingData().tanggalPeminjaman}
                      onInput={(e) => handleInputChange('tanggalPeminjaman', e.currentTarget.value)}
                      class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-gray-400 text-sm mb-1">Jam</label>
                    <input
                      type="time"
                      value={bookingData().jamPeminjaman}
                      onInput={(e) => handleInputChange('jamPeminjaman', e.currentTarget.value)}
                      class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Alamat Pengantaran */}
              <div>
                <label class="block text-white font-semibold mb-3">Alamat pengantaran</label>
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Purwokerto"
                    value={bookingData().alamatPengantaran}
                    onInput={(e) => handleInputChange('alamatPengantaran', e.currentTarget.value)}
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                  <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div class="space-y-6">
              {/* Tanggal Pengembalian */}
              <div>
                <label class="block text-white font-semibold mb-3">Tanggal Pengembalian</label>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-gray-400 text-sm mb-1">Tanggal</label>
                    <input
                      type="date"
                      value={bookingData().tanggalPengembalian}
                      onInput={(e) => handleInputChange('tanggalPengembalian', e.currentTarget.value)}
                      class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label class="block text-gray-400 text-sm mb-1">Jam</label>
                    <input
                      type="time"
                      value={bookingData().jamPengembalian}
                      onInput={(e) => handleInputChange('jamPengembalian', e.currentTarget.value)}
                      class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Alamat Pengembalian */}
              <div>
                <label class="block text-white font-semibold mb-3">Alamat Pengembalian</label>
                <div class="relative">
                  <input
                    type="text"
                    placeholder="Purwokerto"
                    value={bookingData().alamatPengembalian}
                    onInput={(e) => handleInputChange('alamatPengembalian', e.currentTarget.value)}
                    class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:border-yellow-500 focus:outline-none transition-colors"
                  />
                  <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pilih Cabang */}
          <div class="mt-8">
            <label class="block text-white font-semibold mb-3">Pilih cabang</label>
            <div class="relative">
              <select
                value={bookingData().pilihCabang}
                onInput={(e) => handleInputChange('pilihCabang', e.currentTarget.value)}
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white focus:border-yellow-500 focus:outline-none transition-colors appearance-none"
              >
                <option value="">Pilih cabang</option>
                <option value="purwokerto">Purwokerto</option>
              </select>
              <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Pilih Motor */}
          <div class="mt-8">
            <label class="block text-white font-semibold mb-3">Pilih Motor</label>
            <div class="relative">
              <select
                value={bookingData().pilihMotor}
                onInput={(e) => handleInputChange('pilihMotor', e.currentTarget.value)}
                class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white focus:border-yellow-500 focus:outline-none transition-colors appearance-none"
              >
                <option value="">Pilih motor</option>
                <For each={motorOptions}>
                  {(motor) => (
                    <option value={motor.id} disabled={!motor.available}>
                      {motor.name} - {motor.price} ({motor.available ? 'Tersedia' : 'Tidak Tersedia'})
                    </option>
                  )}
                </For>
              </select>
              <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
            </div>
            
            {/* Selected Motor Display */}
            {bookingData().pilihMotor && (
              <div class="mt-4 p-4 bg-gray-800 rounded-lg border border-yellow-500/30">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-lg font-semibold text-yellow-500">
                      {motorOptions.find(m => m.id === bookingData().pilihMotor)?.name}
                    </h4>
                    <p class="text-white font-medium">
                      {motorOptions.find(m => m.id === bookingData().pilihMotor)?.price}
                    </p>
                    <p class="text-gray-400 text-sm">
                      Tahun {motorOptions.find(m => m.id === bookingData().pilihMotor)?.year}
                    </p>
                  </div>
                  <div class="text-green-400 font-medium">
                    ✓ Tersedia
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div class="mt-12">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting()}
              class={`w-full font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center space-x-3 ${
                isSubmitting() 
                  ? 'bg-gray-500 cursor-not-allowed text-gray-300' 
                  : 'bg-yellow-500 hover:bg-yellow-400 text-black transform hover:scale-105 hover:shadow-yellow-500/25'
              }`}
            >
              {isSubmitting() ? (
                <>
                  <div class="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                  <span>MENGIRIM DATA...</span>
                </>
              ) : (
                <span>KIRIM DATA</span>
              )}
            </button>
          </div>

          {/* Additional Info */}
          <div class="mt-6 text-center">
            <p class="text-gray-400 text-sm">
              Pastikan semua data yang Anda masukkan sudah benar sebelum mengirim
            </p>
          </div>
        </div>
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

export default MotorBookingForm;