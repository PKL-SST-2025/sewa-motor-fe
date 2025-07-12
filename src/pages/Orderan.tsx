import { Component, createSignal, For, onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';

interface BookingHistory {
  id: string;
  tanggalPeminjaman: string;
  jamPeminjaman: string;
  alamatPengantaran: string;
  tanggalPengembalian: string;
  jamPengembalian: string;
  alamatPengembalian: string;
  pilihCabang: string;
  pilihMotor: string;
  motorPrice: string;
  status: string;
  tanggalBooking: string;
  waktuBooking: string;
}

const OrderanSayaPage: Component = () => {
  const [orders, setOrders] = createSignal<BookingHistory[]>([]);
  const navigate = useNavigate();

  // Load booking history from localStorage
  onMount(() => {
    try {
      const savedOrders = localStorage.getItem('bookingHistory');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Error loading booking history:', error);
    }
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'menunggu konfirmasi': return 'text-yellow-500 bg-yellow-500/20';
      case 'dikonfirmasi': return 'text-green-500 bg-green-500/20';
      case 'sedang berlangsung': return 'text-blue-500 bg-blue-500/20';
      case 'selesai': return 'text-green-600 bg-green-600/20';
      case 'dibatalkan': return 'text-red-500 bg-red-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
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
              <a href="/orderan" class="text-yellow-500 transition-colors">RIWAYAT</a>
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

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Header */}
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-yellow-500">RIWAYAT ORDERAN</h1>
          <button
            onClick={() => navigate('/sewa')}
            class="px-6 py-3 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors flex items-center space-x-2"
          >
            <span class="text-lg">+</span>
            <span>Pesan Motor</span>
          </button>
        </div>

        {/* Orders List */}
        <div class="space-y-6">
          {orders().length === 0 ? (
            <div class="bg-gray-900 rounded-2xl p-12 text-center border border-gray-700">
              <div class="mb-4">
                <div class="w-24 h-24 bg-gray-700 rounded-full mx-auto flex items-center justify-center">
                  <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
              <p class="text-gray-300 text-lg font-medium">Anda belum memiliki riwayat orderan</p>
              <p class="text-gray-500 mt-2">Mulai pesan motor untuk perjalanan Anda</p>
              <button
                onClick={() => navigate('/sewa')}
                class="mt-6 px-8 py-3 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors"
              >
                Pesan Motor Sekarang
              </button>
            </div>
          ) : (
            <For each={orders()}>
              {(order) => (
                <div class="bg-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-colors">
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <h3 class="text-xl font-semibold text-white mb-1">#{order.id}</h3>
                      <p class="text-yellow-500 font-medium">{order.pilihMotor}</p>
                      <p class="text-gray-400 text-sm">Dibuat: {order.tanggalBooking} | {order.waktuBooking}</p>
                    </div>
                    <span class={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p class="text-gray-400 text-sm">Tanggal Sewa</p>
                      <p class="text-white font-medium">{order.tanggalPeminjaman}</p>
                      <p class="text-gray-300 text-sm">{order.jamPeminjaman}</p>
                    </div>
                    <div>
                      <p class="text-gray-400 text-sm">Tanggal Kembali</p>
                      <p class="text-white font-medium">{order.tanggalPengembalian}</p>
                      <p class="text-gray-300 text-sm">{order.jamPengembalian}</p>
                    </div>
                    <div>
                      <p class="text-gray-400 text-sm">Pengantaran</p>
                      <p class="text-white font-medium">{order.alamatPengantaran}</p>
                    </div>
                    <div>
                      <p class="text-gray-400 text-sm">Cabang</p>
                      <p class="text-white font-medium">{order.pilihCabang}</p>
                    </div>
                  </div>

                  <div class="flex justify-between items-center pt-4 border-t border-gray-700">
                    <div>
                      <p class="text-gray-400 text-sm">Harga</p>
                      <p class="text-yellow-500 font-bold text-lg">{order.motorPrice}</p>
                    </div>
                    <div class="space-x-3">
                      <button class="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                        Detail
                      </button>
                      {order.status === 'Menunggu Konfirmasi' && (
                        <button 
                          onClick={() => {
                            const message = `Halo, saya ingin membatalkan booking dengan ID: ${order.id}`;
                            const whatsappUrl = `https://wa.me/6288200374614?text=${encodeURIComponent(message)}`;
                            window.open(whatsappUrl, '_blank');
                          }}
                          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Batalkan
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </For>
          )}
        </div>

        {/* Statistics */}
        {orders().length > 0 && (
          <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 class="text-lg font-semibold text-yellow-500 mb-2">Total Orderan</h3>
              <p class="text-3xl font-bold text-white">{orders().length}</p>
            </div>
            <div class="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 class="text-lg font-semibold text-yellow-500 mb-2">Menunggu Konfirmasi</h3>
              <p class="text-3xl font-bold text-white">
                {orders().filter(o => o.status === 'Menunggu Konfirmasi').length}
              </p>
            </div>
            <div class="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 class="text-lg font-semibold text-yellow-500 mb-2">Motor Favorit</h3>
              <p class="text-lg font-bold text-white">
                {orders().length > 0 ? orders()[0].pilihMotor : '-'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default OrderanSayaPage;
