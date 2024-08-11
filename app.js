import {fetchData} from './data/config.js'
(async () => {
    
    await fetchData('ligue-1', 2023, 1944, {
        code: 'FR1',
        start: 1938,
        end: 1931,
        extend: true
    })

    await fetchData('premier-league', 2023, 1991, {
        code: 'GB1'
    })

    await fetchData('bundesliga', 2023, 1962, {
        code: 'L1'
    })

    await fetchData('serie-a', 2023, 1945, {
        code: 'IT1',
        start: 1942,
        end: 1928,
        extend: true
    })

    await fetchData('laliga-a', 2023, 1938, {
        code: 'ES1',
        start: 1935,
        end: 1927,
        extend: true
    })
    
    
    
})()




