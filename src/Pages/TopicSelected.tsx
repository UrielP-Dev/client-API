import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Idea from "../components/Idea";

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

  useEffect(() => {
    const fetchTopicAndIdeas = async () => {
      try {
        const topicResponse = await fetch(
          `http://localhost:5185/api/v1/topics/${topicId}`
        );
        const topicResult = await topicResponse.json();

        console.log("Topic API response:", topicResult);

        if (Array.isArray(topicResult.data) && topicResult.data.length > 0) {
          setTopic(topicResult.data[0]); // Access the first element of the array
        } else {
          console.error("Unexpected topic response structure:", topicResult);
        }

        const ideasResponse = await fetch(
          `http://localhost:5185/api/v1/ideas/?TopicId=${topicId}`
        );
        const ideasResult = await ideasResponse.json();

        console.log("Ideas API response:", ideasResult);

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

  console.log("Current topic state:", topic);
  console.log("Current ideas state:", ideas);

  return (
    <>
      {topic ? (
        <>
          <h2>{topic.title}</h2>
          <div className="topicPreview">
            <p>{topic.description}</p>
            <p>Created at: {new Date(topic.createdAt).toLocaleDateString()}</p>
          </div>
        </>
      ) : (
        <p>Loading topic...</p>
      )}
      <div>
        {ideas.length > 0 ? (
          ideas.map((idea) => <Idea key={idea.id} idea={idea} />)
        ) : (
          <p>No ideas available for this topic.</p>
        )}
      </div>
    </>
  );
}

export default TopicSelected;
