import "@styles/globals.css"
import Nav from "@components/Nav"
import Provider from "@components/Provider"

export const metadata = {
    title: "TaskPro",
    description: "Create your Utimate Task Companion."
}

const Root = ({children}) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="root-layout"></div>
                    <div className="app">
                        <Nav/>
                        {children}
                    </div>
                </Provider>
            </body>
        </html>
    )
}

export default Root;