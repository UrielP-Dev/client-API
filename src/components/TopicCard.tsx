import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../TopicsCards.css";
import InputText from "./InputText";
import Modal from "./modal";
import EditModal from "./EditModal";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [editTitle, setEditTitle] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5185/api/v1/topics", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }

        const result = await response.json();
        setTopics(result.data || []);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const handleDelete = async () => {
    if (!selectedTopicId) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5185/api/v1/topics/${selectedTopicId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        if (errorResponse.message) {
          setModalMessage(errorResponse.message);
          return;
        }
        console.error("Error deleting topic:", errorResponse.message);
        return;
      }

      setTopics((prevTopics) =>
        prevTopics.filter((topic) => topic.id !== selectedTopicId)
      );
      setModalMessage("Topic deleted successfully.");
    } catch (error) {
      console.error("Error deleting topic:", error);
      setModalMessage("An error occurred while trying to delete the topic.");
    } finally {
      setModalOpen(true);
      setSelectedTopicId(null);
    }
  };

  const handleConfirmDelete = (topicId: string) => {
    setSelectedTopicId(topicId);
    setModalMessage("Are you sure you want to delete this topic?");
    setModalOpen(true);
  };

  const handleEdit = (topicId: string, title: string, description: string) => {
    setEditTitle(title);
    setEditDescription(description);
    setSelectedTopicId(topicId);
    setEditModalOpen(true);
  };

  const handleUpdate = async (title: string, description: string) => {
    if (!selectedTopicId) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5185/api/v1/topics/${selectedTopicId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, description }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        setModalMessage(errorResponse.message || "Failed to update topic.");
        setModalOpen(true);
        return;
      }

      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.id === selectedTopicId
            ? { ...topic, title, description }
            : topic
        )
      );
    } catch (error) {
      console.error("Error updating topic:", error);
      setModalMessage("An error occurred while trying to update the topic.");
    } finally {
      setEditModalOpen(false);
      setSelectedTopicId(null);
    }
  };

  return (
    <>
      <div className="container">
        <InputText />
        <div className="grid">
          {topics.length > 0 ? (
            topics.map((topic) => (
              <div key={topic.id} className="card">
                <div className="content-section">
                  <Link to={`/topic-selected/${topic.id}`}>
                    <h3>{topic.title}</h3>
                    <div className="metadata">
                      Posted by u/{topic.authorId} •{" "}
                      {new Date(topic.createdAt).toLocaleDateString()}
                    </div>
                    <div className="description">{topic.description}</div>
                  </Link>
                  <div className="actions">
                    <Link to={`/topic-selected/${topic.id}`}>
                      <button className="action-button">
                        <span className="action-icon">💬</span> Ideas
                      </button>
                    </Link>
                    <button
                      className="action-button"
                      onClick={() =>
                        handleEdit(topic.id, topic.title, topic.description)
                      }
                    >
                      <span className="action-icon">✏️</span> Edit
                    </button>
                    <button
                      className="action-button"
                      onClick={() => handleConfirmDelete(topic.id)}
                    >
                      <span className="action-icon">🗑️</span> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No topics available</div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        message={modalMessage}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onConfirm={handleUpdate}
        initialTitle={editTitle}
        initialDescription={editDescription}
      />
    </>
  );
};

export default TopicsComponent;
