import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className={cn("py-32")}>
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
          <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl xl:text-7xl">
            Send Money Back <br /> Home
          </h1>
          <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
            Transfer funds to loved ones quickly and securely. Join millions who
            trust our platform for seamless global transactions.
          </p>

          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            <Button className="w-full sm:w-auto">Get Started Now</Button>
          </div>
        </div>
        <div className="flex">
          <Card className="w-full max-h-[600px] object-cover lg:max-h-[800px]">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                Amount to be Sent
              </CardTitle>
              <p className="text-3xl font-semibold mt-2">200 USD</p>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {["$150", "$200", "$250", "$300"].map((amt) => (
                  <div
                    key={amt}
                    className="rounded-md bg-muted text-center py-1 text-sm cursor-pointer hover:bg-muted/80 transition"
                  >
                    {amt}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm text-muted-foreground">
                  Recipient Getting
                </p>
                <p className="text-2xl font-semibold mt-1">31,200 ETB</p>
              </div>

              <Button className="w-full mt-6">Send Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
