import type { APIRoute } from "astro";
import { prisma } from "../../../utils/prisma";

export const GET: APIRoute = async ({ redirect, params }) => {
    const slug = params.slug

    if (slug) {
        const data = await prisma.paste.findFirst({
            where: {
                slug: slug,
            },
        });

        if (data === null) {
            return redirect("/", 302);
        }

        return new Response(data.content)
    }


    return new Response(JSON.stringify({ "hola": "mundo" }))
}