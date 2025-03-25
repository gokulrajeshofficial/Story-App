import React, { createContext, useContext, useState } from 'react';

const CharacterContext = createContext(null);

export const CharacterProvider = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const selectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const clearSelectedCharacter = () => {
    setSelectedCharacter(null);
  };

  return (
    <CharacterContext.Provider
      value={{
        selectedCharacter,
        selectCharacter,
        clearSelectedCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = () => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
}; 