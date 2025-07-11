"use client"

import { UserButton } from "@/app/features/auth/component/user-button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

import { Phone, Users, Star, Clock, MapPin } from "lucide-react"
import { FaFacebook,  FaInstagram} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";



// TODO: Build the home Page UI here using Tailwind and typescript (.tsx)



export const HomeHeader = () => {
    return (
        <>
            <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className=" flex h-16 justify-between px-4 w-full">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-bold">FixMeKH</h1>
                        <p className="text-sm text-muted-foreground">Your trusted repair service</p>
                    </div>
                    <div className="flex items-center">
                        <UserButton />
                    </div>
                </div>
            </header>
        </>
    )
}

export const HomeMain = () => {

    return (
        <main className="container mx-auto px-4 py-8">

            {/* Welcome Section */}
            <section className="mb-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">
                        Welcome to FixMeKH
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Professional repair services for all your devices. Fast, reliable, and affordable solutions.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-center">Our Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-5 w-5 text-primary" />
                                <CardTitle>Phone Repair</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Screen replacement, battery replacement, water damage repair, and more.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5 text-primary" />
                                <CardTitle>Computer Repair</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Hardware upgrades, software issues, virus removal, and system optimization.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center space-x-2">
                                <Star className="h-5 w-5 text-primary" />
                                <CardTitle>Tablet Repair</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Screen repair, charging port replacement, and general maintenance.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 text-center">Why Choose Us</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-semibold mb-2">Fast Service</h4>
                        <p className="text-muted-foreground">Most repairs completed within 24 hours</p>
                    </div>
                    
                    <div className="text-center">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapPin className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-semibold mb-2">Convenient Location</h4>
                        <p className="text-muted-foreground">Located in the heart of the city</p>
                    </div>
                    
                    <div className="text-center">
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="h-8 w-8 text-primary" />
                        </div>
                        <h4 className="font-semibold mb-2">Expert Technicians</h4>
                        <p className="text-muted-foreground">Certified professionals with years of experience</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="text-center">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>Ready to get started?</CardTitle>
                        <CardDescription>
                            Contact us today for a free consultation and quote.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg">
                                Schedule Repair
                            </Button>
                            <Button variant="outline" size="lg">
                                Get Quote
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    )
}

export const HomeFooter = () => {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="font-semibold mb-4">FixMeKH</h4>
                        <p className="text-sm text-muted-foreground">
                            Your trusted partner for all device repairs and maintenance needs.
                        </p>
                    </div>
                    
                    <div>
                        <h5 className="font-semibold mb-4">Services</h5>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Phone Repair</li>
                            <li>Computer Repair</li>
                            <li>Tablet Repair</li>
                            <li>Data Recovery</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h5 className="font-semibold mb-4">Contact</h5>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Phone: (555) 123-4567</li>
                            <li>Email: info@fixmekh.com</li>
                            <li>Hours: Mon-Fri 9AM-6PM</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h5 className="font-semibold mb-4">Follow Us</h5>
                        <div className="flex space-x-4">
                            <Button variant="ghost" >
                                <FaFacebook />
                            </Button>
                            <Button variant="ghost">
                                <FaXTwitter />
                            </Button>
                            <Button variant="ghost">
                                <FaInstagram />
                            </Button>
                        </div>
                    </div>
                </div>
                
                <div className="border-t mt-6 pt-6 text-center w-full">
                    <p className="text-sm text-muted-foreground">
                        © 2024 FixMeKH. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}