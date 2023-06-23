import "@styles/globals.css"

export const metadata = {
    title: "TaskPro",
    description: "Create your Utimate Task Companion."
}

const Root = ({children}) => {
    return (
        <html lang="en">
            <body>
                <div className="root-layout"></div>
                <div className="app">
                    {children}
                </div>
            </body>
        </html>
    )
}

export default Root;