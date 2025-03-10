// Función para validar si una palabra tiene la longitud correcta
export const isValidWordLength = (word, wordLength) => {
    return word.length === wordLength;
  };
  
  // Función para verificar si una palabra está en el diccionario
  export const isWordInDictionary = (word, dictionary) => {
    return dictionary.includes(word.toLowerCase());
  };
  
  // Función para aplicar colores a las letras según la respuesta
  export const getLetterColor = (letter, word, index) => {
    if (word[index] === letter) {
      return 'green'; // Correcta y en la posición correcta
    } else if (word.includes(letter)) {
      return 'yellow'; // Correcta pero en la posición incorrecta
    } else {
      return 'gray'; // Incorrecta
    }
  };
  
  // Función para verificar si la palabra adivinada es correcta
  export const isCorrectGuess = (guess, word) => {
    return guess.toLowerCase() === word.toLowerCase();
  };
  
  // Función para aplicar colores a todas las letras de un intento
  export const applyColorsToAttempt = (attempt, word) => {
    return attempt.split('').map((letter, index) => getLetterColor(letter, word, index));
  };