import './App.css';
import Main from "./page/main";
import Header from "./component/header";
import Footer from "./component/footer";
import Routers from "./routers";

function App() {
    return (
        <>
            <div className="App">
                <Header/>
                <div className={'router'}>
                    <Routers/>
                </div>
                <Footer/>
            </div>

        </>
    );
}

export default App;
