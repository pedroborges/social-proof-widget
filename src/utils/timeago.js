// https://github.com/vutran/twas

const locale = {
    template: '{amount} {unit} ago',
    now: 'just now',
    units: {
        's': 'second',
        's+': 'seconds',
        'min': 'minute',
        'min+': 'minutes',
        'h': 'hour',
        'h+': 'hours',
        'd': 'day',
        'd+': 'days',
        'w': 'week',
        'w+': 'weeks',
        'mon': 'month',
        'mon+': 'months',
        'y': 'year',
        'y+': 'years',
    }
}

// const locale = {
//     template: 'há {amount} {unit}',
//     now: 'agora',
//     units: {
//         's': 'segundo',
//         's+': 'segundos',
//         'min': 'minuto',
//         'min+': 'minutos',
//         'h': 'hora',
//         'h+': 'horas',
//         'd': 'dia',
//         'd+': 'dias',
//         'w': 'semana',
//         'w+': 'semanas',
//         'mon': 'mês',
//         'mon+': 'meses',
//         'y': 'ano',
//         'y+': 'anos',
//     }
// }

const is = (interval, unit) =>
    unit >= interval ? Math.floor(unit / interval) : 0

export default function(timestamp, now) {
    if (Object.prototype.toString.call(timestamp) !== '[object Date]') {
        timestamp = new Date(timestamp)
    }

    if (! now) {
        now = Date.now()
    }

    const seconds = (now - timestamp) / 1000
    const minutes = is(60, seconds)
    const hours = is(60, minutes)
    const days = is(24, hours)
    const weeks = is(7, days)
    const months = is(30, days)
    const years = is(12, months)

    let amount = years
    let unit = 'y'

    if (seconds <= 30) {
        return locale['now']
    } else if (years > 0) {
        amount = years
        unit = 'y'
    } else if (months > 0) {
        amount = months
        unit = 'mon'
    } else if (weeks > 0) {
        amount = weeks
        unit = 'w'
    } else if (days > 0) {
        amount = days
        unit = 'd'
    } else if (hours > 0) {
        amount = hours
        unit = 'h'
    } else if (minutes > 0) {
        amount = minutes
        unit = 'min'
    } else if (seconds > 0) {
        amount = seconds
        unit = 's'
    }

    amount = Math.floor(amount)
    unit = unit + (amount > 1 ? '+' : '')

    return locale.template
        .replace('{amount}', amount)
        .replace('{unit}', locale.units[unit])
};