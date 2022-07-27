import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./components/HomePage";
import { RQSuperHeroespage } from "./components/RQSuperHeroespage";
import { SuperHeroespage } from "./components/SuperHeroespage";
import RQSuperHero from "./components/RQSuperHero";
import { DependentQueries } from "./components/DependentQueries";
import { PaginatedQueries } from "./components/PaginatedQueries";
import { InfiniteQueries } from "./components/InfiniteQueries";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="dependent-queries"
            element={<DependentQueries email="fahadb@example.com" />}
          />
          <Route path="rq-paginated" element={<PaginatedQueries />} />
          <Route path="rq-infinite" element={<InfiniteQueries />} />
          <Route path="super-heroes" element={<SuperHeroespage />} />
          <Route path="rq-super-heroes" element={<RQSuperHeroespage />} />
          <Route path="rq-super-heroes/:heroId" element={<RQSuperHero />} />

          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
