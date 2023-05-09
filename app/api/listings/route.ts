import getCurrentUser from '@/app/actions/getCurrentUser';
import  prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';


export async function POST(
    request: Request
){
    const currentUser= await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body= await request.json();

    const {
        title,
        description,
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price
    } = body


    const listing = await prisma.listing.create({
        data:{
            title,
            description,
            imageSrc,
            category,
            roomCount,
            BathroomCount:bathroomCount,
            gustCount: guestCount,
            userId:currentUser.id,
            locationValue: location.value,
            price: parseInt(price, 10)

        }
    })

    return NextResponse.json(listing);
}