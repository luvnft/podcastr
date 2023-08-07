import { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import { Login, Discover, PodcastInfo, Episodes, Favourites } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              session ? (
                <Discover key={session.user.id} session={session} />
              ) : (
                <Login supabaseClient={supabase} />
              )
            }
          />
          <Route
            path="/details/:id"
            element={<PodcastInfo session={session} />}
          />
          <Route
            path="/details/:id/season/:seasonNumber"
            element={<Episodes session={session} />}
          />
          <Route
            path="/favorites"
            element={<Favourites session={session} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
