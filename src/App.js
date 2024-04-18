import './App.css';
import Main from "./page/main";
import Header from "./component/header";
import Footer from "./component/footer";

function App() {
    return (
        <>
            <div className="App">
                <Header/>
                <Main/>
                <Footer/>
            </div>

        </>
    );
}

export default App;
