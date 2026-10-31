import React, { useState } from 'react';
import { Film, Sparkles, Clapperboard, Filter, Play } from 'lucide-react';
import MovieCard from './MovieCard';

export default function MovieList({ movies, loading, searchQuery, onSelectMovie }) {
  const [selectedGenre, setSelectedGenre] = useState('ALL');

  const genres = [
    { label: 'All Genres', value: 'ALL' },
    { label: 'Sci-Fi', value: 'SCI_FI' },
    { label: 'Action', value: 'ACTION' },
    { label: 'Drama', value: 'DRAMA' },
    { label: 'Animation', value: 'ANIMATION' },
  ];

  // Filter movies by genre and search query
  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = selectedGenre === 'ALL' || movie.genre === selectedGenre;
    const matchesSearch = !searchQuery ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.language.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const featuredMovie = movies.find((m) => m.title.includes('Interstellar')) || movies[0];

  return (
    <div className="space-y-10">
      
      {/* Hero Banner for Featured Movie */}
      {featuredMovie && !searchQuery && selectedGenre === 'ALL' && (
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
          <div className="absolute inset-0">
            <img
              src={featuredMovie.posterUrl}
              alt={featuredMovie.title}
              className="w-full h-full object-cover object-top opacity-35 filter blur-[1px] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative p-6 sm:p-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Special Re-Release • IMAX & Dolby Atmos</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {featuredMovie.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 line-clamp-3 leading-relaxed">
              {featuredMovie.description}
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 pt-1">
              <span>{featuredMovie.durationMinutes} mins</span>
              <span>•</span>
              <span>{featuredMovie.language}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">
                {featuredMovie.rating}
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectMovie(featuredMovie)}
                className="px-6 py-3 rounded-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xl shadow-amber-500/20 transition active:scale-95 flex items-center gap-2 text-sm"
              >
                <Clapperboard className="w-4 h-4" />
                <span>Book Seats Now</span>
              </button>

              {featuredMovie.trailerUrl && (
                <a
                  href={featuredMovie.trailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-2xl font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 transition flex items-center gap-2 text-sm"
                >
                  <Play className="w-4 h-4 fill-slate-200" />
                  <span>Watch Trailer</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Genre Filter Pills */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {genres.map((g) => (
            <button
              key={g.value}
              onClick={() => setSelectedGenre(g.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedGenre === g.value
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-semibold text-slate-400">
          Showing <strong className="text-white">{filteredMovies.length}</strong> movies
        </span>
      </div>

      {/* Movies Grid */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-400">Loading cinema catalog...</p>
        </div>
      ) : filteredMovies.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
          <Film className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No movies matched your search</h3>
          <p className="text-xs text-slate-400">Try adjusting your keywords or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelectMovie={onSelectMovie}
            />
          ))}
        </div>
      )}

    </div>
  );
}
