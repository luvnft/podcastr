import { useState, useEffect } from "react";
import supabase  from "./supabaseClient";
import Login from "./pages/Login";
import Discover from "./pages/Discover";

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
      {!session ? (
        <Login supabaseClient={supabase} />
      ) : (
        <Discover key={session.user.id} session={session} />
      )}
    </div>
  );
}

export default App;
