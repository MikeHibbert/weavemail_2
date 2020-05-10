import arweave from './arweave-config';
import { toast } from 'react-toastify';

function decode(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
}

export const checkPendingTransactions = (callback) => {
    const pending_txids = JSON.parse(sessionStorage.getItem('pending_txids'));
    const pending_doc_ids = [];

    for(let i in pending_txids) {
        const txid = pending_txids[i];
        
        arweave.transactions.get(txid).then(transaction => {
            const tags = transaction.get('tags');

            const tx = {};
            for(let i in tags) {
                const tag = tags[i];
                
                const name = tag.get('name', {decode: true, string: true}).replace('-', '_');
                let value = tag.get('value', {decode: true, string: true});

                tx[name] = value;
            }

            if(tx.data_type === 'tv-chart-data') {
                toast("Chart '" + tx.name + "' is now available to view", toast.TYPE.SUCCESS);
            }

            if(tx.data_type === 'tv-study-template') {
                toast("Study '" + tx.name + "' is now available to view", toast.TYPE.SUCCESS);
            }

            
        }).catch(error => {
            if(error.type == "TX_PENDING") {
                pending_doc_ids.push(txid);
            }
        }).finally(() => {
            sessionStorage.setItem('pending_txids', JSON.stringify(pending_doc_ids));

            callback(pending_doc_ids.length);
        });
    }
}


export const decrypt_mail = async (enc_data, key) => {
    var enc_key = new Uint8Array(enc_data.slice(0, 512))
    var enc_mail = new Uint8Array(enc_data.slice(512))

    var symmetric_key = await window.crypto.subtle.decrypt({ name: 'RSA-OAEP' }, key, enc_key)

    return arweave.crypto.decrypt(enc_mail, symmetric_key)
}

export const wallet_to_key = async (wallet) => {
    var w = Object.create(wallet)
    w.alg = 'RSA-OAEP-256'
    w.ext = true

    var algo = { name: 'RSA-OAEP', hash: { name: 'SHA-256' } }

    return await crypto.subtle.importKey('jwk', w, algo, false, ['decrypt'])
}

export const timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000)
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var year = a.getFullYear()
    var month = months[a.getMonth()]
    var date = a.getDate()
    var hour = a.getHours()
    var min = a.getMinutes()
    var sec = a.getSeconds()
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
    return time
}
