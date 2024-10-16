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
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Define fetchIdeas function
  const fetchIdeas = async () => {
    try {
      const token = localStorage.getItem("token");

      const ideasResponse = await fetch(
        `http://localhost:5185/api/v1/ideas/topic/${topicId}/paginated?pageNumber=${currentPage}&pageSize=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const ideasResult = await ideasResponse.json();

      if (Array.isArray(ideasResult.data)) {
        setIdeas(ideasResult.data);
        setTotalPages(Math.ceil(ideasResult.totalCount / 10));
      } else {
        console.error("Unexpected ideas response structure:", ideasResult);
      }
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
  };

  const fetchTopicAndIdeas = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch topic details
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

      // Fetch ideas
      await fetchIdeas();
    } catch (error) {
      console.error("Error fetching topic or ideas:", error);
    }
  };

  useEffect(() => {
    fetchTopicAndIdeas();
  }, [topicId, currentPage]);

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
      setCurrentPage(1);
      await fetchIdeas();
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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
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

      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TopicSelected;
