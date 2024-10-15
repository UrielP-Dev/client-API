import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Idea from "../components/Idea";
import "../Styles/TopicSelected.css";

interface Topic {
  title: string;
  description: string;
  authorId: string;
  createdAt: string;
  modifiedAt: string;
}

interface Idea {
  id: string;
  topicId: string;
  content: string;
  authorId: string;
  votes: number;
  createdAt: string;
}

function TopicSelected() {
  const { id: topicId } = useParams<{ id: string }>();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [newIdeaContent, setNewIdeaContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // Estado para manejar la expansión del textarea

  useEffect(() => {
    const fetchTopicAndIdeas = async () => {
      try {
        const token = localStorage.getItem("token");

        const topicResponse = await fetch(
          `http://localhost:5185/api/v1/topics/${topicId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const topicResult = await topicResponse.json();

        if (Array.isArray(topicResult.data) && topicResult.data.length > 0) {
          setTopic(topicResult.data[0]);
        } else {
          console.error("Unexpected topic response structure:", topicResult);
        }

        const ideasResponse = await fetch(
          `http://localhost:5185/api/v1/ideas/?TopicId=${topicId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const ideasResult = await ideasResponse.json();

        if (Array.isArray(ideasResult)) {
          setIdeas(ideasResult);
        } else if (ideasResult && Array.isArray(ideasResult.data)) {
          setIdeas(ideasResult.data);
        } else {
          console.error("Unexpected ideas response structure:", ideasResult);
        }
      } catch (error) {
        console.error("Error fetching topic or ideas:", error);
      }
    };

    fetchTopicAndIdeas();
  }, [topicId]);

  const handlePostIdea = async () => {
    setErrorMessage("");

    if (!newIdeaContent) {
      setErrorMessage("Idea content cannot be empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5185/api/v1/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          topicId: topicId,
          content: newIdeaContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to post the idea");
      }

      setNewIdeaContent("");

      const updatedIdeasResponse = await fetch(
        `http://localhost:5185/api/v1/ideas/?TopicId=${topicId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedIdeasResult = await updatedIdeasResponse.json();

      if (Array.isArray(updatedIdeasResult)) {
        setIdeas(updatedIdeasResult);
      } else if (updatedIdeasResult && Array.isArray(updatedIdeasResult.data)) {
        setIdeas(updatedIdeasResult.data);
      }
    } catch (error) {
      console.error("Error posting idea:", error);
      setErrorMessage("Failed to post the idea.");
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setIsExpanded(false);
    setNewIdeaContent("");
    setErrorMessage("");
  };

  return (
    <div className="topic-selected-container">
      {topic ? (
        <div className="topic-card">
          <h2>{topic.title}</h2>
          <div className="topic-metadata">
            Posted by u/{topic.authorId} •{" "}
            {new Date(topic.createdAt).toLocaleDateString()}
          </div>
          <p className="topic-description">{topic.description}</p>
        </div>
      ) : (
        <p>Loading topic...</p>
      )}
      <div className="post-idea-container">
        <h3>What are your thoughts?</h3>
        <div className={`idea-input-wrapper ${isExpanded ? "expanded" : ""}`}>
          <textarea
            className="new-idea-input"
            value={newIdeaContent}
            onChange={(e) => setNewIdeaContent(e.target.value)}
            placeholder="Share your idea..."
            onFocus={handleFocus}
          />
          {isExpanded && (
            <div className="idea-actions">
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="post-button" onClick={handlePostIdea}>
                Post
              </button>
            </div>
          )}
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="ideas-container">
        <h3>Ideas</h3>
        {ideas.length > 0 ? (
          ideas.map((idea) => <Idea key={idea.id} idea={idea} />)
        ) : (
          <p>No ideas available for this topic.</p>
        )}
      </div>

      
    </div>
  );
}

export default TopicSelected;
