import {fetchData} from './data/config.js'
(async () => {
    
    await fetchData('ligue-1', 2024, 1944, {
        country: 'french',
        code: 'FR1',
        start: 1938,
        end: 1931,
        extend: true
    })

    await fetchData('premier-league', 2024, 1991, {
        country: 'england',
        code: 'GB1'
    })

    await fetchData('bundesliga', 2024, 1962, {
        country: 'germany',
        code: 'L1'
    })

    await fetchData('serie-a', 2024, 1945, {
        country: 'italie',
        code: 'IT1',
        start: 1942,
        end: 1928,
        extend: true
    })

    await fetchData('laliga-a', 2024, 1938, {
        country: 'spain',
        code: 'ES1',
        start: 1935,
        end: 1927,
        extend: true
    })

    await fetchData('eredivisie', 2024, 1955, {
        country: 'netherlands',
        code: 'NL1',
    })

    await fetchData('super-lig', 2024, 1967, {
        country: 'turkey',
        code: 'TR1',
    })

    await fetchData('pro-league', 2024, 1894, {
        country: 'belgium',
        code: 'BE1',
    })
    
})()




