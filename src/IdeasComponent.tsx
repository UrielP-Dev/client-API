import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const IdeasComponent: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>(); // Obtener el TopicId de la URL
  const [ideas, setIdeas] = useState<any[]>([]); // Puedes definir un tipo específico

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch(`http://localhost:5185/api/v1/ideas/?TopicId=${topicId}`);
        const result = await response.json();
        console.log(result);
        setIdeas(result.data || []);
      } catch (error) {
        console.error('Error fetching ideas:', error);
      }
    };

    fetchIdeas();
  }, [topicId]);

  return (
    <div className="container">
      <h2>Ideas for Topic {topicId}</h2>
      <div className="grid">
        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <div className="card" key={idea.id}>
              <h3>{idea.title}</h3>
              <p>{idea.description}</p>
              {/* Agrega otros campos que quieras mostrar */}
            </div>
          ))
        ) : (
          <div>No ideas available for this topic.</div>
        )}
      </div>
    </div>
  );
};

export default IdeasComponent;
