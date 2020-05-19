import arweave from '../../arweave-config';
import {decrypt_mail, wallet_to_key} from '../../helpers';
import {get_public_key, encrypt_mail} from './crypto';
import { toast } from 'react-toastify';


async function getMessages (beforeTimestamp=null) {
    const address = sessionStorage.getItem('AR_Wallet', null);
    const jwk = JSON.parse(sessionStorage.getItem('AR_jwk', null));

    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    var afterTimestamp = Math.round(oneWeekAgo.getTime() / 1000);

    let get_mail_query =
    {
        op: 'and',
        expr1:
            {
                op: 'equals',
                expr1: 'to',
                expr2: address
            },
        expr2:
            {
                op: 'equals',
                expr1: 'App-Name',
                expr2: 'permamail'
            }
    }

    const tx_ids = await arweave.arql(get_mail_query)

    var tx_rows = []
    if (tx_ids.length > 0) {
        tx_rows = await Promise.all(tx_ids.map(async function (txid, i) {
            let tx_row = {}
            
            var tx = await arweave.transactions.get(txid)
            tx_row['unixTime'] = '0'
            tx.get('tags').forEach(tag => {
                let key = tag.get('name', { decode: true, string: true })
                let value = tag.get('value', { decode: true, string: true })
                if (key === 'Unix-Time') tx_row['unixTime'] = value
            })

            tx_row['id'] = txid
            tx_row['tx_status'] = await arweave.transactions.getStatus(txid)
            var from_address = await arweave.wallets.ownerToAddress(tx.owner)
            tx_row['from'] = await getName(from_address)
            tx_row['td_fee'] = arweave.ar.winstonToAr(tx.reward)
            tx_row['td_qty'] = arweave.ar.winstonToAr(tx.quantity)

            var mail = arweave.utils.bufferToString(await decrypt_mail(arweave.utils.b64UrlToBuffer(tx.data),await wallet_to_key(jwk)));
            try {
                mail = JSON.parse(mail);
            } catch (e) {} 

            // Upgrade old format.
            if (typeof mail === 'string') {
                mail = { 
                    body: mail,
                    subject: txid, 
                }
            }

            tx_row['mail'] = mail;

            // Validate 
            if (typeof mail !== 'object' || typeof mail.body !== 'string' || typeof mail.subject !== 'string') {
                console.error(mail);
                throw new Error(`Unexpected mail format: ${mail}`);
            }

            return tx_row
        }))
    }

    return tx_rows;
}

export const getSentMessages = async () => {
    const address = sessionStorage.getItem('AR_Wallet', null);
    const jwk = JSON.parse(sessionStorage.getItem('AR_jwk', null));

    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    var afterTimestamp = Math.round(oneWeekAgo.getTime() / 1000);

    let get_mail_query =
    {
        op: 'and',
        expr1:
            {
                op: 'equals',
                expr1: 'owner',
                expr2: address
            },
        expr2:
            {
                op: 'equals',
                expr1: 'App-Name',
                expr2: 'permamail'
            }
    }

    const tx_ids = await arweave.arql(get_mail_query)

    var tx_rows = []
    if (tx_ids.length > 0) {
        tx_rows = await Promise.all(tx_ids.map(async function (txid, i) {
            let tx_row = {}
            
            var tx = await arweave.transactions.get(txid)
            tx_row['unixTime'] = '0'
            tx.get('tags').forEach(tag => {
                let key = tag.get('name', { decode: true, string: true })
                let value = tag.get('value', { decode: true, string: true })
                if (key === 'Unix-Time') tx_row['unixTime'] = value
            });

            tx_row['id'] = txid
            tx_row['tx_status'] = await arweave.transactions.getStatus(txid)
            var from_address = await arweave.wallets.ownerToAddress(tx.owner)
            tx_row['from'] = await getName(from_address)
            tx_row['td_fee'] = arweave.ar.winstonToAr(tx.reward)
            tx_row['td_qty'] = arweave.ar.winstonToAr(tx.quantity)

            var mail = arweave.utils.bufferToString(await decrypt_mail(arweave.utils.b64UrlToBuffer(tx.data),await wallet_to_key(jwk)));
            try {
                mail = JSON.parse(mail);
            } catch (e) {} 

            // Upgrade old format.
            if (typeof mail === 'string') {
                mail = { 
                    body: mail,
                    subject: txid, 
                }
            }

            tx_row['mail'] = mail;

            // Validate 
            if (typeof mail !== 'object' || typeof mail.body !== 'string' || typeof mail.subject !== 'string') {
                console.error(mail);
                throw new Error(`Unexpected mail format: ${mail}`);
            }

            return tx_row
        }))
    }

    return tx_rows;
}


export const sendMessage = async (message) => {
    const jwk = JSON.parse(sessionStorage.getItem('AR_jwk', null));
    var mailTagUnixTime = Math.round((new Date()).getTime() / 1000)

    var tokens = message.tokens;
    if(tokens == '') {
        tokens = '0';
    }

    tokens = arweave.ar.arToWinston(tokens);

    var pub_key = get_public_key(message.to);

    if(pub_key == undefined) {
        toast('Recipient has to send a transaction to the network, first!', { type: toast.TYPE.ERROR });
        return;
    }

    var content = await encrypt_mail(message.mail.body, message.mail.subject, pub_key);

    var tx =
        await arweave.createTransaction(
            {
                target: message.to,
                data: arweave.utils.concatBuffers([content]),
                quantity: tokens
            },
            jwk
        )

    tx.addTag('App-Name', 'permamail')
    tx.addTag('App-Version', '0.1.2')
    tx.addTag('Unix-Time', mailTagUnixTime)
    await arweave.transactions.sign(tx, jwk)
    console.log(tx.id)
    await arweave.transactions.post(tx)
    toast('Mail dispatched!', { type: toast.TYPE.SUCCESS });

}

export const addTransactionToPending = (tx_id) => {
    let pending = localStorage.getItem('weavemail_pending_txs');

    if(!pending) {
        pending = JSON.stringify([tx_id]);
    } else {
        pending = JSON.parse(pending);
        pending.push(tx_id);
    }

    localStorage.setItem(JSON.stringify(pending));
}

export const getPendingTransactions = () => {
    let pending = localStorage.getItem('weavemail_pending_txs');

    if(!pending) {
        pending = [];
        localStorage.setItem(JSON.stringify(pending));
    }

    return pending;
}

export const getName = async (addr) => {
	let get_name_query =
		{
			op: 'and',
			expr1:
				{
					op: 'equals',
					expr1: 'App-Name',
					expr2: 'arweave-id'
				},
			expr2:
				{
					op: 'and',
					expr1:
						{
							op: 'equals',
							expr1: 'from',
							expr2: addr
						},
					expr2:
						{
							op: 'equals',
							expr1: 'Type',
							expr2: 'name'
						}
				}
        }
        
	const txs = await arweave.api.post(`arql`, get_name_query)

	if(txs.data.length == 0)
		return addr

	const tx = await arweave.transactions.get((txs.data)[0])

	return tx.get('data', {decode: true, string: true})

}


export default getMessages;