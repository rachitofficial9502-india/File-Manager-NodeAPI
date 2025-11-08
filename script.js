const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    
    res.writeHead(200, {"content-type" : "text/plain"})
    const pathName = path.join(__dirname, "notes.txt")

    const myUrl = new URL(req.url, `http://${req.headers.host}`) 
    console.log(myUrl.pathname);
    console.log(myUrl.searchParams);

    if (myUrl.pathname === "/create") {

        const content = myUrl.searchParams.get("content") || "no content"

        if (!fs.existsSync(pathName)) {
            fs.writeFileSync(pathName, content + "\n")
            res.end("File created !")
            return
        } else {
            fs.appendFileSync(pathName, content + "\n")
            res.end("file updated !")
            return
        }
        
    } else if (myUrl.pathname === "/read") {

        if (!fs.existsSync(pathName)) {
            res.statusCode = 404
            res.end("File not found !")
            return
        }

        const data = fs.readFileSync(pathName, "utf-8")
        res.end(data)
        return

    } else if (myUrl.pathname === "/delete") {
        if (!fs.existsSync(pathName)) {
            res.statusCode = 404
            res.end("File not found !")
            return
        }
        fs.unlinkSync(pathName)
        res.end("File deleted successfully !")
        return
    }
    
    res.end("server working !!!")

}
)


server.listen(3000, () => console.log("Server Listening !!!"))
