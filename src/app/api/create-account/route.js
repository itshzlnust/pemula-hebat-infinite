import { NextResponse } from 'next/server';
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { username, email, password, role } // 'username' dari form akan menjadi 'name' di database
      = await request.json();

    if (!username || !email || !password || !role) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    // Validasi Role
    const validRoles = Object.values(UserRole); // ['ADMIN', 'TEACHER', 'PARENT']
    if (!validRoles.includes(role.toUpperCase())) {
      return NextResponse.json({ success: false, error: 'Invalid role specified' }, { status: 400 });
    }
    const userRole = role.toUpperCase(); // Pastikan role dalam format enum (ADMIN, TEACHER, PARENT)

    // Cek apakah email sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ success: false, error: 'Email already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 adalah salt rounds

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        name: username, // 'username' dari form menjadi 'name' di DB
        email,
        password: hashedPassword,
        role: userRole, // Gunakan nilai enum yang sudah divalidasi
        // Secara otomatis membuat profil terkait jika ada relasi one-to-one dan diperlukan
        ...(userRole === UserRole.ADMIN && { adminProfile: { create: {} } }),
        ...(userRole === UserRole.TEACHER && { teacherProfile: { create: {} } }),
        ...(userRole === UserRole.PARENT && { parentProfile: { create: {} } }),
      },
    });

    // Jangan kirim password kembali
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({ success: true, user: userWithoutPassword }, { status: 201 });

  } catch (error) {
    console.error('Create account API error:', error);
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return NextResponse.json({ success: false, error: 'Email already in use.' }, { status: 409 });
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}