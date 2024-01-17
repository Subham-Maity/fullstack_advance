import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../../middleware/error/catchAsyncError";
import VideoGame from "../../../src/model/games/games.model";
import { SortOrder } from "mongoose";
import log from "../../utils/logger/logger";

/** GET http://localhost:5050/api/v1/games?page=2
 ?page={number} - The page number to retrieve (default: 1)
 */

/** GET http://localhost:5050/api/v1/games?limit=10
 *
 * ?limit={number} - The number of results to return (default: 5)
 */

/** GET http://localhost:5050/api/v1/games?search=the
 *
 * If you want to search `Game 2`, you can use the following query:
 * http://localhost:5050/api/v1/games?search=game%202
 *
 *
 * ?search={string} - The search query to filter results by name (default: "")
 */

/** GET http://localhost:5050/api/v1/games?genre=Action
 * ?genre={string} - The genre to filter results by (default: "All") - Can be a single genre or an array of genres
 * ?genre=Action
 */

/** GET http://localhost:5050/api/v1/games?sort=rating
 * ?sort={string} - The field to sort results by (default: "rating")
 * ?sort=rating
 * ?sort=-rating
 * ?sort=rating,-year
 */

/** In a single query, you can combine all the above query parameters to get the desired results
 * http://localhost:5050/api/v1/games?search=game%202&genre=Action&sort=rating,-year - This will search for games with the name `game 2` and genre `Action` and sort the results by `rating` in ascending order and `year` in descending order
 */

const genreOptions = [
  "Action",
  "Romance",
  "Fantasy",
  "Drama",
  "Crime",
  "Adventure",
  "Thriller",
  "Sci-fi",
  "Music",
  "Family",
];
// Helper function to parse query parameters
// This function parses the query parameters from the request.
const parseQueryParams = (req: Request) => {
  // Destructure and set default values for query parameters
  const {
    page = "1", // we will use this to paginate the results
    limit = "5", // we will use this to limit the number of results per page
    search = "", // we will use this to search for games by name
    sort = "rating", // we will use this to sort the results
    genre = "All", // we will use this to filter the results by genre
  } = req.query;

  // Convert page and limit values to numbers
  //10 is the radix parameter which specifies the base of the number system
  const pageValue: number = parseInt(page as string, 10);
  const limitValue: number = parseInt(limit as string, 10);

  // Declare variables to store genres and sort options in an array
  let genres: string[];
  let sortOptions: [string, SortOrder][]; // SortOrder is a type from mongoose that can be "asc" or "desc" (ascending or descending)

  // If genre is "All", use all genre options, otherwise use the provided genre(s)
  if (genre === "All") {
    genres = [...genreOptions]; // Copy all genre options to genres array
  } else {
    genres = Array.isArray(genre) ? (genre as string[]) : [genre as string]; //
  }

  // If sort is an array, map each item to a tuple [key, order], otherwise use the provided sort key with "asc" order

  sortOptions = Array.isArray(sort)
    ? (sort as (string | [string, SortOrder])[]).map(
        (
          item, //sortOptions is an array of tuples [key, order]
        ) => (Array.isArray(item) ? item : [item as string, "asc"]),
      )
    : [[sort as string, "asc"]];

  // Create a sortBy object from sortOptions
  const sortBy: { [key: string]: SortOrder } = {};

  //purpose of this is to convert the array of tuples [key, order] to an object {key: order}
  //for example, if sortOptions is [["rating", "asc"], ["year", "desc"]], then sortBy will be {rating: "asc", year: "desc"}
  sortOptions.forEach(([key, order]) => {
    sortBy[key] = order;
  });

  // Return parsed query parameters
  return { pageValue, limitValue, genres, sortBy, search };
};

// This function fetches video games from the database based on the parsed query parameters
const fetchVideoGames = async ({
  pageValue,
  limitValue,
  genres,
  sortBy,
  search,
}: ReturnType<typeof parseQueryParams>) => {
  // Find video games that match the search query and genre, sort them, and apply pagination
  const videoGames = await VideoGame.find({
    //for example, if search is "the", then the regex will be /the/i which means that the search will be case insensitive and will match any string that contains "the" in it (for example, "The Last of Us")
    name: { $regex: search as string, $options: "i" },
    genre: { $in: genres },
  })
    .sort(sortBy)
    .skip((pageValue - 1) * limitValue)
    .limit(limitValue);

  // Count the total number of video games that match the search query and genre
  const total = await VideoGame.countDocuments({
    genre: { $in: genres },
    name: { $regex: search as string, $options: "i" },
  });

  // Return the fetched video games and the total count
  return { videoGames, total };
};

// This is the main function that handles the GET request to fetch video games
export const getVideoGames = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse the query parameters from the request
      const queryParams = parseQueryParams(req);
      // Fetch video games based on the parsed query parameters
      const { videoGames, total } = await fetchVideoGames(queryParams);

      // Construct the response object
      const response = {
        error: false,
        total,
        page: queryParams.pageValue,
        limit: queryParams.limitValue,
        genres: genreOptions,
        videoGames,
      };

      // Send the response object as JSON
      res.status(200).json(response);
    } catch (error) {
      // Log the error and forward it to the error handling middleware
      log.info(error);
      return next({
        status: 500,
        message: "Internal Server Error",
      });
    }
  },
);
