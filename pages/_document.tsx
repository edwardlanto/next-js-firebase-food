import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@1,800&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        rel="stylesheet"
                        href="https://unpkg.com/flickity@2/dist/flickity.min.css"
                    ></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
                </body>
            </Html>
        )
    }
}

export default MyDocument
