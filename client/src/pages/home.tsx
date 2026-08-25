import { Phone, MapPin, Zap, DollarSign, Clock, Navigation, CheckCircle, AlertTriangle, Shield } from "lucide-react";
import { Link } from "wouter";
import { LeadCaptureForm } from "@/components/reservation-form";
import rvParkPhoto from "@assets/rv-park-photo.jpg";
import rvParkPhoto2 from "@assets/rv-park-photo-2.jpg";
import evadaleLogo from "@assets/evadale_badge_transparent_1762195601095.png";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Hormozi Style */}
      <div className="min-h-screen relative" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.65)), url(${rvParkPhoto2})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {/* Header */}
        <header className="relative z-20 pt-6 pb-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={evadaleLogo} alt="Evadale RV Park Logo" className="w-14 h-14 object-contain" />
                <div>
                  <h1 className="text-xl font-bold text-white font-serif">Evadale RV Park</h1>
                  <p className="text-white/70 text-xs">Evadale, TX</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-white/90">
                <Link href="/blog" className="hover:text-white transition-colors text-sm">Blog</Link>
                <a href="tel:4092768830" className="flex items-center space-x-2 hover:text-white transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  <span>(409) 276-8830</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center">
          <div className="max-w-3xl mx-auto">
            {/* Pre-headline */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm mb-6 border border-white/20">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span>Only <strong className="text-yellow-400">2 spots left</strong> at this rate</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-6xl font-black text-white font-serif mb-6 leading-tight">Stop Wasting Money on Hotels...</h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
              Park your RV for <span className="font-bold text-yellow-400">$425/month all-inclusive</span> — 30 minutes from Beaumont, 45 minutes from Port Arthur.
            </p>

            <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
              Full hookups. No hidden fees. No long-term contracts. Move in this week.
            </p>

            {/* CTA Button */}
            <div className="mb-6">
              <LeadCaptureForm />
            </div>

            {/* Sub-CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80 text-sm">
              <a href="tel:4092768830" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                Or call Brian: (409) 276-8830
              </a>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-white/60 text-xs">
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> No commitment needed</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> We'll confirm availability</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Response within 24 hours</span>
            </div>
          </div>
        </div>
      </div>
      {/* Value Stack Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 font-serif mb-4">
                Here's What You Get for $425/month
              </h2>
              <p className="text-lg text-gray-600">Everything included. Zero surprises on your bill.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {[
                { icon: Zap, title: "30A or 50A Electric", desc: "Choose the power you need. Included in your rate.", value: "$150+ value" },
                { icon: DollarSign, title: "Water & Sewer Hookups", desc: "Full hookups at every site. No extra charges.", value: "$75+ value" },
                { icon: Navigation, title: "Prime Location", desc: "30 min to Beaumont, 45 min to Port Arthur refineries.", value: "Save on gas" },
                { icon: Shield, title: "Quiet & Secure", desc: "Rest easy after a 12-hour shift. Peaceful environment.", value: "Priceless" },
                { icon: Clock, title: "Flexible Terms", desc: "Month-to-month. No long-term contracts required.", value: "No lock-in" },
                { icon: CheckCircle, title: "Trash Service", desc: "Weekly pickup included. One less thing to worry about.", value: "Included" },
              ].map(({ icon: Icon, title, desc, value }) => (
                <div key={title} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-gray-900">{title}</h3>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap">{value}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-6 text-center">
              <p className="text-gray-600 mb-1">Other parks in the area charge <span className="line-through">$570–$699/month</span></p>
              <p className="text-3xl font-black text-primary">You pay just $425/month. All bills paid.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Real Photos Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 font-serif mb-4">
                Your Home Base While You Work
              </h2>
              <p className="text-lg text-gray-600">Spacious sites with full hookups, surrounded by trees.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <img src={rvParkPhoto} alt="Spacious RV spot at Evadale RV Park" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
              <img src={rvParkPhoto2} alt="Tree-lined roads at Evadale RV Park" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>
      {/* Who This Is For */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 font-serif mb-4">Affordable Living</h2>
            </div>

            <div className="space-y-4">
              {[
                "You're working in the area, at ExxonMobil, Motiva, Valero, or LNG and need affordable housing",
                "You're tired of paying $100+/night for a hotel during turnaround season",
                "You want full hookups without the $570–$699/month other parks charge",
                "You need a quiet place to sleep after a 12-hour shift",
                "You want month-to-month flexibility — no long-term contracts",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Urgency Section */}
      <section className="py-12 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <AlertTriangle className="w-10 h-10 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-black font-serif mb-4">
              Don't Wait — Spots Fill Up Fast
            </h2>
            <p className="text-xl mb-2 text-white/90">
              We only have <strong className="text-yellow-300">2 spots</strong> available at the $425/month rate.
            </p>
            <p className="text-white/80 mb-8">
              Turnaround season is coming. Contractors who reserve early save thousands.
            </p>
            <LeadCaptureForm />
            <p className="text-white/60 text-sm mt-4">Takes 30 seconds. No commitment required.</p>
          </div>
        </div>
      </section>
      {/* Location Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 font-serif mb-4">Close to Where You Work</h2>
              <p className="text-lg text-gray-600">147 CR 847, Evadale, TX 77615</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {[
                  { time: "30 min", dest: "Beaumont refineries" },
                  { time: "45 min", dest: "Port Arthur refineries" },
                  { time: "Easy access", dest: "Highway 105 & I-10" },
                ].map(({ time, dest }) => (
                  <div key={dest} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-bold text-primary">{time}</span>
                      <span className="text-gray-600 ml-2">to {dest}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg h-72">
                <iframe
                  src="https://maps.google.com/maps?q=147+CR+847+Evadale+TX+77615&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Evadale RV Park Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black font-serif mb-4">
              Save Thousands on Your Next Contract
            </h2>
            <p className="text-xl text-white/80 mb-2">$425/month. All-inclusive. Full hookups.</p>
            <p className="text-white/60 mb-8">No hidden fees. No long-term contracts. Move in this week.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LeadCaptureForm />
              <a
                href="tel:4092768830"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Brian
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={evadaleLogo} alt="Evadale RV Park Logo" className="w-12 h-12 object-contain" />
                <h3 className="text-xl font-bold font-serif">Evadale RV Park</h3>
              </div>
              <p className="text-sm text-white/50">Affordable RV living for refinery contractors near Beaumont and Port Arthur, TX.</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-white/70">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>147 CR 847, Evadale, TX 77615</span>
                </div>
                <a href="tel:4092768830" className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>(409) 276-8830</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Links</h4>
              <div className="space-y-2 text-white/70">
                <Link href="/blog" className="block hover:text-white transition-colors">Blog</Link>
                <Link href="/terms" className="block hover:text-white transition-colors" data-testid="link-terms">Terms & Conditions</Link>
                <a href="tel:4092768830" className="block hover:text-white transition-colors">Call for Rates</a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/40">
            <p>&copy; {new Date().getFullYear()} Evadale RV Park. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
