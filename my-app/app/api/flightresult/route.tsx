import Amadeus from 'amadeus-ts';
import { NextResponse } from 'next/server';

// Initialize Amadeus client
const amadeusClient = new Amadeus({
    clientId: process.env.NEXT_PUBLIC_AMADEUS_API_KEY,
    clientSecret: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const originKeyword = searchParams.get('originKeyword'); // Location name
    const destinationKeyword = searchParams.get('destinationKeyword');
    let dateOfDeparture = searchParams.get('dateOfDeparture');

    if (!originKeyword || !destinationKeyword || !dateOfDeparture) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    try {
        // 1. Get Origin Location Code
        const data = await fetch(`http://localhost:3000/api/citycodes?keyword=${originKeyword}`);
        
        const originResponse = await data.json();
        // const originResponse = await amadeusClient.referenceData.locations.get({
        //     keyword: originKeyword,
        //     subType: Amadeus.location.any
        // });
        if (!originResponse.data || originResponse.data.length === 0) {
            return NextResponse.json({ error: 'No matching origin found' }, { status: 404 });
        }
        const originCode = originResponse.data[0].iataCode;
        
        // 2. Get Destination Location Code
        // const destinationResponse = await amadeusClient.referenceData.locations.get({
        //     keyword: destinationKeyword,
        //     subType: Amadeus.location.any
        // });

        const destinationData = await fetch(`http://localhost:3000/api/citycodes?keyword=${destinationKeyword}`);
        const destinationResponse = await destinationData.json();

        if (!destinationResponse.data || destinationResponse.data.length === 0) {
            return NextResponse.json({ error: 'No matching destination found' }, { status: 404 });
        }
        const destinationCode = destinationResponse.data[0].iataCode;
        // 3. Fetch Flight Offers
        const flightResponse = await amadeusClient.shopping.flightOffersSearch.get({
            originLocationCode: originCode,
            destinationLocationCode: destinationCode,
            departureDate: dateOfDeparture,
            adults: 1,
            max: 5 // Limit results
        });

        return NextResponse.json(flightResponse.result, { status: 200 });
    } catch (error) {
        if(error) {
            return NextResponse.json({ error: 'Failed to fetch flight results' }, { status: 500 });
        };
    }
}