const express = require("express");
const animes = express.Router();
const {
  getAllAnimes,
  getOneAnime,
  createOneAnime,
  updateOneAnime,
  deleteOneAnime,
} = require("../queries/animes");

/* Instructions: Use the following prompts to write the corresponding routes. **Each** route should be able to catch server-side and user input errors(should they apply). Consult the test files to see how the routes and errors should work.*/
//Write a GET route that retrieves all animes from the database and sends them to the client with a 200 status code
//your response body should look this(ignore the length of the array):
// [
//   {
//       "id": 1,
//       "name": "One Piece",
//       "description": "One Piece is a Japanese manga series written and illustrated by Eiichiro Oda. It has been serialized in Shueishas shōnen manga magazine Weekly Shōnen Jump since July 1997, with its individual chapters compiled into 107 tankōbon volumes as of November 2023."
//   },
//   {
//       "id": 2,
//       "name": "Naruto",
//       "description": "Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village."
//   }
// ]

animes.get("/", async (req, res) =>{ 
  const allAnimes = await getAllAnimes()
  if(allAnimes[0]){
    res.status(200).json(allAnimes)
  }else {
    res.status(500).json({ error: "Internal Server Error"})
  }
})

animes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const singleAnime = await getOneAnime(id)
    if(singleAnime.id) {
      res.status(200).json(singleAnime)
    }else {
      res.status(500).json({error: "Internal Server Error"})
    }
  } catch (error) {
    res.status(500).json({ error: "No anime with that id"})
  }
  
})

//Write a POST route that takes user provided data from the request body and creates a new anime in the database. The route should respond with a 201 status code and the new anime.
//if the request body does not contain a name and description, or if the body's name or description have no length, respond with an error
//your response body should look this:
// {
//   "id": 20,
//   "name": "test",
//   "description": "this is anime"
// }

animes.post("/", async (req, res) => {
  try {
    const {name, description} = req.body
    const createdAnime = await createOneAnime(name, description)
    res.status(200).json(createdAnime)
  } catch (error) {
    res.status(500).json(error)
  }
})

//Write a PUT route that takes user provided data from the request body and updates an existing anime in the database. The route should respond with a 200 and the updated anime. The route should be able to handle a non-existent anime id.
//if the request body does not contain a name and description, or if the body's name or description have no length, respond with an error
//your response body should look this:
// {
//   "id": 20,
//   "name": "test1",
//   "description": "this is anime as well"
// }

animes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const animeUpdate = req.body
    const updatedAnime = await updateOneAnime(id, animeUpdate)
    res.status(200).json(updatedAnime)
  } catch (error) {
    res.status(500).json(error)
  }
})

//Write a DELETE route that deletes a single anime by id (provided by the client as a request param) from the database and responds with a 200 and the deleted anime data. The route should be able to handle a non-existent anime id.
//your response body should look this:
// {
//   "id": 20,
//   "name": "test1",
//   "description": "this is anime as well"
// }

animes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const deletedAnime = await deleteOneAnime(id)
    res.status(200).json({success: "Anime successfully deleted"})
  } catch (error) {
    res.status(500).json(error)
  }

})
module.exports = animes;
