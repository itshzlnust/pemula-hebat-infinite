// filepath: d:\pemula-hebat\src\app\api\manage-account\[userId]\route.js
import { NextResponse } from 'next/server';
import { PrismaClient, UserRole } from '@prisma/client'; // Pastikan UserRole diimport jika digunakan
import bcrypt from 'bcryptjs'; // Pastikan bcryptjs diimport

const prisma = new PrismaClient();

// GET: Mengambil satu user berdasarkan ID
export async function GET(request, { params }) {
    const { userId } = params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                teacherProfile: { select: { nip: true } },
            },
        });
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, user });
    } catch (error) {
        console.error(`Error fetching user ${userId}:`, error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// PUT: Memperbarui user berdasarkan ID
export async function PUT(request, { params }) {
    const { userId } = params;
    try {
        const { name, email, role, password, nip } = await request.json();
        if (!name || !email || !role) {
            return NextResponse.json({ success: false, error: 'Name, email, and role are required' }, { status: 400 });
        }
        const validRoles = Object.values(UserRole);
        if (!validRoles.includes(role.toUpperCase())) {
            return NextResponse.json({ success: false, error: 'Invalid role specified' }, { status: 400 });
        }
        const userRole = role.toUpperCase();
        const currentUser = await prisma.user.findUnique({ where: { id: userId } });
        if (!currentUser) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }
        if (email !== currentUser.email) {
            const existingUserWithEmail = await prisma.user.findUnique({ where: { email } });
            if (existingUserWithEmail) {
                return NextResponse.json({ success: false, error: 'Email already in use by another account' }, { status: 409 });
            }
        }
        const dataToUpdate = { name, email, role: userRole };
        if (password) {
            dataToUpdate.password = await bcrypt.hash(password, 10);
        }
        if (userRole === UserRole.TEACHER && nip !== undefined) {
            dataToUpdate.teacherProfile = {
                upsert: {
                    create: { nip: nip || '' },
                    update: { nip: nip || '' },
                },
            };
        }
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: dataToUpdate,
        });
        const { password: _, ...userWithoutPassword } = updatedUser;
        return NextResponse.json({ success: true, user: userWithoutPassword });
    } catch (error) {
        console.error(`Error updating user ${userId}:`, error);
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return NextResponse.json({ success: false, error: 'Email already in use.' }, { status: 409 });
        }
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// DELETE: Menghapus user berdasarkan ID
export async function DELETE(request, { params }) {
    const { userId } = params;
    try {
        await prisma.user.delete({
            where: { id: userId },
        });
        return NextResponse.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(`Error deleting user ${userId}:`, error);
        if (error.code === 'P2025') {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }
        if (error.code === 'P2003') {
            return NextResponse.json({ success: false, error: 'Cannot delete user. Other records depend on this user.' }, { status: 409 });
        }
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}