import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Recursos from './Recursos';
import Cuestionarios from './Cuestionarios';
import Preguntas from './Preguntas';
import Alternativas from './Alternativas';

export const GestionCuestionarios = ()=>{
    const [selectedResource, setSelectedResource] = useState(null);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    return(
        <div>
        {!selectedResource && <Recursos onSelectResource={setSelectedResource} />}
        {selectedResource && !selectedQuiz && (
          <Cuestionarios resourceId={selectedResource.id} onSelectQuiz={setSelectedQuiz} />
        )}
        {selectedQuiz && !selectedQuestion && (
          <Preguntas quizId={selectedQuiz.id} onSelectQuestion={setSelectedQuestion} />
        )}
        {selectedQuestion && (
          <Alternativas questionId={selectedQuestion.id} />
        )}
      </div>
    );
}