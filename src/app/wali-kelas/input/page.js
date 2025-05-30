'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation'

const generateId = () => `id_${Math.random().toString(36).substr(2, 9)}`;

const STATUS_ORDER = ['Hadir', 'Sakit', 'Izin', 'Alpa'];
const STATUS_CLASSES = {
  'Hadir': 'hadir',
  'Sakit': 'sakit',
  'Izin': 'izin',
  'Alpa': 'alpa',
};

const kelasOptions = [
  'Kelas 7A', 'Kelas 7B', 'Kelas 7C',
  'Kelas 8A', 'Kelas 8B', 'Kelas 8C',
  'Kelas 9A', 'Kelas 9B', 'Kelas 9C',
];

const allStudents = [
  { id: 'siswa-001', name: 'Budi Santoso', kelas: 'Kelas 7A' },
  { id: 'siswa-002', name: 'Ani Lestari', kelas: 'Kelas 7A' },
  { id: 'siswa-003', name: 'Citra Dewi', kelas: 'Kelas 7B' },
  { id: 'siswa-004', name: 'Doni Firmansyah', kelas: 'Kelas 8A' },
  { id: 'siswa-005', name: 'Eka Putri', kelas: 'Kelas 8A' },
  { id: 'siswa-006', name: 'Fajar Nugraha', kelas: 'Kelas 8B' },
  { id: 'siswa-007', name: 'Gita Amelia', kelas: 'Kelas 9A' },
  { id: 'siswa-008', name: 'Hadi Prabowo', kelas: 'Kelas 9A' },
  { id: 'siswa-009', name: 'Indah Permata', kelas: 'Kelas 9B' },
];

const jenisTugasOptions = ['Tugas', 'UTS', 'UAS']; // Opsi untuk jenis tugas

export default function WaliKelasPage() {
  const [selectedKelas, setSelectedKelas] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const router = useRouter();

  const mataPelajaranOptions = [
    'Matematika',
    'Bahasa Indonesia',
    'Bahasa Inggris',
    'IPA Terpadu',
    'IPS Terpadu',
    'PPKn',
    'Seni Budaya',
    'Pendidikan Jasmani',
  ];

  const [progressPembelajaran, setProgressPembelajaran] = useState([
    { mapel: mataPelajaranOptions[0] || '', jenisTugas: jenisTugasOptions[0], nilai: '' }, // Tambahkan jenisTugas
  ]);

  const [pengembanganDiri, setPengembanganDiri] = useState([
    { kegiatan: '', catatan: '' },
  ]);

  const [presensiEntries, setPresensiEntries] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (selectedKelas) {
      setFilteredStudents(allStudents.filter(student => student.kelas === selectedKelas));
    } else {
      setFilteredStudents([]);
    }
    setSelectedStudent('');
    setPresensiEntries([]);
  }, [selectedKelas]);


  const handleProgressChange = (index, event) => {
    const values = [...progressPembelajaran];
    values[index][event.target.name] = event.target.value;
    setProgressPembelajaran(values);
  };

  const addProgressField = () => {
    setProgressPembelajaran([...progressPembelajaran, { mapel: mataPelajaranOptions[0] || '', jenisTugas: jenisTugasOptions[0], nilai: '' }]); // Tambahkan jenisTugas
  };

  const removeProgressField = (index) => {
    if (progressPembelajaran.length > 1) {
      const values = [...progressPembelajaran];
      values.splice(index, 1);
      setProgressPembelajaran(values);
    }
  };

  const handlePengembanganDiriChange = (index, event) => {
    const values = [...pengembanganDiri];
    values[index][event.target.name] = event.target.value;
    setPengembanganDiri(values);
  };

  const addPengembanganDiriField = () => {
    setPengembanganDiri([...pengembanganDiri, { kegiatan: '', catatan: '' }]);
  };

  const removePengembanganDiriField = (index) => {
    if (pengembanganDiri.length > 1) {
      const values = [...pengembanganDiri];
      values.splice(index, 1);
      setPengembanganDiri(values);
    }
  };

  const handlePresensiDateClick = (date) => {
    const clickedDateString = format(date, 'yyyy-MM-dd');
    let newEntries = [...presensiEntries];
    const existingEntryIndex = newEntries.findIndex(
      (entry) => format(entry.date, 'yyyy-MM-dd') === clickedDateString
    );

    if (existingEntryIndex > -1) {
      const currentEntry = newEntries[existingEntryIndex];
      const currentStatusIndex = STATUS_ORDER.indexOf(currentEntry.status);

      if (currentStatusIndex === STATUS_ORDER.length - 1) {
        newEntries.splice(existingEntryIndex, 1);
      } else {
        const nextStatus = STATUS_ORDER[currentStatusIndex + 1];
        newEntries[existingEntryIndex] = { ...currentEntry, status: nextStatus };
      }
    } else {
      newEntries.push({ id: generateId(), date: date, status: STATUS_ORDER[0] });
    }
    setPresensiEntries(newEntries);
  };

  useEffect(() => {
    const highlights = STATUS_ORDER.map(statusKey => {
      const className = `react-datepicker__day--highlighted-${STATUS_CLASSES[statusKey]}`;
      const dates = presensiEntries
        .filter(e => e.status === statusKey)
        .map(e => e.date);
      return { [className]: dates };
    }).filter(h => Object.values(h)[0].length > 0);

    setHighlightedDates(highlights);
  }, [presensiEntries]);

  const resetFormFields = () => {
    setSelectedStudent('');
    setProgressPembelajaran([{ mapel: mataPelajaranOptions[0] || '', jenisTugas: jenisTugasOptions[0], nilai: '' }]); // Reset jenisTugas juga
    setPengembanganDiri([{ kegiatan: '', catatan: '' }]);
    setPresensiEntries([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedKelas) {
      alert("Silakan pilih kelas terlebih dahulu.");
      return;
    }
    if (!selectedStudent) {
      alert("Silakan pilih siswa terlebih dahulu.");
      return;
    }
    console.log('Data Wali Kelas Submitted:', {
      kelas: selectedKelas,
      studentId: selectedStudent,
      progressPembelajaran, // progressPembelajaran sudah termasuk jenisTugas
      pengembanganDiri,
      presensi: presensiEntries.map(entry => ({
        date: format(entry.date, 'yyyy-MM-dd'),
        status: entry.status,
      })),
    });
    setIsSuccessModalOpen(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    router.push('/wali-kelas'); // Redirect to the main Wali Kelas page
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  const datePickerKey = presensiEntries.map(e => `${e.id}-${e.status}-${e.date.getTime()}`).join('|');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8">
      <style jsx global>{`
        .react-datepicker__day--highlighted-hadir { background-color: #a7f3d0; color: #047857; }
        .react-datepicker__day--highlighted-sakit { background-color: #fecaca; color: #b91c1c; }
        .react-datepicker__day--highlighted-izin { background-color: #fed7aa; color: #c2410c; }
        .react-datepicker__day--highlighted-alpa { background-color: #e5e7eb; color: #1f2937; }
        .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected { background-color: inherit !important; color: inherit !important; }
        .react-datepicker__day:hover { background-color: #f3f4f6; }
        .react-datepicker__day--highlighted-hadir:hover { background-color: #6ee7b7 !important; }
        .react-datepicker__day--highlighted-sakit:hover { background-color: #fca5a5 !important; }
        .react-datepicker__day--highlighted-izin:hover { background-color: #fdba74 !important; }
        .react-datepicker__day--highlighted-alpa:hover { background-color: #d1d5db !important; }
        .react-datepicker { font-size: 0.9rem; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); }
        .react-datepicker__header { background-color: #f9fafb; border-bottom: 1px solid #e5e7eb; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem; padding-top: 8px; }
        .react-datepicker__current-month, .react-datepicker__day-name { color: #374151; font-weight: 600; }
        .react-datepicker__day { width: 2rem; height: 2rem; line-height: 2rem; margin: 0.2rem; border-radius: 0.25rem; }
      `}</style>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-10 text-center"
      >
        Input Data Wali Kelas
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto">
        <motion.div
          custom={0}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="kelasSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pilih Kelas</label>
              <select
                id="kelasSelect"
                value={selectedKelas}
                onChange={(e) => setSelectedKelas(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">-- Pilih Kelas --</option>
                {kelasOptions.map(kelas => (
                  <option key={kelas} value={kelas}>{kelas}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="studentSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pilih Siswa</label>
              <select
                id="studentSelect"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
                disabled={!selectedKelas || filteredStudents.length === 0}
              >
                <option value="">-- Pilih Siswa --</option>
                {filteredStudents.map(student => (
                  <option key={student.id} value={student.id}>{student.name}</option>
                ))}
              </select>
              {!selectedKelas && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Pilih kelas terlebih dahulu untuk melihat daftar siswa.</p>}
              {selectedKelas && filteredStudents.length === 0 && <p className="text-xs text-red-500 dark:text-red-400 mt-1">Tidak ada siswa di kelas ini.</p>}
            </div>
          </div>
        </motion.div>

        <motion.div
          custom={1}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl"
        >
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-5">1. Progress Pembelajaran</h2>
          {progressPembelajaran.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-4 mb-4 p-4 border dark:border-gray-700 rounded-lg items-center" // Ubah grid-cols
            >
              <select
                name="mapel"
                value={item.mapel}
                onChange={(e) => handleProgressChange(index, e)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                {mataPelajaranOptions.length === 0 && <option value="">Tidak ada mapel</option>}
                {mataPelajaranOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <select // Dropdown Jenis Tugas
                name="jenisTugas"
                value={item.jenisTugas}
                onChange={(e) => handleProgressChange(index, e)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                {jenisTugasOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <input
                type="text"
                name="nilai"
                placeholder="Nilai/Skor"
                value={item.nilai}
                onChange={(e) => handleProgressChange(index, e)}
                className="p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
              {progressPembelajaran.length > 1 && (
                <button type="button" onClick={() => removeProgressField(index)} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-md text-sm h-full">
                  Hapus
                </button>
              )}
            </motion.div>
          ))}
          <button type="button" onClick={addProgressField} className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium">
            + Tambah Mata Pelajaran
          </button>
        </motion.div>

        <motion.div
          custom={2}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl"
        >
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-5">2. Pengembangan Diri</h2>
          {pengembanganDiri.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="space-y-4 mb-6 p-4 border dark:border-gray-700 rounded-lg"
            >
              <input
                type="text"
                name="kegiatan"
                placeholder="Nama Kegiatan (Contoh: Pramuka)"
                value={item.kegiatan}
                onChange={(e) => handlePengembanganDiriChange(index, e)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
              <textarea
                name="catatan"
                placeholder="Catatan Wali Kelas"
                value={item.catatan}
                onChange={(e) => handlePengembanganDiriChange(index, e)}
                rows="3"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              ></textarea>
              {pengembanganDiri.length > 1 && (
                <button type="button" onClick={() => removePengembanganDiriField(index)} className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm">
                  Hapus Kegiatan
                </button>
              )}
            </motion.div>
          ))}
          <button type="button" onClick={addPengembanganDiriField} className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium">
            + Tambah Kegiatan
          </button>
        </motion.div>

        <motion.div
          custom={3}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl"
        >
          <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-5">3. Presensi Siswa (Interaktif)</h2>
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start">
            <div className="flex justify-center md:justify-start">
              <DatePicker
                key={datePickerKey}
                selected={null}
                onChange={handlePresensiDateClick}
                inline
                highlightDates={highlightedDates}
                calendarClassName="border-none shadow-none"
                disabled={!selectedStudent}
              />
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2 mt-4 md:mt-0">
              <h3 className="text-lg font-medium text-gray-700 dark:text-white mb-2">Ringkasan Presensi:</h3>
              {!selectedStudent && <p className="text-sm text-gray-500 dark:text-gray-400">Pilih siswa terlebih dahulu untuk melihat atau input presensi.</p>}
              {selectedStudent && presensiEntries.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada data presensi. Klik tanggal pada kalender untuk menandai.</p>}
              {selectedStudent && presensiEntries.length > 0 &&
                [...presensiEntries].sort((a, b) => a.date - b.date).map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex justify-between items-center p-2.5 rounded-md text-sm
                      ${entry.status === 'Hadir' ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100' :
                        entry.status === 'Sakit' ? 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-100' :
                          entry.status === 'Izin' ? 'bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-100' :
                            'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                      }`}
                  >
                    <span>{format(entry.date, 'dd MMMM yyyy')}</span>
                    <span className="font-semibold">{entry.status}</span>
                  </motion.div>
                ))
              }
            </div>
          </div>
          <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-md text-sm text-gray-600 dark:text-gray-300">
            <p className="font-semibold mb-1">Cara Penggunaan Kalender Presensi:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Klik 1x pada tanggal: <span className="px-1.5 py-0.5 text-xs rounded bg-green-200 text-green-800">Hadir</span></li>
              <li>Klik 2x pada tanggal: <span className="px-1.5 py-0.5 text-xs rounded bg-red-200 text-red-800">Sakit</span></li>
              <li>Klik 3x pada tanggal: <span className="px-1.5 py-0.5 text-xs rounded bg-orange-200 text-orange-800">Izin</span></li>
              <li>Klik 4x pada tanggal: <span className="px-1.5 py-0.5 text-xs rounded bg-gray-300 text-gray-800">Alpa</span></li>
              <li>Klik 5x pada tanggal: Menghapus tanda presensi.</li>
            </ul>
          </div>
        </motion.div>

        <motion.button
          custom={4}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          type="submit"
          whileHover={{ scale: 1.03, boxShadow: "0px 0px 12px rgb(59,130,246)" }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-lg focus:outline-none focus:shadow-outline text-lg shadow-md disabled:opacity-50"
          disabled={!selectedStudent || !selectedKelas}
        >
          Simpan Data Laporan Siswa
        </motion.button>
      </form>

      <AnimatePresence>
        {isSuccessModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseSuccessModal}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm text-center"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-700 mb-5"
              >
                <svg className="h-10 w-10 text-green-600 dark:text-green-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Berhasil!</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Data laporan siswa telah berhasil disimpan.
              </p>
              <motion.button
                onClick={handleCloseSuccessModal}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                OK
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}