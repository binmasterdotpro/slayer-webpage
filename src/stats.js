const slayerInfo = document.querySelector('#slayerInfo')
const macroStats = document.querySelector('#macroStats')
const playerInfo = document.querySelector('#playerInfo')
const drops = document.querySelector('#drops')

socket.on('slayerInfo', ({questStart, state}) => {
    slayerInfo.innerHTML = `
        <h1 class="text-xl font-semibold">
            Current Slayer Quest
        </h1>
        <h2>
            Time Elapsed: ${msToTime(Math.floor(Date.now() - questStart))}<br/>
            Quest State: ${state}<br/>
        </h2>
  `
})

socket.on('macroStats', ({total, successful, failed, totalXP, programStart}) => {
    macroStats.innerHTML = `
        <h1 class="text-xl font-semibold">
            Macro Stats
        </h1>
        <h2>
            Total Bosses: ${total}<br/>
            Successful Attempts: ${successful}<br/>
            Failed Attempts: ${failed}<br/>
            Total Slayer XP Gained: ${totalXP}<br/>
            Time Elapsed: ${msToTime(Math.floor(Date.now() - programStart))}<br/>
        </h2>
  `
})

socket.on('playerInfo', ({username, healthInfo, manaInfo, location}) => {
    playerInfo.innerHTML = `
        <h1 class="text-xl font-semibold">
            Player Information
        </h1>
        <h2>
            Username: ${username}<br/>
            Health: ${healthInfo}<br/>
            Mana: ${manaInfo}<br/>
            Location: ${location}<br/>
        </h2>
  `
})

socket.on('drops', ({drops}) => {
    let dropString = ''
    for (const drop of Object.keys(drops)) {
        dropString += `${drop}: ${drops[drop]}x<br/>`
    }
    drops.innerHTML = `
        <h1 class="text-xl font-semibold">
            Drops
        </h1>
        <h2>
            ${dropString}
        </h2>
  `
})
