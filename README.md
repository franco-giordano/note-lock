
<p align="center">
    <img alt="notelock" height="128" src="./assets/note-lock-logo.png">
    <h1 align="center">Note Lock</h1>
</p>

<p align="center">
  <a aria-label="Website" href="https://f.gior.ar/note-lock" target="_blank">
    <img alt="Website" src="https://img.shields.io/website?down_color=red&down_message=offline&style=flat-square&up_message=up&url=https%3A%2F%2Ffranco.giordano.ar%2Fnote-lock" />
  </a>
  <a aria-label="License" href="https://github.com/franco-giordano/note-lock/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/franco-giordano/note-lock?style=flat-square" target="_blank" />
  </a>
</p>

<p align="center">
Send encrypted notes without any server! Your encrypted message lives only in the URL, and is never sent anywhere.
</p>
<p align="center">
Encryption and render methods designed by <a href="https://github.com/jstrieb/link-lock">jstrieb/link-lock</a> and <a href="https://github.com/jstrieb/urlpages">jstrieb/urlpages</a>. Built with Svelte.
</p>

## Showcase
First, enter your message, an optional hint and password:
![First step](./assets/step1.png)

Click in Lock! and copy your encrypted message (URL):
![Second step](./assets/step2.png)

Send the URL. The recipient will open it and find the password prompt: 
![Third step](./assets/step3.png)

After using the right password, you will find the message!
![Fourth step](./assets/step4.png)

Remember: your message is never sent anywhere, encryption+decryption happens all client-side. There is no backend, this project is just a static HTML!

## Next steps

Some extra desired features/fixes are:
- Offer a shortened URL for easy sharing (i.e. TinyUrl)
- Generate a QR code for the (shortened) URL
- Add Information button explaining project goals
- Better background color options
- Create a logo for the project

## Contribute

1. Clone repo
2. Install npm packages: `npm install`
3. Start the server (with hot reloading): `npm run dev`
4. Navigate to [localhost:5000](http://localhost:5000)

<!-- 
## Next steps

You can see our to-do list in [this project](https://github.com/franco-giordano/note-lock). Feel free to work on any of these issues! -->

## License

MIT
