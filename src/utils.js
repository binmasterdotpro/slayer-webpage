function msToTime (seconds) {
    const ms = seconds % 1000
    seconds = (seconds - ms) / 1000
    const secs = seconds % 60
    seconds = (seconds - secs) / 60
    const mins = seconds % 60
    const hrs = (seconds - mins) / 60

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
}

function pad (n, z) {
    z = z || 2
    return ('00' + n).slice(-z)
}