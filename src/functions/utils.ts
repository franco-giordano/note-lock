import b64 from '../libs/b64';
import linklock from '../libs/link-lock-api';
import urlpages from "../libs/url-pages-api";
import {DEFAULT_CSS, BASE_URL} from './constants';


async function lockLink(url : string, passwd : string, hint : string) {
    if (!window.crypto.subtle) {
        return BASE_URL + "/#CRYPTO_NOT_FOUND";
    }

    const api = linklock.latestApi;

    const salt = await api.randomSalt();
    const iv = await api.randomIv();
    const encrypted = await api.encrypt(url, passwd, salt, iv);
    const output = {
        v: linklock.LATEST_API_VERSION,
        e: b64.binaryToBase64(new Uint8Array(encrypted))
    }

    // Add the hint if there is one
    if (hint != "") {
        output["h"] = hint;
    }

    output["s"] = b64.binaryToBase64(salt);
    output["i"] = b64.binaryToBase64(iv);

    // Return the base64-encoded output
    let fragment: string = b64.encode(JSON.stringify(output));

    return BASE_URL + "/#" + fragment;
}

function generateHtml(note : string, bgColor : string) {
    let pageData = `
        <!DOCTYPE html>
        <head>
        <style>
        ${DEFAULT_CSS}
        .back {
            background-color: ${bgColor}
        }
        </style>
        </head>
        <body class="back">
        <div class="box">
        ${note}
        </div>
        </body>
        `;

    return pageData;
}

function generateUrl(html : string): string {
    return urlpages.latestApi.getViewLink(html);
}

export async function lockNote(note : string, passwd : string, hint : string, bgColor : string): Promise < string > {
    let html: string = generateHtml(note, bgColor);

    let plainUrl: string = generateUrl(html);

    let lockedLink: string = await lockLink(plainUrl, passwd, hint);

    return lockedLink;
}
