import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

const address = "1601 rue viola-demond, Lasalle, H8N 0G2";
const encodedAddress = encodeURIComponent(address);
//http://localhost:3000/map?search=1601%20rue%20viola-demond%2C%20Lasalle%2C%20H8N%200G2

// Mock the GET request for the specific address
mock.onGet(`/api/search?query=${encodedAddress}`).reply(200, {
    results: [
        {
            geometry: {
                location: {
                    lat: 45.4275, // Example latitude for the address
                    lng: -73.6297 // Example longitude for the address
                }
            },
            formatted_address: "1601 Rue Viola Desmond, Lasalle, QC H8N 0G2, Canada"
        }
    ],
    status: "OK"
});
