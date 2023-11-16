import Navigation from "./Navigation";

const Event = ({occasion, account, setAccount}) => {
  return (
    <>
      <div className="card">
        {occasion.name}
      </div>
    </>
  );
};

export default Event;
