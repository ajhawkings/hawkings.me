// @refresh reload
import { createEffect, lazy, Suspense } from "solid-js";
import { Body, ErrorBoundary, FileRoutes, Head, Html, Meta, Route, Routes, Scripts, Title } from "solid-start";
import { routes } from "./routes";
import NavBar from "./components/NavBar";
import "./root.css";

export default function Root() {
  createEffect(() => {
    const route = routes.find((r) => r.path === window.location.pathname)
    document.title = route?.title
      ? `hawkings.me | ${route.title}`
      : 'hawkings.me'
  })

  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <NavBar />
            <Routes>
              <FileRoutes />
              {routes.map((route) => (
                <Route
                  path={route.path}
                  component={lazy(
                    () => import(`./${route.folder}/${route.component}.tsx`)
                  )}
                />
              ))}
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
