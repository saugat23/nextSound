import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";

const YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const createStreamSchema = z.object( {
    creatorId: z.string(),
    url: z.string()
})

export async function POST(req: NextRequest) {
    try {
      const data = createStreamSchema.parse(await req.json());
      const isYT = data.url.match(YT_REGEX);

      if(!isYT) { 
        return NextResponse.json( {
            message: "Wrong URL Format"
        }, {
            status: 411
        })
      }

      const extractedId = data.url.split("?v=")[1];

      const res = youtubesearchapi.GetVideoDetails(extractedId);
      const stream = await prismaClient.stream.create({
        data: {
            userId: data.creatorId,
            url: data.url,
            extractedId,
            type: "Youtube"
        } 
      }); 

      return NextResponse.json({
        message: "Stream Added Successfully!!",
        id: stream.id
      })
    } catch (error) {
        return NextResponse.json( {
            message: "Error while adding Stream"
        },
        {
            status: 411,
        }
    )
    }
}

export async function GET(req: NextRequest){
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    const streams = await prismaClient.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    }) 

    return NextResponse.json( {
        streams
    })
}