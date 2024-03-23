import type { APIRoute } from "astro"
import { prisma } from "../../../utils/prisma";
import { z } from "zod";
import { customAlphabet } from 'nanoid/non-secure'

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 8)


export const POST: APIRoute = async ({ url, request }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        const body = await request.json();
        const content = body.content
        if (z.string().min(1).safeParse(content).success) {
            const randomLink = nanoid()
            await prisma.paste.create({
                data: {
                    content,
                    slug: randomLink
                }
            })
            return new Response(JSON.stringify({ link: `${url.origin}/${randomLink}` }))
        }
    }
    return new Response(JSON.stringify({ "success": false }))
}