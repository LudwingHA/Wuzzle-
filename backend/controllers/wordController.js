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
    await newWord.save();
    res.json({ message: "Palabra agregada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar la palabra" });
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