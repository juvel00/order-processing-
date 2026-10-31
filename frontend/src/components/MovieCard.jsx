import React from 'react';
import { Clock, Globe, Shield, Ticket, Star, Sparkles } from 'lucide-react';

export default function MovieCard({ movie, onSelectMovie }) {
  const genreColors = {
    SCI_FI: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    ACTION: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    DRAMA: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    ANIMATION: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    THRILLER: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  };

  return (
    <div className="group bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col">
      {/* Poster with overlays */}
      <div className="relative aspect-[16/10] sm:aspect-[16/11] overflow-hidden bg-slate-950">
        <img
          src={movie.posterUrl || 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80'}
          alt={movie.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Rating and Genre badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-slate-950/80 border border-slate-700 text-slate-200 backdrop-blur-md">
            {movie.rating}
          </span>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider border backdrop-blur-md ${genreColors[movie.genre] || 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'}`}>
            {movie.genre}
          </span>
        </div>

        {/* Showtimes count badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600/90 text-white backdrop-blur-md shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{movie.totalShowtimes || 'Multiple'} Shows Today</span>
        </div>
      </div>

      {/* Body info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mt-2 mb-3">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {movie.durationMinutes} mins
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              {movie.language}
            </span>
            <span className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              4.8/5
            </span>
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {movie.description}
          </p>
        </div>

        {/* Action button */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Tickets From</span>
            <span className="text-lg font-black text-amber-400">₹200.00</span>
          </div>
          <button
            onClick={() => onSelectMovie(movie)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 transition transform active:scale-95"
          >
            <Ticket className="w-4 h-4" />
            Book Seats
          </button>
        </div>
      </div>
    </div>
  );
}
