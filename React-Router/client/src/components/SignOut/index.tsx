import { signOut } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={async () => {
          signOut();
          navigate("/");
        }}
      >
        Sign Out
      </button>
    </>
  );
}
