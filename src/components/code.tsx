"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Copy, Loader2, LogOut } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "./loading-spinner";

export const Code = ({
  setIsLoggedIn,
}: {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isLogging, setIsLogging] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [code, setCode] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const startLogging = () => {
    if (code.length < 6) return;

    setLogs([]);
    setCurrentIndex(0);
    setIsLogging(true);
  };

  useEffect(() => {
    const logMessages = [
      "Received connection to oracle servers",
      "Received email and password credentials",
      "Authenticating email and password",
      "Connection to server successfully established",
      "Receiving code details from oracle servers",
      "Successfully retreived code credentials",
    ];
    if (isLogging) {
      const logInterval = setInterval(() => {
        const now = new Date();
        const timeString =
          now.toLocaleTimeString("en-US", { hour12: false }) +
          `.${now.getMilliseconds()}`;
        const logMessage = `${timeString}: ${logMessages[currentIndex]}`;

        if (logMessages.length - 1 === currentIndex) {
          setLogs((prevLogs) => [
            ...prevLogs,
            `${timeString}: Code generation complete. Getting details...`,
          ]);
          setTimeout(() => {
            setIsLogging(false);
            setIsDialogOpen(true);
          }, 5000);
        } else {
          setLogs((prevLogs) => [...prevLogs, logMessage]);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % logMessages.length);
        }
      }, 2500);

      return () => {
        clearInterval(logInterval);
      };
    }
  }, [isLogging, currentIndex, logs.length]);

  return (
    <div className="flex min-h-screen">
      <div className="mx-auto w-full max-w-2xl space-y-8 rounded-lg p-8">
        <div className="flex justify-between">
          <div className="">
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
            <p className="mt-2 text-sm">
              Provide your safe code in order to get more info.
            </p>
          </div>
          <div>
            <Button
              className="text-xs p-3"
              variant="outline"
              onClick={() => {
                setIsLoggingOut(true);
                setTimeout(() => {
                  setIsLoggedIn(false);
                  setIsLoggingOut(false);
                }, 2000);
              }}
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing out
                </>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Input
              className="flex-1"
              placeholder="Enter code"
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value.toUpperCase())}
            />
            <Button
              onClick={startLogging}
              disabled={isLogging || code.length < 6}
            >
              {isLogging ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Requesting
                </>
              ) : (
                "Request"
              )}
            </Button>
          </div>
          <ResultsDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            setLogs={setLogs}
            setCode={setCode}
          />
          <div className=" text-green-500 flex flex-col gap-2 text-sm">
            {logs.map((log, index) => (
              <div key={index}>
                <p>{log}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultsDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  setLogs,
  setCode,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  setLogs: Dispatch<SetStateAction<string[]>>;
  setCode: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Dialog open={isDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request from Central Bank of Kenya (CBK)</DialogTitle>
          <DialogDescription>Find your details below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4">
            <div>
              <small className="text-sm font-semibold leading-none">
                Staff Name
              </small>
            </div>
            <div>
              <small className="text-sm font-normal leading-none">
                Ezekiel Chepkwony
              </small>
            </div>
          </div>
          <div className="items-center gap-4">
            <div>
              <small className="text-sm font-semibold leading-none">
                Email Address
              </small>
            </div>
            <div>
              <small className="text-sm font-normal leading-none">
                ezekielchepkwony@centralbank.go.ke
              </small>
            </div>
          </div>
          <div className="items-center gap-4">
            <div>
              <small className="text-sm font-semibold leading-none">
                Security Level
              </small>
            </div>
            <div>
              <small className="text-sm font-normal leading-none">3</small>
            </div>
          </div>
          <div className="items-center gap-4">
            <div>
              <small className="text-sm font-semibold leading-none">
                Amount Required
              </small>
            </div>
            <div>
              <small className="text-sm font-normal leading-none">
                KES 8,000,000
              </small>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <small className="text-sm font-semibold leading-none">
                Unlock code
              </small>
            </div>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  Unlock Code
                </Label>
                <Input id="link" defaultValue="**************" />
              </div>
              <Button type="button" size="sm" className="px-3">
                <span className="sr-only">Copy</span>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <RequestCodeDialog />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              setIsDialogOpen(false);
              setLogs([]);
              setCode("");
            }}
            type="button"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const RequestCodeDialog = () => {
  const [value, setValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-2" variant="outline">
          Access Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Access</DialogTitle>
          <DialogDescription>
            Provide the one-time code sent to your official CBK email.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => {
              if (value.length === 6) {
                setIsVerifying(true);
                if (value === "409755") {
                  setTimeout(() => {
                    toast({
                      title: "Access Code Success",
                      description:
                        "Your request has been received. You'll receve communication from us soon.",
                      duration: 10000,
                    });
                    setIsVerifying(false);
                  }, 7000);
                } else {
                  setTimeout(() => {
                    toast({
                      title: "Access Code Failure",
                      description: "Please confirm your code and resubmit.",
                      variant: "destructive",
                    });
                    setIsVerifying(false);
                  }, 7000);
                }
              }
              setValue(value);
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        {isVerifying ? (
          <div className="flex flex-col justify-center items-center">
            <div className="">
              <LoadingSpinner />
            </div>
            <div className="text-xs">Verifying code...</div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};
