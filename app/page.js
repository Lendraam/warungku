'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Bagian Home */}
      <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Selamat Datang di <span className="text-blue-600">WarungKu</span>!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Temukan berbagai kebutuhan harian Anda dengan harga terjangkau dan pelayanan terbaik.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Lihat Produk
        </Link>
      </section>

      {/* Bagian Tentang */}
      <section className="bg-blue-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-600">
            Tentang WarungKu
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            WarungKu adalah tempat belanja kebutuhan harian yang menawarkan berbagai produk
            berkualitas dengan harga yang sangat terjangkau. Kami berkomitmen untuk memberikan pelayanan
            terbaik kepada pelanggan, dengan berbagai pilihan produk dari kategori makanan, minuman,
            alat rumah tangga, dan banyak lagi.
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dengan antarmuka yang mudah digunakan, kami memastikan pengalaman berbelanja online Anda
            berjalan lancar dan menyenangkan. Temukan produk-produk pilihan kami dan nikmati pengalaman
            belanja yang praktis dan cepat di WarungKu!
          </p>
        </div>
      </section>
    </div>
  );
}
