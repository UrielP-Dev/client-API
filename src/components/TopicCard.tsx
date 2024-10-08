import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../TopicsCards.css";

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
        const response = await fetch("http://localhost:5185/api/v1/topics");
        const result = await response.json();
        setTopics(result.data || []);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div className="container">
      <div className="grid">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <Link
              to={`/topic-selected/${topic.id}`}
              key={topic.id}
              className="card"
            >
              <div className="vote-section"></div>
              <div className="content-section">
                <h3>{topic.title}</h3>
                <div className="metadata">
                  Posted by u/{topic.authorId} •{" "}
                  {new Date(topic.createdAt).toLocaleDateString()}
                </div>
                <div className="description">{topic.description}</div>
                <div className="actions">
                  <button className="action-button">
                    <span className="action-icon">💬</span> Ideas
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No topics available</div>
        )}
      </div>
    </div>
  );
};

export default TopicsComponent;
