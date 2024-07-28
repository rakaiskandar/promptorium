import '@/styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata = {
    title: "Promptorium",
    description: 'Discover & Share AI Prompts'
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
        <body>
            <Provider>
                <Suspense fallback={<Loading />}>
                    <div className="main">
                        <div className="gradient" />
                    </div>

                    <main className="app">
                        <Nav />
                        { children }
                    </main>
                </Suspense>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout