const { PrismaClient, UserRole } = require('@prisma/client');
const bcrypt = require('bcryptjs'); // Import bcryptjs

const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding ...`);

    // --- Hapus data lama (opsional, hati-hati di produksi!) ---
    await prisma.progressReport.deleteMany({});
    await prisma.student.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.class.deleteMany({});
    await prisma.admin.deleteMany({});
    await prisma.teacher.deleteMany({});
    await prisma.parent.deleteMany({});
    await prisma.user.deleteMany({});
    console.log('Old data deleted.');

    // --- Hash password ---
    const saltRounds = 10;
    const defaultPassword = 'password123'; // Definisikan password default
    const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds); // Hash password sekali

    // --- Buat User Admin ---
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@example.com',
            name: 'Admin Utama',
            password: hashedPassword, // Gunakan password yang sudah di-hash
            role: UserRole.ADMIN,
            adminProfile: {
                create: {},
            },
        },
    });
    console.log(`Created admin user: ${adminUser.name}`);

    // --- Buat User Guru (Walikelas) ---
    const teacherUser1 = await prisma.user.create({
        data: {
            email: 'guru.budi@example.com',
            name: 'Budi Santoso',
            password: hashedPassword, // Gunakan password yang sudah di-hash
            role: UserRole.TEACHER,
            teacherProfile: {
                create: {
                    nip: '198001012005011001',
                },
            },
        },
    });
    console.log(`Created teacher user: ${teacherUser1.name}`);

    const teacherUser2 = await prisma.user.create({
        data: {
            email: 'guru.siti@example.com',
            name: 'Siti Aminah',
            password: hashedPassword, // Gunakan password yang sudah di-hash
            role: UserRole.TEACHER,
            teacherProfile: {
                create: {
                    nip: '198502022008012002',
                },
            },
        },
    });
    console.log(`Created teacher user: ${teacherUser2.name}`);

    // --- Buat User Orang Tua ---
    const parentUser1 = await prisma.user.create({
        data: {
            email: 'ortu.agus@example.com',
            name: 'Agus Setiawan',
            password: hashedPassword, // Gunakan password yang sudah di-hash
            role: UserRole.PARENT,
            parentProfile: {
                create: {},
            },
        },
    });
    console.log(`Created parent user: ${parentUser1.name}`);

    const parentUser2 = await prisma.user.create({
        data: {
            email: 'ortu.rini@example.com',
            name: 'Rini Lestari',
            password: hashedPassword, // Gunakan password yang sudah di-hash
            role: UserRole.PARENT,
            parentProfile: {
                create: {},
            },
        },
    });
    console.log(`Created parent user: ${parentUser2.name}`);

    // --- Buat Kelas ---
    const class10A = await prisma.class.create({
        data: {
            name: 'Kelas 10A',
            year: 2024,
            teacher: {
                connect: { userId: teacherUser1.id },
            },
        },
    });
    console.log(`Created class: ${class10A.name}`);

    const class11B = await prisma.class.create({
        data: {
            name: 'Kelas 11B',
            year: 2024,
            teacher: {
                connect: { userId: teacherUser2.id },
            },
        },
    });
    console.log(`Created class: ${class11B.name}`);

    // --- Buat Mata Pelajaran ---
    const mathSubject = await prisma.subject.create({
        data: { name: 'Matematika', code: 'MTK01' },
    });
    const scienceSubject = await prisma.subject.create({
        data: { name: 'IPA Terpadu', code: 'IPA01' },
    });
    const historySubject = await prisma.subject.create({
        data: { name: 'Sejarah Indonesia', code: 'SEJ01' },
    });
    console.log('Created subjects: Matematika, IPA Terpadu, Sejarah Indonesia');

    // --- Hubungkan Mata Pelajaran ke Kelas ---
    await prisma.class.update({
        where: { id: class10A.id },
        data: {
            subjects: {
                connect: [{ id: mathSubject.id }, { id: scienceSubject.id }],
            },
        },
    });
    await prisma.class.update({
        where: { id: class11B.id },
        data: {
            subjects: {
                connect: [{ id: mathSubject.id }, { id: historySubject.id }],
            },
        },
    });
    console.log('Connected subjects to classes');

    // --- Buat Siswa ---
    const studentAndi = await prisma.student.create({
        data: {
            name: 'Andi Pratama',
            nis: 'S001',
            class: { connect: { id: class10A.id } },
            parents: {
                connect: [{ userId: parentUser1.id }],
            },
        },
    });
    console.log(`Created student: ${studentAndi.name}`);

    const studentCitra = await prisma.student.create({
        data: {
            name: 'Citra Dewi',
            nis: 'S002',
            class: { connect: { id: class10A.id } },
            parents: {
                connect: [{ userId: parentUser2.id }],
            },
        },
    });
    console.log(`Created student: ${studentCitra.name}`);

    const studentEka = await prisma.student.create({
        data: {
            name: 'Eka Putra',
            nis: 'S003',
            class: { connect: { id: class11B.id } },
            parents: {
                connect: [{ userId: parentUser1.id }],
            },
        },
    });
    console.log(`Created student: ${studentEka.name}`);

    // --- Buat Laporan Progress ---
    await prisma.progressReport.create({
        data: {
            grade: 85.5,
            comment: 'Pemahaman konsep sudah baik, perlu latihan soal variatif.',
            student: { connect: { id: studentAndi.id } },
            subject: { connect: { id: mathSubject.id } },
            teacher: { connect: { userId: teacherUser1.id } },
            reportDate: new Date('2024-03-15T10:00:00Z'),
        },
    });

    await prisma.progressReport.create({
        data: {
            grade: 90.0,
            comment: 'Sangat aktif dalam diskusi dan praktikum.',
            student: { connect: { id: studentCitra.id } },
            subject: { connect: { id: scienceSubject.id } },
            teacher: { connect: { userId: teacherUser1.id } },
            reportDate: new Date('2024-03-16T10:00:00Z'),
        },
    });

    await prisma.progressReport.create({
        data: {
            grade: 78.0,
            comment: 'Perlu meningkatkan analisis sumber sejarah primer.',
            student: { connect: { id: studentEka.id } },
            subject: { connect: { id: historySubject.id } },
            teacher: { connect: { userId: teacherUser2.id } },
            reportDate: new Date('2024-03-17T10:00:00Z'),
        },
    });
    console.log('Created progress reports');

    console.log(`Seeding finished.`);
}

main()
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });