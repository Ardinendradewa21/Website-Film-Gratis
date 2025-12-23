import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  vote_count: z.number(),
  release_date: z.string().optional(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })).optional(),
  runtime: z.number().optional(),
});

export const MovieListSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const CastSchema = z.object({
  id: z.number(),
  name: z.string(),
  profile_path: z.string().nullable(),
  character: z.string(),
});

export const CreditsSchema = z.object({
  id: z.number(),
  cast: z.array(CastSchema),
});

export type Movie = z.infer<typeof MovieSchema>;
export type MovieList = z.infer<typeof MovieListSchema>;
export type Cast = z.infer<typeof CastSchema>;
