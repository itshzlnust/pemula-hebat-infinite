'use client';

import { useState, useEffect } from 'react';
import { useRouter }
    from 'next/navigation'; // Untuk navigasi
import { motion } from 'framer-motion';

// Data sampel (gantilah dengan data dari API Anda jika perlu)
const kelasData = [
    { id: '7A', nama: 'Kelas 7A' },
    { id: '7B', nama: 'Kelas 7B' },
    { id: '8A', nama: 'Kelas 8A' },
    { id: '8B', nama: 'Kelas 8B' },
    { id: '9A', nama: 'Kelas 9A' },
    { id: '9B', nama: 'Kelas 9B' },
];

const semuaSiswaData = [
    { id: 'siswa-001', nama: 'Budi Santoso', kelasId: '7A' },
    { id: 'siswa-002', nama: 'Ani Lestari', kelasId: '7A' },
    { id: 'siswa-003', nama: 'Citra Dewi', kelasId: '7B' },
    { id: 'siswa-004', nama: 'Doni Firmansyah', kelasId: '8A' },
    { id: 'siswa-005', nama: 'Eka Putri', kelasId: '8A' },
    { id: 'siswa-006', nama: 'Fajar Nugraha', kelasId: '9A' },
];

export default function WaliKelasDashboardPage() {
    const [selectedKelasId, setSelectedKelasId] = useState('');
    const [selectedSiswa, setSelectedSiswa] = useState(null); // Menyimpan objek siswa yang dipilih
    const [siswaDiKelas, setSiswaDiKelas] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (selectedKelasId) {
            setSiswaDiKelas(semuaSiswaData.filter(siswa => siswa.kelasId === selectedKelasId));
            setSelectedSiswa(null); // Reset pilihan siswa jika kelas berubah
        } else {
            setSiswaDiKelas([]);
            setSelectedSiswa(null);
        }
    }, [selectedKelasId]);

    const handleLihatLaporan = () => {
        if (selectedSiswa) {
            // Arahkan ke halaman laporan siswa. Anda perlu membuat halaman ini.
            // Contoh: router.push(`/wali-kelas/laporan/${selectedSiswa.id}`);
            alert(`Akan diarahkan ke halaman laporan untuk ${selectedSiswa.nama} (ID: ${selectedSiswa.id}). Buat halaman ini.`);
            console.log(`Navigasi ke laporan siswa ID: ${selectedSiswa.id}`);
        } else {
            alert('Silakan pilih siswa terlebih dahulu.');
        }
    };

    const handleInputDataLaporan = () => {
        // Arahkan ke halaman input data laporan yang sudah Anda pindahkan
        router.push('/wali-kelas/input');
    };

    const sidebarVariants = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    const mainContentVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 shadow-md p-4">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
                    Dasbor Wali Kelas
                </h1>
            </header>

            <div className="flex flex-1 p-4 md:p-6 gap-4 md:gap-6">
                {/* Panel Kiri - Sidebar */}
                <motion.aside
                    variants={sidebarVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col"
                >
                    <div className="mb-6">
                        <label htmlFor="kelasSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Pilih Kelas:
                        </label>
                        <select
                            id="kelasSelect"
                            value={selectedKelasId}
                            onChange={(e) => setSelectedKelasId(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="">-- Semua Kelas --</option>
                            {kelasData.map(kelas => (
                                <option key={kelas.id} value={kelas.id}>{kelas.nama}</option>
                            ))}
                        </select>
                    </div>

                    {selectedKelasId && (
                        <div className="mb-6 flex-grow overflow-y-auto">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-3">
                                Daftar Siswa di {kelasData.find(k => k.id === selectedKelasId)?.nama}:
                            </h3>
                            {siswaDiKelas.length > 0 ? (
                                <ul className="space-y-2">
                                    {siswaDiKelas.map(siswa => (
                                        <li key={siswa.id}>
                                            <button
                                                onClick={() => setSelectedSiswa(siswa)}
                                                className={`w-full text-left p-3 rounded-md transition-colors duration-150
                                          ${selectedSiswa?.id === siswa.id
                                                        ? 'bg-blue-500 text-white dark:bg-blue-600'
                                                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                                                    }`}
                                            >
                                                {siswa.nama}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">Tidak ada siswa di kelas ini.</p>
                            )}
                        </div>
                    )}
                    {!selectedKelasId && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex-grow flex items-center justify-center">
                            Pilih kelas untuk melihat daftar siswa.
                        </p>
                    )}

                    <motion.button
                        onClick={handleLihatLaporan}
                        disabled={!selectedSiswa}
                        className="w-full mt-auto bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: !selectedSiswa ? 1 : 1.03 }}
                        whileTap={{ scale: !selectedSiswa ? 1 : 0.97 }}
                    >
                        Lihat Laporan Siswa Terpilih
                    </motion.button>
                </motion.aside>

                {/* Panel Kanan - Konten Utama */}
                <motion.main
                    variants={mainContentVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full md:w-2/3 lg:w-3/4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl flex flex-col items-center justify-center"
                >
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                            Aksi Wali Kelas
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Pilih siswa dari panel kiri untuk melihat laporan, atau lanjutkan untuk menginput data laporan baru.
                        </p>
                        <motion.button
                            onClick={handleInputDataLaporan}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-lg"
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgb(59,130,246)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Input Data Laporan Siswa
                        </motion.button>
                    </div>
                </motion.main>
            </div>
        </div>
    );
}