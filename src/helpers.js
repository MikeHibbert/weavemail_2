import arweave from './arweave-config';
import { toast } from 'react-toastify';

function decode(str) {
    return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
}

const checkPendingTransactions = (callback) => {
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

export default checkPendingTransactions;