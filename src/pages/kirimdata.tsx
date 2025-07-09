import { Component } from 'solid-js';
import { useNavigate, useSearchParams } from '@solidjs/router';

const KirimData: Component = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get booking data from URL params or localStorage
  const getBookingData = () => {
    return {
      tanggalPeminjaman: searchParams.tanggalPeminjaman || '-',
      jamPeminjaman: searchParams.jamPeminjaman || '-',
      alamatPengantaran: searchParams.alamatPengantaran || '-',
      tanggalPengembalian: searchParams.tanggalPengembalian || '-',
      jamPengembalian: searchParams.jamPengembalian || '-',
      alamatPengembalian: searchParams.alamatPengembalian || '-',
      pilihCabang: searchParams.pilihCabang || '-',
      pilihMotor: searchParams.pilihMotor || '-',
      bookingId: 'BWK' + Date.now().toString().slice(-6)
    };
  };

  const bookingData = getBookingData();

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewOrders = () => {
    navigate('/orderan');
  };

  const handleWhatsApp = () => {
    const message = `Halo, saya telah melakukan booking motor dengan detail:
    
📋 ID Booking: ${bookingData.bookingId}
🏍️ Motor: ${bookingData.pilihMotor}
📅 Tanggal Peminjaman: ${bookingData.tanggalPeminjaman} ${bookingData.jamPeminjaman}
📅 Tanggal Pengembalian: ${bookingData.tanggalPengembalian} ${bookingData.jamPengembalian}
📍 Alamat Pengantaran: ${bookingData.alamatPengantaran}
📍 Alamat Pengembalian: ${bookingData.alamatPengembalian}
🏢 Cabang: ${bookingData.pilihCabang}

Mohon konfirmasi booking saya. Terima kasih!`;
    
    const whatsappUrl = `https://wa.me/6288200374614?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
        {/* Success Message */}
        <div class="text-center mb-12">
          <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 class="text-4xl font-bold text-yellow-500 mb-4">Data Berhasil Dikirim!</h1>
          <p class="text-xl text-gray-300">
            Terima kasih! Booking Anda telah berhasil disubmit dan sedang diproses.
          </p>
        </div>

        {/* Booking Details */}
        <div class="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl mb-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-yellow-500">Detail Booking</h2>
            <div class="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold">
              ID: {bookingData.bookingId}
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <label class="text-gray-400 text-sm">Motor yang Dipilih</label>
                <p class="text-white font-semibold text-lg">{bookingData.pilihMotor}</p>
              </div>
              
              <div>
                <label class="text-gray-400 text-sm">Tanggal & Jam Peminjaman</label>
                <p class="text-white font-semibold">{bookingData.tanggalPeminjaman} - {bookingData.jamPeminjaman}</p>
              </div>

              <div>
                <label class="text-gray-400 text-sm">Alamat Pengantaran</label>
                <p class="text-white font-semibold">{bookingData.alamatPengantaran}</p>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <label class="text-gray-400 text-sm">Cabang</label>
                <p class="text-white font-semibold">{bookingData.pilihCabang}</p>
              </div>

              <div>
                <label class="text-gray-400 text-sm">Tanggal & Jam Pengembalian</label>
                <p class="text-white font-semibold">{bookingData.tanggalPengembalian} - {bookingData.jamPengembalian}</p>
              </div>

              <div>
                <label class="text-gray-400 text-sm">Alamat Pengembalian</label>
                <p class="text-white font-semibold">{bookingData.alamatPengembalian}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div class="bg-gray-800 rounded-xl p-6 mb-8 border-l-4 border-yellow-500">
          <h3 class="text-xl font-bold text-yellow-500 mb-4">Langkah Selanjutnya:</h3>
          <div class="space-y-3 text-gray-300">
            <div class="flex items-start space-x-3">
              <span class="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</span>
              <p>Tim kami akan menghubungi Anda dalam 15-30 menit untuk konfirmasi booking</p>
            </div>
            <div class="flex items-start space-x-3">
              <span class="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</span>
              <p>Pastikan nomor WhatsApp Anda aktif untuk kemudahan komunikasi</p>
            </div>
            <div class="flex items-start space-x-3">
              <span class="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</span>
              <p>Motor akan diantar sesuai jadwal yang telah Anda tentukan</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleWhatsApp}
            class="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515"/>
            </svg>
            <span>Hubungi via WhatsApp</span>
          </button>

          <button
            onClick={handleViewOrders}
            class="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Lihat Riwayat Pesanan
          </button>

          <button
            onClick={handleBackToHome}
            class="border-2 border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-yellow-500 font-bold py-4 px-6 rounded-xl transition-all duration-300"
          >
            Kembali ke Beranda
          </button>
        </div>

        {/* Contact Info */}
        <div class="text-center mt-12 p-6 bg-gray-800 rounded-xl">
          <h4 class="text-lg font-bold text-yellow-500 mb-2">Butuh Bantuan?</h4>
          <p class="text-gray-300 mb-4">Tim customer service kami siap membantu 24/7</p>
          <div class="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-400">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <span>+62 882-003-746-145</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              <span>24/7 Available</span>
            </div>
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

export default KirimData;
