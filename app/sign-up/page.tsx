"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
    return(
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Sign UP</CardTitle>

                    <CardDescription> Create an account to start traking your JOb applications
                    </CardDescription>
                </CardHeader>
                <form action="">
                   <CardContent>
                    {/* Nme */}
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id= "name" type="text" placeholder="Jhon Doe" required/>
                    </div>

                    </CardContent> 
                </form>
                
            </Card>

        </div>
    );
}