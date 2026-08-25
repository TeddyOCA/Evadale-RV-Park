import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowLeft, Trash2, Calendar, User, Truck, Zap, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { format } from "date-fns";
import type { Reservation } from "@shared/schema";

export default function Admin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reservations, isLoading } = useQuery<Reservation[]>({
    queryKey: ["/api/reservations"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/reservations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reservations"] });
      toast({
        title: "Success",
        description: "Reservation deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete reservation",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this reservation?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading reservations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-serif">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage RV park inquiries</p>
          </div>
          <Link href="/" className="inline-flex">
            <Button variant="outline" data-testid="link-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Inquiry Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary" data-testid="text-total-reservations">
                    {reservations?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Inquiries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent" data-testid="text-recent-reservations">
                    {reservations?.filter(r => {
                      const created = new Date(r.createdAt!);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return created > weekAgo;
                    }).length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary" data-testid="text-upcoming-checkins">
                    {reservations?.filter(r => {
                      const checkIn = new Date(r.checkIn);
                      const today = new Date();
                      return checkIn >= today;
                    }).length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Upcoming Check-ins</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {reservations?.map((reservation) => (
            <Card key={reservation.id} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-primary" />
                    <span data-testid={`text-guest-name-${reservation.id}`}>
                      {reservation.firstName} {reservation.lastName}
                    </span>
                  </CardTitle>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(reservation.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${reservation.id}`}
                  >
                    {deleteMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Contact Information</h4>
                    <div className="space-y-1 text-sm">
                      <div data-testid={`text-email-${reservation.id}`}>
                        <span className="text-muted-foreground">Email:</span> {reservation.email}
                      </div>
                      <div data-testid={`text-phone-${reservation.id}`}>
                        <span className="text-muted-foreground">Phone:</span> {reservation.phone}
                      </div>
                      {reservation.mailingAddress && (
                        <div data-testid={`text-mailing-address-${reservation.id}`}>
                          <span className="text-muted-foreground">Mailing Address:</span> {reservation.mailingAddress}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Reservation Dates</h4>
                    <div className="space-y-1 text-sm">
                      <div data-testid={`text-checkin-${reservation.id}`}>
                        <span className="text-muted-foreground">Check-in:</span> {format(new Date(reservation.checkIn), 'MMM dd, yyyy')}
                      </div>
                      <div data-testid={`text-submitted-${reservation.id}`}>
                        <span className="text-muted-foreground">Submitted:</span> {format(new Date(reservation.createdAt!), 'MMM dd, yyyy HH:mm')}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* RV Information */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-primary" />
                    <span>RV Information</span>
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <Badge variant="outline" data-testid={`badge-rv-type-${reservation.id}`}>
                        {reservation.rvType.charAt(0).toUpperCase() + reservation.rvType.slice(1)}
                      </Badge>
                    </div>
                    <div data-testid={`text-rv-length-${reservation.id}`}>
                      <span className="text-muted-foreground">Length:</span> {reservation.rvLength} feet
                    </div>
                    {(reservation.rvYear || reservation.rvMake || reservation.rvModel) && (
                      <div data-testid={`text-rv-details-${reservation.id}`}>
                        <span className="text-muted-foreground">RV:</span> {[reservation.rvYear, reservation.rvMake, reservation.rvModel].filter(Boolean).join(' ')}
                      </div>
                    )}
                    {reservation.slideOuts !== undefined && reservation.slideOuts > 0 && (
                      <div data-testid={`text-slide-outs-${reservation.id}`}>
                        <span className="text-muted-foreground">Slide-outs:</span> {reservation.slideOuts}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Electrical & Services */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span>Electrical & Services</span>
                  </h4>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default" data-testid={`badge-power-service-${reservation.id}`}>
                        {reservation.powerService === '30amp' ? '30A Service' : '50A Service'}
                      </Badge>
                      <Badge variant="secondary">Water & Sewer Included</Badge>
                    </div>
                    
                    {reservation.hasGenerator && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Generator:</span>
                        {reservation.generatorType && ` ${reservation.generatorType}`}
                        {reservation.generatorWattage && ` (${reservation.generatorWattage}W)`}
                      </div>
                    )}
                  </div>
                </div>

                {reservation.specialRequests && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Special Requests</h4>
                      <p className="text-sm text-muted-foreground" data-testid={`text-special-requests-${reservation.id}`}>
                        {reservation.specialRequests}
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}

          {reservations?.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Reservations Yet</h3>
                <p className="text-muted-foreground">Reservations will appear here once guests submit the form.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
