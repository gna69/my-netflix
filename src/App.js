import './App.css';
import Row from "./row";
import requests from "./requests";

function App() {
    return (
        <div className="App">
            <h1>Hey Clever Programmer! Let's build Netflix Clone Front-end today</h1>
            <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} />
            <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
        </div>
    );
}

export default App;
