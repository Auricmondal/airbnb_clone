import getCurrentUser from "./getCurrentUser"
import prisma from '@/app/libs/prismadb'

export default async function getFavouriteListings() {
    try{
        const currentUser =  await getCurrentUser();
        if(!currentUser){
            return [];
        }
        const favourites = await prisma.listing.findMany({
            where:{
                id:{
                    in: [...(currentUser.favouriteIds || [])]
                }
            }
        });
        const safeFavourites = favourites.map((favourite)=>({
            ...favourite,
            createdAt: favourite.createdAt.toISOString(),
        }));
        return safeFavourites;
    }
    catch(error: any){
        throw new Error(error);
    }
}