
import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO } from 'date-fns';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Bell, Trophy } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock tournament events data
  const events = [
    {
      id: 1,
      title: "March Madness - Round of 64",
      date: "2024-03-21",
      time: "12:00 PM",
      type: "match",
      description: "First round of March Madness tournament begins"
    },
    {
      id: 2,
      title: "March Madness - Round of 32",
      date: "2024-03-23",
      time: "2:00 PM",
      type: "match",
      description: "Second round of March Madness tournament"
    },
    {
      id: 3,
      title: "March Madness - Sweet 16",
      date: "2024-03-28",
      time: "7:00 PM",
      type: "match",
      description: "Sweet 16 round begins"
    },
    {
      id: 4,
      title: "March Madness - Elite 8",
      date: "2024-03-30",
      time: "6:00 PM",
      type: "match",
      description: "Elite 8 round begins"
    },
    {
      id: 5,
      title: "March Madness - Final Four",
      date: "2024-04-06",
      time: "6:00 PM",
      type: "match",
      description: "Final Four matchups"
    },
    {
      id: 6,
      title: "March Madness - Championship",
      date: "2024-04-08",
      time: "9:00 PM",
      type: "match",
      description: "Championship game"
    },
    {
      id: 7,
      title: "NBA Playoffs - First Round Predictions Due",
      date: "2024-04-19",
      time: "11:59 PM",
      type: "deadline",
      description: "Deadline for first round NBA Playoffs predictions"
    },
    {
      id: 8,
      title: "MLB World Series - Group Creation Deadline",
      date: "2024-10-09",
      time: "11:59 PM",
      type: "deadline",
      description: "Last day to create groups for MLB World Series predictions"
    }
  ];

  // Get days of current month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get events for the selected date
  const selectedDateEvents = events.filter(event => {
    const eventDate = parseISO(event.date);
    return isSameDay(eventDate, selectedDate);
  });
  
  // Get all events for the month
  const currentMonthEvents = events.filter(event => {
    const eventDate = parseISO(event.date);
    return isSameMonth(eventDate, currentDate);
  });
  
  // Check if a date has events
  const hasEvents = (date) => {
    return events.some(event => isSameDay(parseISO(event.date), date));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Calendar Section */}
          <div className="w-full md:w-8/12 mb-8 md:mb-0">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl">
                  Tournament Calendar
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium">
                    {format(currentDate, 'MMMM yyyy')}
                  </span>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-20 p-1 border border-transparent rounded-md text-silver-300"></div>
                  ))}
                  
                  {daysInMonth.map((day, i) => (
                    <div 
                      key={i}
                      className={`h-20 p-1 rounded-md border transition-colors cursor-pointer hover:bg-silver-50 relative ${
                        isSameDay(day, selectedDate) 
                          ? 'border-primary bg-primary/5' 
                          : 'border-silver-200'
                      } ${
                        isToday(day) ? 'font-bold' : ''
                      }`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="flex justify-between">
                        <span className={`text-sm ${isToday(day) ? 'text-primary' : ''}`}>
                          {format(day, 'd')}
                        </span>
                        {hasEvents(day) && (
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                      
                      {/* Show first event on the calendar (if exists) */}
                      {events
                        .filter(event => isSameDay(parseISO(event.date), day))
                        .slice(0, 1)
                        .map(event => (
                          <div 
                            key={event.id} 
                            className="mt-1 overflow-hidden text-xs rounded px-1 py-0.5 bg-primary/10 text-primary"
                          >
                            {event.title.length > 20 
                              ? `${event.title.substring(0, 18)}...` 
                              : event.title}
                          </div>
                        ))
                      }
                      
                      {/* Show indicator if more events */}
                      {events.filter(event => isSameDay(parseISO(event.date), day)).length > 1 && (
                        <div className="text-xs text-silver-500 mt-0.5">
                          +{events.filter(event => isSameDay(parseISO(event.date), day)).length - 1} more
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Selected Date Events */}
          <div className="w-full md:w-4/12">
            <div className="sticky top-24">
              <Card className="glass-card mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center text-lg">
                    <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
                    {isToday(selectedDate) && (
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Today</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateEvents.map(event => (
                        <div 
                          key={event.id} 
                          className="flex items-start gap-3 p-3 border border-silver-200 rounded-lg hover:bg-silver-50 transition-colors"
                        >
                          <div className={`p-2 rounded-full ${
                            event.type === 'match' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {event.type === 'match' ? <Trophy className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-silver-500 text-sm">{event.time}</p>
                            <p className="text-sm mt-1">{event.description}</p>
                          </div>
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="outline" size="sm">View</Button>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>{event.title}</SheetTitle>
                              </SheetHeader>
                              <div className="mt-6 space-y-4">
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-5 w-5 text-silver-500" />
                                  <span>{format(parseISO(event.date), 'MMMM d, yyyy')} • {event.time}</span>
                                </div>
                                <p>{event.description}</p>
                                
                                {event.type === 'match' ? (
                                  <Button className="w-full mt-4">Make Prediction</Button>
                                ) : (
                                  <Button className="w-full mt-4">Set Reminder</Button>
                                )}
                              </div>
                            </SheetContent>
                          </Sheet>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-silver-500">
                      <CalendarIcon className="h-10 w-10 mx-auto mb-2 text-silver-300" />
                      <p>No events scheduled for this day</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Upcoming Events Section */}
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentMonthEvents.length > 0 ? (
                      currentMonthEvents
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .slice(0, 3)
                        .map(event => (
                          <div 
                            key={event.id} 
                            className="flex items-center gap-3 p-2 border-b border-silver-200 last:border-b-0"
                          >
                            <div className={`p-1.5 rounded-full ${
                              event.type === 'match' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-amber-100 text-amber-700'
                            }`}>
                              {event.type === 'match' ? <Trophy className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{event.title}</h4>
                              <p className="text-silver-500 text-xs">{format(parseISO(event.date), 'MMM d')} • {event.time}</p>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-4 text-silver-500">
                        <p>No upcoming events this month</p>
                      </div>
                    )}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">View All Events</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
