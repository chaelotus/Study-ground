import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

// NextPage: Next에서 기본으로 제공하는 페이지 타입

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};
// NextPageWithLayout 타입은 기존 nextpage 타입에다가 (page:ReactNode)=>ReactNode 이런 타입이 추가된 타입으로 정의된것임.

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: NextPageWithLayout }) {
  // 위에처럼 되면 App컴포넌트가 전달받는 props의 타입을  확장한것임.
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
