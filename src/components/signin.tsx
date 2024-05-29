import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "./ui/use-toast";
import { LoadingSpinner } from "./loading-spinner";

export const SignIn = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      if (
        email === "ezekielchepkwony@centralbank.go.ke" &&
        password === "lehmans2024"
      ) {
        setEmail("");
        setPassword("");
        setIsLoggedIn(true);
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please confirm your credentials and try again.",
          variant: "destructive",
          duration: 3000,
        });
      }
      setIsLoading(false);
    }, 3000);
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Sign in
          </h1>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50"></h1>
          <div className="flex justify-center my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="231"
              height="30"
              viewBox="0 0 231 30"
              preserveAspectRatio="xMinYMid"
              fill="#c74634"
            >
              <path
                d="M99.61,19.52h15.24l-8.05-13L92,30H85.27l18-28.17a4.29,4.29,0,0,1,7-.05L128.32,30h-6.73l-3.17-5.25H103l-3.36-5.23m69.93,5.23V0.28h-5.72V27.16a2.76,2.76,0,0,0,.85,2,2.89,2.89,0,0,0,2.08.87h26l3.39-5.25H169.54M75,20.38A10,10,0,0,0,75,.28H50V30h5.71V5.54H74.65a4.81,4.81,0,0,1,0,9.62H58.54L75.6,30h8.29L72.43,20.38H75M14.88,30H32.15a14.86,14.86,0,0,0,0-29.71H14.88a14.86,14.86,0,1,0,0,29.71m16.88-5.23H15.26a9.62,9.62,0,0,1,0-19.23h16.5a9.62,9.62,0,1,1,0,19.23M140.25,30h17.63l3.34-5.23H140.64a9.62,9.62,0,1,1,0-19.23h16.75l3.38-5.25H140.25a14.86,14.86,0,1,0,0,29.71m69.87-5.23a9.62,9.62,0,0,1-9.26-7h24.42l3.36-5.24H200.86a9.61,9.61,0,0,1,9.26-7h16.76l3.35-5.25h-20.5a14.86,14.86,0,0,0,0,29.71h17.63l3.35-5.23h-20.6"
                transform="translate(-0.02 0)"
              ></path>
            </svg>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400"></p>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              required
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              required
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button onClick={handleLogin} className="w-full" type="button">
            {isLoading ? <LoadingSpinner /> : <>Sign In</>}
          </Button>
        </form>
      </div>
    </div>
  );
};
