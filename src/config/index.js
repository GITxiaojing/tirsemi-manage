const os = require('os')
function getNetworkIp () {
    let needHost = ''
    try {
        let network = os.networkInterfaces()
        for (let dev in network) {
            let iface = network[dev]
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i]
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address
                }
            }
        }
    } catch (e) {
        needHost = 'localhost'
    }
    return needHost
}
const host = getNetworkIp()
module.exports = {
    homeName: 'home',
    TOKENKEY: 'X-Tirsemi-Admin-Token',
    dev: {
        host: host,
        proxy: {
            '/': 'http://192.168.1.109:8081'
        }
    },
    prod: {
        host: host,
        proxy: {
            '/': 'http://192.168.10.99:8080'
        }
    }
}