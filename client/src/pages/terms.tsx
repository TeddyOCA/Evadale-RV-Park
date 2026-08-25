import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Shield, AlertTriangle, MessageSquare } from "lucide-react";
import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Reservation Form
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-foreground font-serif mb-2">
              Terms & Conditions
            </h1>
            <p className="text-muted-foreground text-lg">
              Evadale RV Park - Rental Agreement Terms, Park Rules & Policies
            </p>
          </div>

          <div className="space-y-6">
            {/* Rental Agreement Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>Rental Agreement Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Rental Period & Payment</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Rental is for a 30-day period with automatic renewal unless 30-day notice is given</li>
                    <li>Rent is due and payable in advance on the first day of each rental period</li>
                    <li>Late fees may apply for payments received after the due date</li>
                    <li>Security deposit required upon move-in</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Occupancy Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Maximum occupancy as specified in rental agreement</li>
                    <li>Guest registration required for visitors staying more than 3 consecutive days</li>
                    <li>All occupants must be listed on the rental agreement</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Utilities & Services</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Water and sewer services are included in rental fee</li>
                    <li>Electrical service (30amp or 50amp) included based on site availability</li>
                    <li>Tenant responsible for propane and any additional utility costs</li>
                    <li>Internet and cable TV services not provided</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Park Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Park Rules & Regulations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">General Conduct</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Quiet hours enforced from 10:00 PM to 7:00 AM daily</li>
                    <li>No disruptive behavior, excessive noise, or disturbances to other residents</li>
                    <li>Children must be supervised at all times</li>
                    <li>Speed limit 10 MPH throughout the park</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Pet Policy</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Pets must be registered with park management</li>
                    <li>All pets must be leashed when outside RV</li>
                    <li>Pet owners responsible for immediate cleanup of pet waste</li>
                    <li>Aggressive or disruptive pets may result in eviction</li>
                    <li>Maximum of 2 pets per RV site</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Vehicle & Parking</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>All vehicles must be registered and display current license plates</li>
                    <li>Parking limited to designated areas only</li>
                    <li>No vehicle repairs or maintenance in common areas</li>
                    <li>Inoperable vehicles must be removed within 7 days</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Property Maintenance</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>RV and site area must be kept clean and presentable</li>
                    <li>No permanent structures or additions to RV sites</li>
                    <li>Outdoor storage must be neat and organized</li>
                    <li>Decorative items and landscaping subject to management approval</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Cover Installation Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <span>Cover Installation Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Installation Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>All RV covers and awnings must be approved by park management before installation</li>
                    <li>Professional installation required for permanent or semi-permanent structures</li>
                    <li>Covers must meet local building codes and wind resistance standards</li>
                    <li>Installation must not interfere with neighboring sites or common areas</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Safety & Compliance</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>All installations subject to inspection and approval</li>
                    <li>Tenant responsible for obtaining necessary permits</li>
                    <li>Covers must be properly maintained and secured at all times</li>
                    <li>Removal required upon lease termination at tenant's expense</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Liability</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Tenant assumes full responsibility for cover installation and maintenance</li>
                    <li>Park not liable for damage caused by improperly installed covers</li>
                    <li>Insurance requirements may apply for certain installations</li>
                    <li>Tenant liable for any damage to park property or neighboring sites</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>Cancellation Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Notice Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>30-day written notice required for lease termination</li>
                    <li>Notice must be submitted to park management office</li>
                    <li>Partial month rent is not prorated</li>
                    <li>Early termination may result in forfeiture of deposits</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Eviction Terms</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Violation of park rules may result in immediate eviction</li>
                    <li>Non-payment of rent results in 3-day notice to pay or quit</li>
                    <li>Criminal activity results in immediate termination</li>
                    <li>No refund of rent or deposits for rule violations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Move-Out Procedures</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Site must be left clean and in original condition</li>
                    <li>All personal property must be removed</li>
                    <li>Final inspection required before deposit return</li>
                    <li>Deposits returned within 30 days minus any damages</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* SMS Terms & Conditions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <span>SMS Terms & Conditions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    By providing your mobile number and opting in, you consent to receive SMS messages from Evadale RV Park at 147 CR 847, Buna, TX 77612.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Message Frequency</h3>
                  <p className="text-sm text-muted-foreground">
                    You may receive up to 4 messages per month regarding reservations, updates, promotions, or account notices.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Message & Data Rates</h3>
                  <p className="text-sm text-muted-foreground">
                    Standard carrier message and data rates may apply.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Opt-Out</h3>
                  <p className="text-sm text-muted-foreground">
                    You can cancel at any time by replying STOP. After you send STOP, you will receive one additional message confirming your request. No further messages will be sent.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Help</h3>
                  <p className="text-sm text-muted-foreground">
                    For assistance, reply HELP or email us at info@evadaleRVPark.com.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Carriers Not Liable</h3>
                  <p className="text-sm text-muted-foreground">
                    Wireless carriers are not responsible for delayed or undelivered messages.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Eligibility</h3>
                  <p className="text-sm text-muted-foreground">
                    You must be 18+ or have parental consent to subscribe.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SMS Privacy Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>SMS Privacy Policy</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your privacy is important to us.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Data Collection</h3>
                  <p className="text-sm text-muted-foreground">
                    We collect your phone number and related information solely for the purpose of sending you text message updates.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Data Use</h3>
                  <p className="text-sm text-muted-foreground">
                    We will not share, sell, or rent your mobile information to third parties for marketing purposes.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Data Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Reasonable security measures are applied to protect your information.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Data Sharing</h3>
                  <p className="text-sm text-muted-foreground">
                    Message content and phone numbers are not shared outside of our service providers who facilitate SMS delivery.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Opt-Out</h3>
                  <p className="text-sm text-muted-foreground">
                    At any time, you may withdraw your consent to receive SMS by replying STOP.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  For questions about these terms and conditions, please contact:
                </p>
                <div className="text-sm">
                  <p className="font-semibold">Evadale RV Park</p>
                  <p className="text-muted-foreground">Email: info@evadalervpark.com</p>
                </div>
                <div className="mt-6">
                  <Link href="/">
                    <Button data-testid="button-back-to-form">
                      Return to Reservation Form
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}