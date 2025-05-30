
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const mockChildrenData = [
            {
                id: 'mock-student-1',
                name: 'Budi Santoso',
                grade: 'Kelas 7A',
                progress: [
                    { subject: 'Matematika', tugas: 85, uts: 78, uas: 90, predicate: 'Sangat Baik', teacherName: 'Budi Santoso' },
                    { subject: 'Bahasa Indonesia', tugas: 70, uts: 75, uas: 88, predicate: 'Baik', teacherName: 'Siti Aminah' },
                    { subject: 'Fisika', tugas: 78, uts: 82, uas: 85, predicate: 'Baik', teacherName: 'Agus Wijaya' },
                    { subject: 'Kimia', tugas: 65, uts: 70, uas: 72, predicate: 'Cukup', teacherName: 'Rina Lestari' },
                ],
                selfDevelopment: [
                    { activity: 'Pramuka', notes: 'Aktif mengikuti kegiatan' },
                    { activity: 'Basket', notes: 'Mengikuti latihan rutin' },
                ],
                attendance: [
                    {
                        month: 'Mei 2025',
                        present: 20,
                        absent: 1,
                        sick: 0,
                        permission: 1,
                        notes: 'Izin tanggal 15 Mei',
                        dailyStatus: Array.from({ length: 31 }, (_, i) => {
                            const day = i + 1;
                            let status = 'present';
                            if (day === 15) status = 'permission';
                            if (day === 20) status = 'absent';
                            if (day > 25) status = 'belum terisi';
                            return { day, status };
                        })
                    },
                    {
                        month: 'April 2025',
                        present: 18,
                        absent: 0,
                        sick: 2,
                        permission: 0,
                        notes: 'Sakit tanggal 5 dan 10 April',
                        dailyStatus: Array.from({ length: 30 }, (_, i) => {
                            const day = i + 1;
                            let status = 'present';
                            if (day === 5 || day === 10) status = 'sick';
                            return { day, status };
                        })
                    }
                ]
            },
            {
                id: 'mock-student-2',
                name: 'Citra Dewi',
                grade: 'Kelas 10A',
                progress: [
                    { subject: 'Matematika', tugas: 90, uts: 85, uas: 92, predicate: 'Sangat Baik', teacherName: 'Budi Santoso' },
                    { subject: 'Bahasa Inggris', tugas: 80, uts: 88, uas: 91, predicate: 'Sangat Baik', teacherName: 'Dewi Sartika' },
                ],
                selfDevelopment: [
                    { activity: 'Paduan Suara', notes: 'Memiliki suara yang bagus' },
                ],
                attendance: [
                    {
                        month: 'Mei 2025',
                        present: 22,
                        absent: 0,
                        sick: 0,
                        permission: 0,
                        notes: null,
                        dailyStatus: Array.from({ length: 31 }, (_, i) => {
                            const day = i + 1;
                            let status = 'present';
                            if (day > 25) status = 'belum terisi';
                            return { day, status };
                        })
                    },
                ]
            }
        ];


        return NextResponse.json({ success: true, childrenData: mockChildrenData });

    } catch (error) {
        console.error('Error fetching parent dashboard data:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch dashboard data.' }, { status: 500 });
    }
}