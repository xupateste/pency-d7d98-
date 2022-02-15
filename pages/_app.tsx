import React from "react";
import App from "next/app";
import {ThemeProvider, CSSReset, Flex} from "@chakra-ui/core";

import ErrorScreen from "./_error";

import reporter from "~/reporting";

process.on("unhandledRejection", (error: Error) => {
  reporter.exception(error, {origin: "server | unhandledRejection"});
});

process.on("uncaughtException", (error: Error) => {
  reporter.exception(error, {origin: "server | uncaughtException"});
});

export default class Pency extends App {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    reporter.exception(error, {extras: errorInfo, origin: "client"});

    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const {Component, pageProps} = this.props;
    const {statusCode: error} = pageProps;

    return (
      <ThemeProvider>
        <CSSReset />
        {error ? (
          <ErrorScreen statusCode={error} />
        ) : (
          <Flex direction="column" height="100%">
            <Component {...pageProps} />
          </Flex>
        )}
      </ThemeProvider>
    );
  }
}
