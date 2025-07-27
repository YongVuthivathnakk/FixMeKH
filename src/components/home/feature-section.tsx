import { CheckCircle, Shield, Star } from "lucide-react";
import React from "react";

function FeatureSection() {
  return (
    <>
      {/* Features Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Platform Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Verified Providers</h4>
            <p className="text-muted-foreground">
              All service providers are thoroughly vetted and verified for your
              safety and peace of mind
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Provider Ratings</h4>
            <p className="text-muted-foreground">
              Read reviews and ratings from other customers to choose the best
              service provider
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Real-time Updates</h4>
            <p className="text-muted-foreground">
              Track your service appointment with live updates and notifications
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h4 className="font-semibold mb-2">Browse Services</h4>
            <p className="text-muted-foreground">
              Browse through our service categories and find what you need
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h4 className="font-semibold mb-2">Schedule Appointment</h4>
            <p className="text-muted-foreground">
              Choose your preferred time and book with verified providers
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h4 className="font-semibold mb-2">Get Service Done</h4>
            <p className="text-muted-foreground">
              Enjoy professional service with real-time tracking and updates
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeatureSection;
