import { Auth } from "@supabase/auth-ui-react";
import supabase from "../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "./login.css";

function Login() {
  return (
    <div className="flex flex-center items-center">
      <div
        style={{
          padding: "2rem",
          marginTop: "20vh",
        }}
      >
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={""}
        />
      </div>
    </div>
  );
}

export default Login;
