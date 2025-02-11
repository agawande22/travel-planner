import { NextResponse } from 'next/server';

const hotelResponse = {};

export async function POST(request: Request) {
    const body = await request.json();   
    console.log(body);
    const { googlePlace, checkIn, checkOut } = body;
    const url = 'https://real-time-tripadvisor-scraper-api.p.rapidapi.com/tripadvisor_hotels_search_v2?location=new%20york';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2b7110fff0msh11ce59b9a7cc739p1cd368jsn119c9f0fde47',
            'x-rapidapi-host': 'real-time-tripadvisor-scraper-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

export async function GET() {
    if (hotelResponse) {
        return NextResponse.json({props: {hotelResponse}}, {status: 200});            
    } else {
        return NextResponse.json({message: 'No flights found'}, {status: 204});
    }
}