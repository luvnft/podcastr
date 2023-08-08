import { Auth } from "@supabase/auth-ui-react";
import supabase from "../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import podLogo from "../assets/pod-logo.png"

function Login() {
  return (
    <div className="flex flex-center items-center">
      <div
        style={{
          marginTop: "20vh",
          margin: "auto"
        }}
      >
        <img src={podLogo} className="md:h-[32vh] md:w-[20vw] m-auto"/>
        
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
