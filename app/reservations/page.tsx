import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getReservations from '../actions/getReservation';
import ReservationsClient from './ReservationsClient';

const ReservationPage =async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title='Unauthorizd' subtitle='Please Login'/>
            </ClientOnly>
        )
    }
    const reservation = await getReservations({
        authorId: currentUser.id
    })

    if(reservation.length=== 0){
        return (
            <ClientOnly>
                <EmptyState title='No reservation found' subtitle='Looks like you have no reservations on your properties'/>
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <ReservationsClient
            reservations={reservation}
            currentUser ={currentUser}
        />
    </ClientOnly>
  )
}

export default ReservationPage