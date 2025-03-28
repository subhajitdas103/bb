
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Trophy, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const MatchPrediction = ({ match, prediction, setPrediction }) => {
  const handlePrediction = (winner) => {
    setPrediction({ ...match, winner });
  };
  
  return (
    <div className="bg-silver-50 p-4 rounded-lg mb-4">
      <div className="mb-4">
        <h3 className="font-medium text-center mb-2">Match Prediction</h3>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center space-y-2 w-5/12">
            <button
              onClick={() => handlePrediction(match.team1.name)}
              className={`w-full py-3 px-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                prediction?.winner === match.team1.name
                  ? 'bg-primary text-white'
                  : 'bg-white border hover:border-primary'
              }`}
            >
              <span className={`text-xs px-2 py-0.5 rounded-full mb-1 ${
                prediction?.winner === match.team1.name ? 'bg-white text-primary' : 'bg-silver-100'
              }`}>
                Seed {match.team1.seed}
              </span>
              <span className="font-semibold">{match.team1.name}</span>
            </button>
          </div>
          
          <div className="text-silver-400 font-bold">VS</div>
          
          <div className="flex flex-col items-center space-y-2 w-5/12">
            <button
              onClick={() => handlePrediction(match.team2.name)}
              className={`w-full py-3 px-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                prediction?.winner === match.team2.name
                  ? 'bg-primary text-white'
                  : 'bg-white border hover:border-primary'
              }`}
            >
              <span className={`text-xs px-2 py-0.5 rounded-full mb-1 ${
                prediction?.winner === match.team2.name ? 'bg-white text-primary' : 'bg-silver-100'
              }`}>
                Seed {match.team2.seed}
              </span>
              <span className="font-semibold">{match.team2.name}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TournamentPredict = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock tournament data
  const tournament = {
    id: parseInt(id),
    name: "March Madness 2024",
    currentRound: "Sweet 16",
    matches: [
      {
        id: 1,
        team1: { name: "Duke", seed: 1 },
        team2: { name: "Illinois", seed: 4 },
        winner: ""
      },
      {
        id: 2,
        team1: { name: "Kentucky", seed: 2 },
        team2: { name: "Gonzaga", seed: 3 },
        winner: ""
      },
      {
        id: 3,
        team1: { name: "UConn", seed: 1 },
        team2: { name: "Alabama", seed: 5 },
        winner: ""
      },
      {
        id: 4,
        team1: { name: "Arizona", seed: 2 },
        team2: { name: "Baylor", seed: 3 },
        winner: ""
      }
    ]
  };
  
  const [predictions, setPredictions] = useState(tournament.matches.map(match => ({ ...match, winner: "" })));
  
  const updatePrediction = (index, prediction) => {
    const newPredictions = [...predictions];
    newPredictions[index] = prediction;
    setPredictions(newPredictions);
  };
  
  const handleSubmit = () => {
    const unfilledPredictions = predictions.filter(p => !p.winner);
    
    if (unfilledPredictions.length > 0) {
      toast({
        title: "Incomplete predictions",
        description: "Please make predictions for all matches before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Predictions Submitted",
      description: `Your predictions for ${tournament.name} - ${tournament.currentRound} have been submitted successfully.`,
    });
    
    navigate(`/tournaments/${id}`);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-10">
        <div className="mb-6">
          <Link to={`/tournaments/${id}`} className="inline-flex items-center text-silver-600 hover:text-silver-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tournament
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Make Predictions</h1>
              <p className="text-silver-500">{tournament.name} - {tournament.currentRound}</p>
            </div>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-primary" /> Round Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center mb-4 p-3 bg-amber-50 text-amber-800 rounded-lg">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p className="text-sm">Make your predictions before the round begins. You won't be able to change them after the matches start.</p>
              </div>
              
              {predictions.map((match, index) => (
                <MatchPrediction 
                  key={match.id}
                  match={match}
                  prediction={predictions[index]}
                  setPrediction={(updatedPrediction) => updatePrediction(index, updatedPrediction)}
                />
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link to={`/tournaments/${id}`}>Cancel</Link>
              </Button>
              <Button onClick={handleSubmit}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Submit Predictions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TournamentPredict;
