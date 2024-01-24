import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

// import { useNavigate } from "react-router-dom";
import { useNavigate } from "@tanstack/react-router";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={async () => {
          signOut();
          navigate({ to: "/", search: { page: 1 } });
        }}
      >
        Sign Out
      </button>
    </>
  );
}
