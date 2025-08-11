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
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal('');
  const navigate = useNavigate();

  // Load booking history from backend
  onMount(async () => {
    await fetchBookingHistory();
  });

  const fetchBookingHistory = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const token = localStorage.getItem('jwt');
      const userId = localStorage.getItem('userId');
      
      console.log('=== FETCH BOOKING HISTORY ===');
      console.log('Token exists:', !!token);
      console.log('UserId:', userId);
      
      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/login');
        return;
      }

      // Extended list of possible endpoints for orders/bookings
      const endpoints = [
        // User-specific endpoints (if userId available)
        ...(userId ? [
          `http://localhost:8000/api/orders/user/${userId}`,
          `http://localhost:8000/api/bookings/user/${userId}`,
          `http://localhost:8000/api/sewa/user/${userId}`,
          `http://localhost:8000/api/peminjaman/user/${userId}`
        ] : []),
        
        // Current user endpoints (JWT-based)
        'http://localhost:8000/api/orders/me',
        'http://localhost:8000/api/bookings/me',
        'http://localhost:8000/api/sewa/me',
        'http://localhost:8000/api/peminjaman/me',
        
        // Generic endpoints (filtered by token)
        'http://localhost:8000/api/orders',
        'http://localhost:8000/api/bookings', 
        'http://localhost:8000/api/sewa',
        'http://localhost:8000/api/peminjaman',
        
        // Alternative structures
        'http://localhost:8000/api/user/orders',
        'http://localhost:8000/api/user/bookings',
        'http://localhost:8000/orders',
        'http://localhost:8000/bookings'
      ];
      
      let bookingData = null;
      let successEndpoint = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint}`);
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          console.log(`${endpoint} - Response status:`, response.status);
          
          if (response.ok) {
            bookingData = await response.json();
            successEndpoint = endpoint;
            console.log('Booking history found at', endpoint, ':', bookingData);
            break; // Exit loop on first success
          } else if (response.status === 401) {
            console.log('Unauthorized, redirecting to login');
            localStorage.removeItem('jwt');
            localStorage.removeItem('userId');
            navigate('/login');
            return;
          } else {
            const errorText = await response.text();
            console.log(`${endpoint} failed:`, response.status, errorText);
          }
        } catch (err) {
          console.log(`Error with endpoint ${endpoint}:`, err);
        }
      }
      
      if (!bookingData) {
        console.log('No booking history found from any endpoint');
        setOrders([]);
        return;
      }
      
      // Handle different response structures
      let bookings = [];
      
      if (Array.isArray(bookingData)) {
        bookings = bookingData;
      } else if (bookingData.success && bookingData.data) {
        bookings = Array.isArray(bookingData.data) ? bookingData.data : [bookingData.data];
      } else if (bookingData.data) {
        bookings = Array.isArray(bookingData.data) ? bookingData.data : [bookingData.data];
      } else if (bookingData.orders) {
        bookings = Array.isArray(bookingData.orders) ? bookingData.orders : [bookingData.orders];
      } else if (bookingData.bookings) {
        bookings = Array.isArray(bookingData.bookings) ? bookingData.bookings : [bookingData.bookings];
      } else if (bookingData.results) {
        bookings = Array.isArray(bookingData.results) ? bookingData.results : [bookingData.results];
      } else {
        // Single object response
        bookings = [bookingData];
      }
      
      console.log('Extracted bookings array:', bookings);
      console.log('Number of bookings found:', bookings.length);
      
      // Map backend data to frontend interface with extensive field mapping
      const mappedOrders = bookings.map((booking: any, index: number) => {
        const mappedOrder = {
          id: booking.id || booking._id || booking.order_id || booking.booking_id || `order-${Date.now()}-${index}`,
          
          // Tanggal peminjaman
          tanggalPeminjaman: booking.tanggal_peminjaman || booking.tanggalPeminjaman || booking.start_date || 
                           booking.rental_start_date || booking.pickup_date || booking.tgl_sewa || 
                           new Date().toISOString().split('T')[0],
                           
          // Jam peminjaman  
          jamPeminjaman: booking.jam_peminjaman || booking.jamPeminjaman || booking.start_time || 
                        booking.rental_start_time || booking.pickup_time || booking.jam_sewa || '09:00',
                        
          // Alamat pengantaran
          alamatPengantaran: booking.alamat_pengantaran || booking.alamatPengantaran || booking.delivery_address || 
                           booking.pickup_address || booking.alamat_antar || booking.alamat || 'Tidak ada alamat',
                           
          // Tanggal pengembalian
          tanggalPengembalian: booking.tanggal_pengembalian || booking.tanggalPengembalian || booking.end_date || 
                              booking.rental_end_date || booking.return_date || booking.tgl_kembali ||
                              new Date().toISOString().split('T')[0],
                              
          // Jam pengembalian
          jamPengembalian: booking.jam_pengembalian || booking.jamPengembalian || booking.end_time || 
                          booking.rental_end_time || booking.return_time || booking.jam_kembali || '17:00',
                          
          // Alamat pengembalian  
          alamatPengembalian: booking.alamat_pengembalian || booking.alamatPengembalian || booking.return_address || 
                             booking.alamat_kembali || booking.alamat_pengantaran || booking.alamat || 'Tidak ada alamat',
                             
          // Cabang
          pilihCabang: booking.pilih_cabang || booking.pilihCabang || booking.branch || booking.cabang || 
                      booking.branch_name || booking.outlet || 'Cabang Utama',
                      
          // Motor
          pilihMotor: booking.pilih_motor || booking.pilihMotor || booking.motor || booking.motor_type || 
                     booking.vehicle || booking.kendaraan || booking.jenis_motor || 'Motor tidak diketahui',
                     
          // Harga
          motorPrice: booking.motor_price || booking.motorPrice || booking.price || booking.harga || 
                     booking.total_price || booking.total || booking.amount || 'Rp 0',
                     
          // Status
          status: booking.status || booking.order_status || booking.booking_status || 'Menunggu Konfirmasi',
          
          // Tanggal booking
          tanggalBooking: booking.tanggal_booking || booking.tanggalBooking || 
                         booking.created_at?.split('T')[0] || booking.createdAt?.split('T')[0] || 
                         booking.order_date || booking.booking_date || new Date().toISOString().split('T')[0],
                         
          // Waktu booking
          waktuBooking: booking.waktu_booking || booking.waktuBooking || 
                       booking.created_at?.split('T')[1]?.substring(0, 5) || 
                       booking.createdAt?.split('T')[1]?.substring(0, 5) || 
                       booking.order_time || booking.booking_time || new Date().toTimeString().substring(0, 5)
        };
        
        console.log(`Mapped order ${index + 1}:`, mappedOrder);
        return mappedOrder;
      });
      
      console.log('Final mapped orders:', mappedOrders);
      setOrders(mappedOrders);
      
      if (mappedOrders.length > 0) {
        console.log(`Successfully loaded ${mappedOrders.length} orders from ${successEndpoint}`);
      }
      
    } catch (err) {
      console.error('Error fetching booking history:', err);
      setError(`Gagal memuat riwayat orderan: ${(err as Error).message}`);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

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
          <div class="flex space-x-3">
            <button
              onClick={fetchBookingHistory}
              class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              disabled={isLoading()}
            >
              <svg class={`w-4 h-4 ${isLoading() ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>{isLoading() ? 'Loading...' : 'Refresh'}</span>
            </button>
            <button
              onClick={() => navigate('/sewamotor')}
              class="px-6 py-3 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors flex items-center space-x-2"
            >
              <span class="text-lg">+</span>
              <span>Pesan Motor</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error() && (
          <div class="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
            <p class="text-red-300">{error()}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading() ? (
          <div class="bg-gray-900 rounded-2xl p-12 text-center border border-gray-700">
            <div class="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-gray-300">Memuat riwayat orderan...</p>
          </div>
        ) : (
          <div class="space-y-6">{orders().length === 0 ? (
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
                onClick={() => navigate('/sewamotor')}
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
        )}

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
