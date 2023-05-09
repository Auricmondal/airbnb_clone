import React from 'react'
import ClientOnly from '../components/ClientOnly'
import EmptyState from '../components/EmptyState'
import getFavouriteListings from '../actions/getFavouriteListings'
import getCurrentUser from '../actions/getCurrentUser'
import FavouritesClient from './FavouritesClient'

const FavouritesPage = async () => {

  const listings = await getFavouriteListings();

  const currentUser = await getCurrentUser();

  if(!currentUser){
    return (
      <ClientOnly>
          <EmptyState title='Unauthorized' subtitle='Please Log in'/>
      </ClientOnly>
      )
  }
  if(listings.length === 0){
    return (
      <ClientOnly>
          <EmptyState title='No Favourites Found' subtitle='Looks like you have no favourites'/>
      </ClientOnly>
      )
  }
  return (

    <ClientOnly>
        <FavouritesClient
          listings ={listings}
          currentUser ={currentUser}
        />
    </ClientOnly>
    )
}

export default FavouritesPage