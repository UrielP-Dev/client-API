import "../Styles/Idea.css";

interface IdeaProps {
  idea: {
    id: string;
    content: string;
    votes: number;
    authorId: string;
    createdAt: string;
  };
}

const Idea: React.FC<IdeaProps> = ({ idea }) => {
  return (
    <>
      <div className="Ideacontainer">
        <div className="idea">
          <h3> {idea.content}</h3>
          <p>Votes: {idea.votes}</p>
          <p>Author: {idea.authorId}</p>
          <p>Created at: {new Date(idea.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </>
  );
};

export default Idea;
