import { Auth } from "@supabase/auth-ui-react";
import supabase from "../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import podLogo from "../assets/pod-logo.png"
import { useState } from "react";

function Login() {

  const [showDummyCredentials, setShowDummyCredentials] = useState(false);

  const handleShowCredentialsClick = () => {
    setShowDummyCredentials(!showDummyCredentials);
  };

  return (
    <div className="flex flex-center items-center lg:my-8">
      <div
        style={{
          marginTop: "20vh",
          margin: "auto"
        }}
        className="shadow-md px-6 mt-4"
      >
        <img src={podLogo} className="md:h-[34vh] md:w-[20vw] "/>
        <button 
        className="flex justify-center bg-sky-400 mx-auto p-2"
        onClick={handleShowCredentialsClick}>
        {showDummyCredentials ? "Hide Dummy Credentials" : "Click For Dummy Credentials"}
      </button>
      {showDummyCredentials && (
        <div className="m-2">
          <p>Email: podcastruser@gmail.com</p>
          <p>Password: podcast</p>
        </div>
      )}
        
        <Auth
          supabaseClient={supabase}
          view="sign_up"
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#48B9A5",
                  brandButtonText: "black",
                  defaultButtonText: "white",
                  defaultButtonBackground: "white",
                  defaultButtonBackgroundHover: "#164e63",
                  defaultButtonBorder: "lightgray",
                },
              },
            },
          }}
          socialLayout="row"
          theme="auto"
          providers={""}
        />
      </div>
    </div>
  );
}

export default Login;
