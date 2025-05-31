import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const body = await request.json();
        const { studentId, progressPembelajaran, pengembanganDiri, presensi } = body;

        // 1. Simpan Progress Pembelajaran
        for (const progress of progressPembelajaran) {
            // Hanya masukkan field yang ada nilainya
            const data = {
                studentId,
                subject: progress.mapel,
            };
            if (progress.jenisTugas === 'Tugas') data.tugas = Number(progress.nilai);
            if (progress.jenisTugas === 'UTS') data.uts = Number(progress.nilai);
            if (progress.jenisTugas === 'UAS') data.uas = Number(progress.nilai);

            await prisma.progressReport.create({ data });
        }

        // 2. Simpan Pengembangan Diri
        for (const dev of pengembanganDiri) {
            await prisma.selfDevelopment.create({
                data: {
                    studentId,
                    activity: dev.kegiatan,
                    notes: dev.catatan,
                }
            });
        }

        // 3. Simpan Presensi
        for (const pres of presensi) {
            await prisma.attendance.create({
                data: {
                    studentId,
                    date: new Date(pres.date),
                    status: pres.status.toLowerCase(),
                }
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}