import { useState, useEffect } from "react";
import supabase from "./supabaseClient";
import { Login, Discover, PodcastInfo, Episodes } from "./pages";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
    <div className="mx-0">
      <Router>
        <Routes>
          <Route path="/" element={session ? <Discover key={session.user.id} session={session} /> : <Login supabaseClient={supabase} />} />
          <Route path="/details/:id" element={<PodcastInfo />} />
          <Route path="/details/:id/season/:seasonNumber" element={<Episodes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
