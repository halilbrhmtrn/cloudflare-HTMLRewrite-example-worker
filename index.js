addEventListener('fetch', event => {
  console.log(`Received new request: ${event.request.url}`);
  event.respondWith(handleRequest(event.request));
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
let url = 'https://www.trendyol.com/';

async function handleRequest(request) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log('response is ok')
      return new Response(await new HTMLRewriter()
        .on('img[alt="Trendyol" i]', new BannerChanger('https://i.picsum.photos/id/56/195/51.jpg?hmac=4cqKEvy92BWhKBRzZRSa5xaCm6PeLkgw-johGEph1q8'))
        .on('div#navigation-wrapper', new NavBarColorizer('blue'))
        .transform(response)
        .text(), {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      })
    } else {

      console.log('response is not ok');
      return new Response('<h1> Something Went Wrong </h1>', {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      })

    }
  } catch (e) {
    console.log(e);
  }
}


class BannerChanger {
  constructor(imgUrl) {
    this.imgUrl = imgUrl;
  }
  async element(e) {
    console.log('banner change');
    console.log(e.getAttribute('alt'));
    e.setAttribute('src', this.imgUrl);
  }
}

class NavBarColorizer {
  constructor(color) {
    this.color = color;
  }
  element(e) {
    console.log('navbar change');
    console.log(e.getAttribute('data-drroot'));
    e.setAttribute('style', `background:${this.color}`);
  }
}

