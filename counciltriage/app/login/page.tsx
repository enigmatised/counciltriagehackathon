import LoginForm from "./loginForm";
import Navbar from "../components/navbar";

export default function LoginPage() {
    return (
        <main>
            <Navbar />
            <div>
                <LoginForm />
            </div>
        </main>
    );
}