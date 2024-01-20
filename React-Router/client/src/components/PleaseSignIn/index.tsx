import { useUser } from "../UserInfo";
import { useNavigate } from "react-router-dom";

export default function ({ children }: { children: React.ReactNode }) {
  const { data } = useUser();
  const navigate = useNavigate();
  console.log("user from signIn button", data?.user);
  if (!data?.user)
    return (
      <button type="button" onClick={() => navigate("/auth")}>
        SignIn
      </button>
    );
  return children;
}
