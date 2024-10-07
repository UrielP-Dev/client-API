interface IdeaProps {
  idea: {
    id: string;
    content: string;
    authorId: string;
    votes: number;
    createdAt: string;
  };
}

function Idea({ idea }: IdeaProps) {
  return (
    <div className="idea-card">
      <div className="vote-section"></div>
      <div className="idea-content">
        <div className="idea-metadata">
          Posted by u/{idea.authorId} •{" "}
          {new Date(idea.createdAt).toLocaleDateString()}
        </div>
        <p className="idea-text">{idea.content}</p>
        <div className="idea-actions">
          <button className="vote-button">
            <span className="vote-icon">👍</span> 0
          </button>
        </div>
      </div>
    </div>
  );
}

export default Idea;
