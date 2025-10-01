import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DummyWatchlistItems, DummyFavoritesItems, DummyHistoryItems } from "@/components/Dummydata";
import { useNavigate, useLocation } from 'react-router-dom';
import { Bookmark, Clock, Heart, Star, ArrowLeft, User, Calendar, Film, Tv, Award, Bell, CreditCard, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const MySpacePage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSignOut = () => {
    // In a real app, you would clear the authentication token here
    // For now, we'll just redirect to the signin page with a redirect back to the current page
    navigate('/auth', { state: { from: location.pathname } });
  };
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="mb-6 sm:mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBackToHome}
            className="w-full sm:w-36 h-10 hover:bg-gray-800 mb-4 sm:mb-0"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Button>
        </div>
        <div className="container mx-auto px-2 sm:px-4">
          <Tabs defaultValue="watchlist" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 sm:mb-8 gap-1 sm:gap-2">
              <TabsTrigger value="watchlist" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" /> 
                <span className="truncate">Watchlist</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Heart className="h-3 w-3 sm:h-4 sm:w-4" /> 
                <span className="truncate">Favorites</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" /> 
                <span className="truncate">History</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <User className="h-3 w-3 sm:h-4 sm:w-4" /> 
                <span className="truncate">Profile</span>
              </TabsTrigger>
            </TabsList>

            {/* Watchlist */}
            <TabsContent value="watchlist">
              <Card>
                <CardHeader>
                  <CardTitle>Your Watchlist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="">
                  {DummyWatchlistItems.length > 0 ? (
                   
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 group">
                      {DummyWatchlistItems.map((item) => {
                        // Responsive image sizes
                        const enhancedImage = item.image
                          .replace(/w=\d+&h=\d+&fit=\w+/, 'w=400&h=600&fit=cover')
                          .replace(/q=\d+/, 'q=90');
                          
                        return (
                          <li key={item.id} className="group/card relative p-2 sm:p-3 border rounded-xl bg-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 hover:z-10" style={{ transformOrigin: 'center' }}>
                            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md group-hover/card:rounded-b-none transition-all duration-300 will-change-transform">
                              <img 
                                src={enhancedImage} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover/card:scale-110"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = item.image;
                                }}
                              />
                              <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center">
                                <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400 fill-yellow-400 mr-0.5 sm:mr-1" />
                                {item.rating}
                              </div>
                            </div>
                            <h3 className="text-sm sm:text-base font-semibold mt-2 line-clamp-1 group-hover/card:text-primary transition-colors">{item.title}</h3>
                            <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mt-1 group-hover/card:text-foreground transition-colors">
                              <span className="truncate pr-2">{item.genre}</span>
                              <span className="whitespace-nowrap">{item.year}</span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2 line-clamp-2 group-hover/card:text-foreground/80 transition-colors">{item.description}</p>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Movies and shows you've saved to watch later will appear here.</p>
                  )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Favorites */}
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Your Favorites</CardTitle>
                </CardHeader>
                <CardContent>
                  {DummyFavoritesItems.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 group">
                      {DummyFavoritesItems.map((item) => {
                        const enhancedImage = item.image
                          .replace(/w=\d+&h=\d+&fit=\w+/, 'w=400&h=600&fit=cover')
                          .replace(/q=\d+/, 'q=90');
                          
                        return (
                          <li key={item.id} className="group/card relative p-2 sm:p-3 border rounded-xl bg-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 hover:z-10" style={{ transformOrigin: 'center' }}>
                            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md group-hover/card:rounded-b-none transition-all duration-300 will-change-transform">
                              <img 
                                src={enhancedImage} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover/card:scale-110"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = item.image;
                                }}
                              />
                              <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center">
                                <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400 fill-yellow-400 mr-0.5 sm:mr-1" />
                                {item.rating}
                              </div>
                            </div>
                            <h3 className="text-sm sm:text-base font-semibold mt-2 line-clamp-1 group-hover/card:text-primary transition-colors">{item.title}</h3>
                            <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mt-1 group-hover/card:text-foreground transition-colors">
                              <span className="truncate pr-2">{item.genre}</span>
                              <span className="whitespace-nowrap">{item.year}</span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2 line-clamp-2 group-hover/card:text-foreground/80 transition-colors">{item.description}</p>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Your favorite movies and shows will appear here.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* History */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Watch History</CardTitle>
                </CardHeader>
                <CardContent>
                  {DummyHistoryItems.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 group">
                      {DummyHistoryItems.map((item) => {
                        const enhancedImage = item.image
                          .replace(/w=\d+&h=\d+&fit=\w+/, 'w=400&h=600&fit=cover')
                          .replace(/q=\d+/, 'q=90');
                          
                        return (
                          <li key={item.id} className="group/card relative p-2 sm:p-3 border rounded-xl bg-card transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50 hover:z-10" style={{ transformOrigin: 'center' }}>
                            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md group-hover/card:rounded-b-none transition-all duration-300 will-change-transform">
                              <img 
                                src={enhancedImage} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover/card:scale-110"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = item.image;
                                }}
                              />
                              <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex items-center">
                                <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400 fill-yellow-400 mr-0.5 sm:mr-1" />
                                {item.rating}
                              </div>
                            </div>
                            <h3 className="text-sm sm:text-base font-semibold mt-2 line-clamp-1 group-hover/card:text-primary transition-colors">{item.title}</h3>
                            <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground mt-1 group-hover/card:text-foreground transition-colors">
                              <span className="truncate pr-2">{item.genre}</span>
                              <span className="whitespace-nowrap">{item.year}</span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2 line-clamp-2 group-hover/card:text-foreground/80 transition-colors">{item.description}</p>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Your recently watched content will appear here.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>


            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Your profile information will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ratings */}
            <TabsContent value="ratings">
              <Card>
                <CardHeader>
                  <CardTitle>Your Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Movies and shows you've rated will appear here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Profile Header */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-gray-900/50 rounded-lg">
                      <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-2 border-primary">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-bold">John Doe</h2>
                        <p className="text-muted-foreground">premium@example.com</p>
                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs rounded-full flex items-center">
                            <Award className="h-3 w-3 mr-1" /> Premium Member
                          </span>
                          <span className="px-3 py-1 bg-gray-800 text-white text-xs rounded-full">
                            Member since 2023
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <StatCard icon={Film} title="Movies Watched" value="247" />
                      <StatCard icon={Tv} title="TV Shows" value="58" />
                      <StatCard icon={Clock} title="Watch Time" value="1.2k hrs" />
                      <StatCard icon={Star} title="Rated" value="189" />
                    </div>

                    {/* Subscription */}
                    <Card className="border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CreditCard className="h-5 w-5" /> Subscription
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">Premium Plan</h4>
                              <p className="text-sm text-muted-foreground">Renews on Oct 30, 2023</p>
                            </div>
                            <Button variant="outline" size="sm" 
                            onClick={() => navigate('/')}>Manage</Button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Storage used</span>
                              <span>45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Preferences */}
                   

                    {/* Account Actions */}
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" 
                        onClick={() => navigate('/')}>
                        <Settings className="h-4 w-4 mr-2" />
                        Account Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Bell className="h-4 w-4 mr-2" />
                        Notification Preferences
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-500"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon: Icon, title, value }: { icon: any, title: string, value: string }) => (
  <Card className="text-center p-4">
    <div className="p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <h3 className="text-2xl font-bold">{value}</h3>
    <p className="text-sm text-muted-foreground">{title}</p>
  </Card>
);

export default MySpacePage;
