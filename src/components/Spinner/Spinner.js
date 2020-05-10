import React from 'react';
import SVG from 'react-inlinesvg';

function Spinner(props) {
    return <div style={{width: "200px", marginLeft: "auto", marginRight: "auto", textAlign:'center'}}>
            <svg xmlSpace="preserve" 
                viewBox="0 0 100 100" 
                y="0" x="0" 
                xmlns="http://www.w3.org/2000/svg" 
                id="Layer_1" 
                version="1.1" 
                width="128px" height="128px" 
                style={{height: "100%", width:"100%", background: "rgb(255, 255, 255)", shapeRendering: "auto"}}
                dangerouslySetInnerHTML={{__html: '<g class="ldl-scale" style="transform-origin: 50% 50%; transform: rotate(0deg) scale(0.8, 0.8);"><g class="ldl-ani"><g class="ldl-layer"><g class="ldl-ani" style="transform: scale(0.91); transform-origin: 50px 50px; animation: 1.11111s linear -0.740741s infinite normal forwards running breath-ea2304ad-4b38-460d-a69f-51e107cdcd3e;"><path fill="#f4e6c8" d="M46.6 59.7L15 40.1v34.8c0 1 .8 1.8 1.8 1.8h66.4c1 0 1.8-.8 1.8-1.8V40.1L53.4 59.7c-2.1 1.3-4.7 1.3-6.8 0z" style="fill: rgb(94, 111, 163);"></path></g></g><g class="ldl-layer"><g class="ldl-ani" style="transform: scale(0.91); transform-origin: 50px 50px; animation: 1.11111s linear -0.925926s infinite normal forwards running breath-ea2304ad-4b38-460d-a69f-51e107cdcd3e;"><path fill="#f7b26a" d="M83.2 23.3H16.8c-1 0-1.8.8-1.8 1.8v3.5c0 3.4 1.8 6.6 4.7 8.5l26.9 16.7c2.1 1.3 4.7 1.3 6.8 0l26.9-16.7c2.9-1.8 4.7-5 4.7-8.5v-3.5c0-1-.8-1.8-1.8-1.8z" style="fill: rgb(59, 67, 104);"></path></g></g><g class="ldl-layer"><g class="ldl-ani" style="transform: scale(0.91); transform-origin: 50px 50px; animation: 1.11111s linear -1.11111s infinite normal forwards running breath-ea2304ad-4b38-460d-a69f-51e107cdcd3e;"><path fill="#333" d="M85 18.3H15c-2.8 0-5 2.2-5 5v53c0 2.9 2.4 5.3 5.3 5.3h69.4c2.9 0 5.3-2.4 5.3-5.3v-53c0-2.7-2.2-5-5-5zm0 56.6c0 1-.8 1.8-1.8 1.8H16.8c-1 0-1.8-.8-1.8-1.8V40.1l31.6 19.7c2.1 1.3 4.7 1.3 6.8 0L85 40.1v34.8zm0-46.3c0 3.4-1.8 6.6-4.7 8.5L53.4 53.8c-2.1 1.3-4.7 1.3-6.8 0L19.7 37.1c-2.9-1.8-4.7-5-4.7-8.5v-3.5c0-1 .8-1.8 1.8-1.8h66.4c1 0 1.8.8 1.8 1.8v3.5z" style="fill: rgb(25, 29, 58);"></path></g></g><metadata ><d:name>mail</d:name><d:tags>email,envelope,packet,message,notification,information,letter,mail,web application</d:tags><d:license>by</d:license><d:slug>kcjcu0</d:slug></metadata></g></g> <style id="breath-ea2304ad-4b38-460d-a69f-51e107cdcd3e" data-anikit="">@keyframes breath-ea2304ad-4b38-460d-a69f-51e107cdcd3e  { 0% { animation-timing-function: cubic-bezier(0.9647,0.2413,-0.0705,0.7911); transform: scale(0.9099999999999999); } 51% { animation-timing-function: cubic-bezier(0.9226,0.2631,-0.0308,0.7628); transform: scale(1.02994); } 100% { transform: scale(0.9099999999999999); } }</style>'}} >
                
            </svg>
        </div>;
}

export default Spinner;