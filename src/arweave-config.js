import Arweave from 'arweave/web';

const hostname = window && window.location && window.location.hostname;

let arweave_config = null;

if(hostname === "localhost") {
    // arweave_config = {
    //     host: '127.0.0.1',
    //     port: 1984
    // }
} else {
    
}


const arweave = Arweave.init();

export default arweave;