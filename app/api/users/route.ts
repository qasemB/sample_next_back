import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { name, email } = await req.json();

    try {
        const user = await prisma.user.create({
            data: { name, email },
        });
        return new Response(JSON.stringify(user), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error creating user' }), { status: 500 });
    }
}

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching users' }), { status: 500 });
    }
}