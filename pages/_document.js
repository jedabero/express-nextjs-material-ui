import React from "react";
import PropTypes from "prop-types";
import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";
import getPageContext from "../utils/getPageContext";

export default class CustomDocument extends Document {

  static getInitialProps(context) {
    let pageContext;
    const page = context.renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext;
        return <Component {...props} />;
      };

      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired,
      };

      return WrappedComponent;
    });

    return {
      ...page,
      pageContext,
      styles: (
        <>
          <style
            id="jss-server-side"
            dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
          />
          {flush() || null}
        </>
      ),
    };
  }

  render() {
    const { pageContext } = this.props;

    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
          <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}