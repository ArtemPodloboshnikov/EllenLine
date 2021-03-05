import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  // [{id_relax: 2, name: 'New relax', address: 'ул. Новая, д.1', price: 1200, description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula class ultricies mollis dictumst, aenean non a in donec nulla. Phasellus ante pellentesque erat cum risus consequat imperdiet aliquam, integer placerat et turpis mi eros nec lobortis taciti, vehicula nisl litora tellus ligula porttitor metus. Vivamus integer non suscipit taciti mus etiam at primis tempor sagittis sit, euismod libero facilisi aptent elementum felis blandit cursus gravida sociis erat ante, eleifend lectus nullam dapibus netus feugiat curae curabitur est ad. Massa curae fringilla porttitor quam sollicitudin iaculis aptent leo ligula euismod dictumst, orci penatibus mauris eros etiam praesent erat volutpat posuere hac. Metus fringilla nec ullamcorper odio aliquam lacinia conubia mauris tempor, etiam ultricies proin quisque lectus sociis id tristique, integer phasellus taciti pretium adipiscing tortor sagittis ligula. Mollis pretium lorem primis senectus habitasse lectus scelerisque donec, ultricies tortor suspendisse adipiscing fusce morbi volutpat pellentesque, consectetur mi risus molestie curae malesuada cum. Dignissim lacus convallis massa mauris enim ad mattis magnis senectus montes, mollis taciti phasellus accumsan bibendum semper blandit suspendisse faucibus nibh est, metus lobortis morbi cras magna vivamus per risus fermentum. Dapibus imperdiet praesent magnis ridiculus congue gravida curabitur dictum sagittis, enim et magna sit inceptos sodales parturient pharetra mollis, aenean vel nostra tellus commodo pretium sapien sociosqu.',
  // stars: 5,
  // coordinates: [52.323232, 32.32323], photos: ['images/Sanatorium/NewRelax.jpg'], type: 'sanatorium', id_city: 1, services: {inStock: {text: 'Бассейн', icon: 'images/Icons/Treatment/swimmingPool.svg'}, GeneralServices: {text: 'Прачечная', icon: 'путь до иконки'}, RoomService: {text: 'Сейф', icon: 'путь до иконки'}}}]
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/images/logo.svg" />
          <meta name="theme-color" content="#000000" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
          <meta
            name="description"
            content="Web site created using create-react-app"
          />
          <link rel="apple-touch-icon" href="images/logo.svg" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
          {/*  */}
          <script src="https://kit.fontawesome.com/5116ed660a.js" crossorigin="anonymous"></script>
          {/*  */}
          <link rel="stylesheet" href="https://cdn.nemo.travel/search-form/v2.5.22/flights.search.widget.min.css" />
          <script src="https://cdn.nemo.travel/search-form/v2.5.22/flights.search.widget.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument