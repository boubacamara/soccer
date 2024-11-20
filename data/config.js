import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import fs from 'fs'

const fetchData = async(league, start, end, options)=> {

    await getHandler(league, start, end, options)

    
}

async function getCheerioData(loadFile, data, year, contry){

    let $ = await cheerio.load(loadFile)
            
    let day = 0 

    $('.large-6.columns .box').map((i, box) => {
        let hteams = $(box).find('tr > td.text-right.no-border-rechts.hauptlink > a')
        let ateams = $(box).find('tr > td.no-border-links.hauptlink > a')
        let scores = $(box).find('.zentriert.hauptlink a')
        day++

        hteams.map((ind, el) => {
            
            let hteam = $(el)?.text().trim()
            let ateam = $(ateams[ind])?.text().trim()
            let hscore = $(scores[ind])?.text().split(':')[0]
            let ascore = $(scores[ind])?.text().split(':')[1]
            data.push({
                hteam,
                ateam,
                hscore,
                ascore,
                year,
                contry,
                day
            })
            
        })
    })
    return data
}

async function getHandler(league,start, end, options){

    let data = []
    let newData = []

    for(let year = start; year > end; year--)
    {
        let res = await fetch(`https://www.transfermarkt.fr/${league}/gesamtspielplan/wettbewerb/${options.code}/saison_id/${year}`)
        let html = await res.text()

        data = await getCheerioData(html, data, year, options.country)

        console.log(data)
    }

    await appendData(data, league)

    if(options.extend)
    {
        for(let year = options.start; year > options.end; year--)
        {
            let res = await fetch(`https://www.transfermarkt.fr/${league}/gesamtspielplan/wettbewerb/${options.code}/saison_id/${year}`)
            let html = await res.text()

            data = await getCheerioData(html, newData, year, options.country)
        }
        await appendExtendData(data, league)
    }
}

async function appendData(data = [], league){

    try {
               
        await fs.writeFileSync(`./data/leagues/${league}.json`, JSON.stringify(data.sort((a, b)=> b.year - a.year), null, 2))
        
                

    } catch (error) {
        throw new Error(error)
    }
}

async function appendExtendData(data = [], league){

    try {
        
        let res = await fs.readFileSync(`./data/leagues/${league}.json`, 'utf-8')

        let results = JSON.parse(res)

        let newData = Array.from(results).concat(data)
               
        await fs.writeFileSync(`./data/leagues/${league}.json`, JSON.stringify(newData.sort((a, b)=> b.year - a.year), null, 2))
        
                

    } catch (error) {
        throw new Error(error)
    }
}

export {
    fetchData
}