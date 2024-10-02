import React, { useState, useEffect } from 'react';
import './App.css';

interface Topic {
  id: string;
  title: string;
  description: string;
  authorId: string;
  createdAt: string;
  modifiedAt: string;
}

const TopicsComponent: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('http://localhost:5185/api/v1/topics');
        const result = await response.json();
        
        // Log para verificar la respuesta de la API
        console.log(result);

        // Asegúrate de que result.data contiene los topics
        setTopics(result.data || []);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="container">
      <h2>Topics List</h2>
      <div className="grid">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <div className="card" key={topic.id}>
              <h3>{topic.title}</h3>
              <div className="content">
                <p>{topic.description}</p>
                <p className='left'><strong>Created:</strong> {new Date(topic.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <div>No topics available</div>
        )}
      </div>
    </div>
  );
};


export default TopicsComponent;
