  import Word from "../models/Word.js";

  export const getRandomWord = async (req, res) => {
    try {
      const { lang } = req.params;
      const word = await Word.aggregate([{ $match: { language: lang } }, { $sample: { size: 1 } }]);
      res.json(word.length ? word[0] : { message: "No hay palabras disponibles" });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la palabra" });
    }
  };

  export const addWord = async (req, res) => {
    try {
      const newWord = new Word(req.body);
      console.log(req.body)
      await newWord.save();
      res.json({ message: "Palabra agregada exitosamente" });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Error al guardar la palabra" });
    }
  };
  export const getWordByLanguageAndLength = async (req, res) => {
    try {
      const { lang, length } = req.params;

      // Validar los parámetros
      if (!['es', 'en'].includes(lang)) {
        return res.status(400).json({ error: "Idioma no válido. Usa 'es' para español o 'en' para inglés." });
      }

      if (isNaN(length) || length <= 0) {
        return res.status(400).json({ error: "La longitud debe ser un número mayor que 0." });
      }

      // Buscar una palabra que coincida con el idioma y la longitud
      const word = await Word.findOne({
        language: lang,
        word: { $regex: `^.{${length}}$` }, // Usar una expresión regular para filtrar por longitud
      });

      if (!word) {
        return res.status(404).json({ message: "No se encontró una palabra con ese idioma y longitud." });
      }

      res.json(word);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la palabra" });
    }
  };
  export const addWords = async (req, res) => {
    try {
      const words = req.body;  // Asegúrate de enviar un arreglo de palabras
      if (!Array.isArray(words)) {
        return res.status(400).json({ error: "El cuerpo de la solicitud debe ser un arreglo de palabras." });
      }

      // Crear un arreglo de instancias de 'Word' para guardarlas en la base de datos
      const newWords = words.map(word => new Word(word));
      
      // Guardar todas las palabras
      await Word.insertMany(newWords);
      
      res.json({ message: "Palabras agregadas exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al guardar las palabras" });
    }
  };
  export const deleteWord = async(req, res)=>{
    try{
      const {id} = req.params;
      const deleteWord = await Word.findByIdAndDelete(id);
      if(!deleteWord){
          return res.status(404).json({
              error: "Palabra no encontrada"
          })
      }
      else{
          res.status(200).json({
              message: "Palabra eliminada exitosamente"
          })
      }
    }
    catch(error){
      res.status(500).json({ error: "Error al eliminar la palabra" });
    }
  }