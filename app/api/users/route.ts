import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/users:
 *   post:
 *     description: Create a new user
 *     requestBody:
 *       description: User object that needs to be added to the database
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: john.doe@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the newly created user
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The email of the user
 *                   example: john.doe@example.com
 *       500:
 *         description: Error creating user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Error creating user
 */
export async function POST(req: Request) {
    const { name, email } = await req.json();

    try {
        const user = await prisma.user.create({
            data: { name, email },
        });
        return new Response(JSON.stringify(user, null, 2), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error creating user' }), { status: 500 });
    }
}

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the user
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the user
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     description: The email of the user
 *                     example: john.doe@example.com
 *       500:
 *         description: Error fetching users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Error fetching users
 */
export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return new Response(JSON.stringify(users, null, 2), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error fetching users' }), { status: 500 });
    }
}