/* eslint import/no-extraneous-dependencies:"off" */
/* eslint implicit-arrow-linebreak:"off" */
/* eslint function-paren-newline:"off" */
import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/styles';
import Helmet from 'react-helmet';

export default class StyledDocument extends Document {
  static async getInitialProps(ctx) {
    // Resolution order
    //
    // On the server:
    // 1. page.getInitialProps
    // 2. document.getInitialProps
    // 3. page.render
    // 4. document.render
    //
    // On the server with error:
    // 2. document.getInitialProps
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. page.getInitialProps
    // 3. page.render

    const sheet = new ServerStyleSheet();
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />),
      });

    // Get the context to collected side effects.
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      helmet: Helmet.renderStatic(),
      styleTags: sheet.getStyleElement(),
      styles: (
        <React.Fragment>
          {initialProps.styles}
          {sheets.getStyleElement()}
        </React.Fragment>
      ),
    };
  }

  // should render on <html>
  helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <body>
  helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  // should render on <head>
  helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent());
  }

  render() {
    return (
      <html lang="en" {...this.helmetHtmlAttrComponents()}>
        <Head>
          {this.props.styleTags}
          {this.helmetHeadComponents()}
        </Head>
        <body style={{ padding: 0, margin: 0 }} {...this.helmetBodyAttrComponents()}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
