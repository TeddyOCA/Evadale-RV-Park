import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertReservationSchema } from "@shared/schema";
import type { InsertReservation } from "@shared/schema";
import { User, Truck, Zap, CheckCircle, ArrowLeft, ArrowRight, Bus, Caravan, Loader2, Phone, Shield } from "lucide-react";
import { z } from "zod";

const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(7, "Phone number is required"),
  email: z.string().email("Valid email is required"),
});

type LeadData = z.infer<typeof leadSchema>;

const onboardingSchema = insertReservationSchema.extend({
  smsConsent: z.boolean(),
}).omit({
  firstName: true,
  lastName: true,
  phone: true,
  email: true,
}).refine((data) => {
  if (data.hasGenerator) {
    return data.generatorType && data.generatorType.trim() !== "" && data.generatorWattage && data.generatorWattage > 0;
  }
  return true;
}, {
  message: "Generator type and wattage are required when you have a generator",
  path: ["generatorType"],
}).refine((data) => {
  return data.agreesToTerms && data.agreesToRules && data.agreesToLiabilityWaiver;
}, {
  message: "You must agree to all terms, rules, and liability waiver",
  path: ["agreesToTerms"],
});

type OnboardingData = z.infer<typeof onboardingSchema>;

const onboardingStepLabels = ["RV Details", "Hookups & Power", "Review & Submit"];

export function LeadCaptureForm({ onLeadCaptured }: { onLeadCaptured?: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    },
  });

  const handleLeadSubmit = (data: LeadData) => {
    setLeadData(data);
    setShowForm(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setShowSuccess(true);
    onLeadCaptured?.();
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setLeadData(null);
    form.reset();
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">You're All Set!</h3>
          <p className="text-gray-600 mb-2">Your reservation request has been submitted.</p>
          <p className="text-gray-600 mb-4">Brian will reach out shortly to confirm your spot.</p>
          <div className="bg-primary/10 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700">You'll receive updates from the RV park at <strong>(409) 276-8830</strong></p>
            <p className="text-xs text-gray-500 mt-1">Message frequency varies. Message & data rates may apply. Reply STOP to cancel.</p>
          </div>
          <Button onClick={handleCloseSuccess} className="w-full" data-testid="button-close-success">
            Done
          </Button>
        </div>
      </div>
    );
  }

  if (showOnboarding && leadData) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
          <div className="bg-primary text-primary-foreground p-6 rounded-t-2xl">
            <h3 className="text-xl font-bold font-serif">Almost There, {leadData.firstName}!</h3>
            <p className="text-primary-foreground/80 text-sm mt-1">Tell us about your RV so we can prepare your spot.</p>
          </div>
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <OnboardingForm leadData={leadData} onComplete={handleOnboardingComplete} />
          </div>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
          <div className="bg-primary text-primary-foreground p-6 rounded-t-2xl text-center">
            <h3 className="text-2xl font-bold font-serif">Reserve Your Spot</h3>
            <p className="text-primary-foreground/80 text-sm mt-1">$425/month all-inclusive. Limited availability.</p>
          </div>
          <form onSubmit={form.handleSubmit(handleLeadSubmit)} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">First Name</Label>
                <Input
                  {...form.register("firstName")}
                  placeholder="John"
                  className="h-12"
                  data-testid="input-first-name"
                />
                {form.formState.errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Last Name</Label>
                <Input
                  {...form.register("lastName")}
                  placeholder="Smith"
                  className="h-12"
                  data-testid="input-last-name"
                />
                {form.formState.errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</Label>
              <Input
                {...form.register("phone")}
                type="tel"
                placeholder="(555) 123-4567"
                className="h-12"
                data-testid="input-phone"
              />
              {form.formState.errors.phone && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>
              )}
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Email</Label>
              <Input
                {...form.register("email")}
                type="email"
                placeholder="john@email.com"
                className="h-12"
                data-testid="input-email"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-14 text-lg font-bold" data-testid="button-submit-lead">
              <ArrowRight className="w-5 h-5 mr-2" />
              Book My Spot
            </Button>

            <p className="text-center text-xs text-gray-400">No commitment. We'll confirm availability and reach out.</p>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={() => setShowForm(true)}
      className="w-full sm:w-auto h-16 px-10 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
      data-testid="button-book-spot"
    >
      <ArrowRight className="w-6 h-6 mr-3" />
      Book a Spot Now
    </Button>
  );
}

function OnboardingForm({ leadData, onComplete }: { leadData: LeadData; onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      mailingAddress: "",
      checkIn: "",
      numberOfGuests: 1,
      emergencyContact1Name: "",
      emergencyContact1Relationship: "",
      emergencyContact1Phone: "",
      rvType: "motorhome",
      rvLength: 0,
      rvMake: "",
      rvModel: "",
      rvYear: "",
      slideOuts: 0,
      powerService: "30amp",
      waterHookup: true,
      sewerHookup: true,
      hasGenerator: false,
      generatorType: "",
      generatorWattage: undefined,
      specialRequests: "",
      agreesToTerms: false,
      agreesToRules: false,
      agreesToLiabilityWaiver: false,
      agreesToSmsMarketing: true,
      smsConsent: true,
    },
  });

  const createReservationMutation = useMutation({
    mutationFn: async (data: InsertReservation) => {
      return await apiRequest("POST", "/api/reservations", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reservations"] });
      onComplete();
      toast({
        title: "Reservation Request Submitted!",
        description: "Brian will reach out to confirm your spot.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit. Please try again.",
        variant: "destructive",
      });
      console.error("Reservation error:", error);
    },
  });

  const validateStep = async (step: number) => {
    const fieldsToValidate: (keyof OnboardingData)[] = [];
    switch (step) {
      case 1:
        fieldsToValidate.push("rvType", "rvLength", "mailingAddress", "checkIn", "numberOfGuests");
        break;
      case 2:
        fieldsToValidate.push("powerService");
        if (form.getValues("hasGenerator")) {
          fieldsToValidate.push("generatorType", "generatorWattage");
        }
        break;
      case 3:
        fieldsToValidate.push("agreesToTerms", "agreesToRules", "agreesToLiabilityWaiver",
          "emergencyContact1Name", "emergencyContact1Relationship", "emergencyContact1Phone");
        break;
    }
    return await form.trigger(fieldsToValidate);
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onSubmit = async (data: OnboardingData) => {
    const { smsConsent, ...rest } = data;
    const fullData: InsertReservation = {
      ...rest,
      firstName: leadData.firstName,
      lastName: leadData.lastName,
      phone: leadData.phone,
      email: leadData.email,
    };
    createReservationMutation.mutate(fullData);
  };

  const today = new Date().toISOString().split('T')[0];
  const watchedValues = form.watch();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        {onboardingStepLabels.map((label, i) => (
          <div key={i} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              i + 1 <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-500'
            }`}>
              {i + 1 < currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`ml-2 text-xs hidden sm:inline ${i + 1 <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{label}</span>
            {i < onboardingStepLabels.length - 1 && <div className={`w-8 sm:w-12 h-0.5 mx-2 ${i + 1 < currentStep ? 'bg-primary' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {currentStep === 1 && (
          <div className="space-y-5" data-testid="step-rv-info">
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              RV & Stay Details
            </h4>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">RV Type</Label>
              <RadioGroup
                value={form.watch("rvType")}
                onValueChange={(value) => form.setValue("rvType", value as "motorhome" | "trailer" | "fifth-wheel")}
                className="grid grid-cols-3 gap-3"
                data-testid="radio-group-rv-type"
              >
                {[
                  { value: "motorhome", label: "Motorhome", icon: Bus },
                  { value: "trailer", label: "Trailer", icon: Caravan },
                  { value: "fifth-wheel", label: "5th Wheel", icon: Truck },
                ].map(({ value, label, icon: Icon }) => (
                  <Label key={value} className="relative cursor-pointer">
                    <RadioGroupItem value={value} className="sr-only" />
                    <div className={`p-3 border-2 rounded-lg text-center transition-all ${
                      form.watch("rvType") === value ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/30"
                    }`}>
                      <Icon className="w-6 h-6 text-primary mx-auto mb-1" />
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">RV Length (ft)</Label>
                <Input
                  {...form.register("rvLength", { valueAsNumber: true })}
                  type="number" min="10" max="50" placeholder="32"
                  data-testid="input-rv-length"
                />
                {form.formState.errors.rvLength && <p className="text-red-500 text-xs mt-1">{form.formState.errors.rvLength.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Slide-outs</Label>
                <Input
                  {...form.register("slideOuts", { valueAsNumber: true })}
                  type="number" min="0" max="10" placeholder="0"
                  data-testid="input-slide-outs"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Make</Label>
                <Input {...form.register("rvMake")} placeholder="Jayco" data-testid="input-rv-make" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Model</Label>
                <Input {...form.register("rvModel")} placeholder="Eagle" data-testid="input-rv-model" />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Year</Label>
                <Input {...form.register("rvYear")} placeholder="2022" data-testid="input-rv-year" />
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Stay Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">Check-in Date</Label>
                  <Input {...form.register("checkIn")} type="date" min={today} data-testid="input-checkin" />
                  {form.formState.errors.checkIn && <p className="text-red-500 text-xs mt-1">{form.formState.errors.checkIn.message}</p>}
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1 block">Guests</Label>
                  <Input {...form.register("numberOfGuests", { valueAsNumber: true })} type="number" min="1" max="10" data-testid="input-number-of-guests" />
                </div>
              </div>
              <div className="mt-4">
                <Label className="text-sm font-medium text-gray-700 mb-1 block">Mailing Address</Label>
                <Input {...form.register("mailingAddress")} placeholder="123 Main St, City, State ZIP" data-testid="input-mailing-address" />
                {form.formState.errors.mailingAddress && <p className="text-red-500 text-xs mt-1">{form.formState.errors.mailingAddress.message}</p>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-5" data-testid="step-electrical">
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Hookups & Power
            </h4>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Power Service</Label>
              <RadioGroup
                value={form.watch("powerService")}
                onValueChange={(value) => form.setValue("powerService", value as "30amp" | "50amp")}
                className="grid grid-cols-2 gap-4"
                data-testid="radio-group-power-service"
              >
                <Label className="relative cursor-pointer">
                  <RadioGroupItem value="30amp" className="sr-only" />
                  <div className={`p-4 border-2 rounded-lg text-center transition-all ${
                    form.watch("powerService") === "30amp" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/30"
                  }`}>
                    <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
                    <span className="font-bold block">30 Amp</span>
                    <span className="text-xs text-gray-500">Standard (3,600W)</span>
                  </div>
                </Label>
                <Label className="relative cursor-pointer">
                  <RadioGroupItem value="50amp" className="sr-only" />
                  <div className={`p-4 border-2 rounded-lg text-center transition-all ${
                    form.watch("powerService") === "50amp" ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/30"
                  }`}>
                    <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <span className="font-bold block">50 Amp</span>
                    <span className="text-xs text-gray-500">Heavy Duty (12,000W)</span>
                  </div>
                </Label>
              </RadioGroup>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="font-medium text-green-800 text-sm">Included with every spot:</p>
              <div className="flex gap-6 mt-2 text-sm text-green-700">
                <span>Water hookup</span>
                <span>Sewer hookup</span>
                <span>Trash service</span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-3">
                <Checkbox
                  checked={form.watch("hasGenerator") || false}
                  onCheckedChange={(checked) => {
                    form.setValue("hasGenerator", !!checked);
                    if (!checked) {
                      form.setValue("generatorType", "");
                      form.setValue("generatorWattage", undefined);
                    }
                  }}
                  data-testid="checkbox-has-generator"
                />
                <span className="text-sm font-medium">I have a generator</span>
              </div>
              {form.watch("hasGenerator") && (
                <div className="ml-6 grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-700 mb-1 block">Generator Type</Label>
                    <Input {...form.register("generatorType")} placeholder="Honda EU2200i" data-testid="input-generator-type" />
                    {form.formState.errors.generatorType && <p className="text-red-500 text-xs mt-1">{form.formState.errors.generatorType.message}</p>}
                  </div>
                  <div>
                    <Label className="text-sm text-gray-700 mb-1 block">Wattage</Label>
                    <Input {...form.register("generatorWattage", { valueAsNumber: true })} type="number" placeholder="2200" data-testid="input-generator-wattage" />
                    {form.formState.errors.generatorWattage && <p className="text-red-500 text-xs mt-1">{form.formState.errors.generatorWattage.message}</p>}
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1 block">Special Requests (optional)</Label>
              <Textarea
                {...form.register("specialRequests")}
                placeholder="Any specific needs or preferences?"
                rows={3} className="resize-none"
                data-testid="input-special-requests"
              />
            </div>

            <div className="border-2 border-gray-100 rounded-lg p-4 bg-gray-50/50">
              <h5 className="text-sm font-semibold text-gray-700 mb-3">Text Message Updates (Optional)</h5>
              <div className="flex items-start space-x-3">
                <Checkbox
                  checked={form.watch("smsConsent") || false}
                  onCheckedChange={(checked) => {
                    form.setValue("smsConsent", checked as boolean);
                    form.setValue("agreesToSmsMarketing", checked as boolean);
                  }}
                  data-testid="checkbox-sms-consent"
                  className="mt-0.5"
                />
                <Label className="text-xs text-gray-600 leading-relaxed cursor-pointer">
                  Yes, send me text updates from the RV park at (409) 276-8830.
                  Message frequency varies. Msg & data rates may apply. Reply STOP to cancel. Consent not required for purchase.
                </Label>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-5" data-testid="step-review">
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              Review & Submit
            </h4>

            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-primary" /> Contact
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Name:</span> <span className="font-medium">{leadData.firstName} {leadData.lastName}</span></div>
                    <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{leadData.phone}</span></div>
                    <div><span className="text-gray-500">Email:</span> <span className="font-medium">{leadData.email}</span></div>
                    <div><span className="text-gray-500">Check-in:</span> <span className="font-medium">{watchedValues.checkIn}</span></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                    <Truck className="w-4 h-4 text-primary" /> RV Info
                  </h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-500">Type:</span> <span className="font-medium capitalize">{watchedValues.rvType}</span></div>
                    <div><span className="text-gray-500">Length:</span> <span className="font-medium">{watchedValues.rvLength} ft</span></div>
                    <div><span className="text-gray-500">Power:</span> <span className="font-medium">{watchedValues.powerService === "30amp" ? "30 Amp" : "50 Amp"}</span></div>
                    {watchedValues.rvMake && <div><span className="text-gray-500">Make:</span> <span className="font-medium">{watchedValues.rvMake}</span></div>}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900 text-sm">Emergency Contact</h5>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">Name</Label>
                  <Input {...form.register("emergencyContact1Name")} placeholder="Jane Smith" data-testid="input-emergency-contact-name" />
                  {form.formState.errors.emergencyContact1Name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.emergencyContact1Name.message}</p>}
                </div>
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">Relationship</Label>
                  <Input {...form.register("emergencyContact1Relationship")} placeholder="Spouse" data-testid="input-emergency-contact-relationship" />
                  {form.formState.errors.emergencyContact1Relationship && <p className="text-red-500 text-xs mt-1">{form.formState.errors.emergencyContact1Relationship.message}</p>}
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">Phone</Label>
                <Input {...form.register("emergencyContact1Phone")} type="tel" placeholder="(555) 123-4567" data-testid="input-emergency-contact-phone" />
                {form.formState.errors.emergencyContact1Phone && <p className="text-red-500 text-xs mt-1">{form.formState.errors.emergencyContact1Phone.message}</p>}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
              <h5 className="font-semibold text-gray-900 text-sm">Required Agreements</h5>
              {[
                { field: "agreesToTerms" as const, label: "Terms and Conditions", testId: "checkbox-agrees-to-terms" },
                { field: "agreesToRules" as const, label: "RV Park Rules and Regulations", testId: "checkbox-agrees-to-rules" },
                { field: "agreesToLiabilityWaiver" as const, label: "Liability Waiver", testId: "checkbox-agrees-to-liability-waiver" },
              ].map(({ field, label, testId }) => (
                <div key={field} className="flex items-start space-x-3">
                  <Checkbox
                    checked={form.watch(field) || false}
                    onCheckedChange={(checked) => form.setValue(field, checked as boolean)}
                    className="mt-0.5"
                    data-testid={testId}
                  />
                  <Label className="text-sm cursor-pointer">
                    I agree to the <a href="/terms" target="_blank" className="text-primary hover:underline">{label}</a>
                  </Label>
                </div>
              ))}
              {(form.formState.errors.agreesToTerms || form.formState.errors.agreesToRules || form.formState.errors.agreesToLiabilityWaiver) && (
                <p className="text-red-500 text-xs">All agreements must be checked to proceed</p>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4 border-t">
          <Button
            type="button" variant="outline" onClick={prevStep}
            className={currentStep === 1 ? "invisible" : ""}
            data-testid="button-previous"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          {currentStep < 3 ? (
            <Button type="button" onClick={nextStep} data-testid="button-next">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={createReservationMutation.isPending} className="min-w-[160px]" data-testid="button-submit">
              {createReservationMutation.isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
              ) : (
                <><CheckCircle className="w-4 h-4 mr-2" /> Submit Request</>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export { LeadCaptureForm as ReservationForm };
