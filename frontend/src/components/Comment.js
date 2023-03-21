import "../style/Comment.css";

const Comment = ({ comment }) => {
  function timeDifference(current, previous) {
    let currentDate = new Date(Date.parse(current));
    let previousDate = new Date(Date.parse(previous));

    current = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()
    );

    previous = new Date(
      previousDate.getFullYear(),
      previousDate.getMonth() + 1,
      previousDate.getDate(),
      previousDate.getHours(),
      previousDate.getMinutes(),
      previousDate.getSeconds()
    );

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30; //correggere per giorni 31 e 28;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + "s";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + "m";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + "h";
    } else if (elapsed < msPerMonth) {
      return "" + Math.round(elapsed / msPerDay) + "d";
    } else if (elapsed < msPerYear) {
      return "" + Math.round(elapsed / msPerMonth) + "m";
    } else {
      return "" + Math.round(elapsed / msPerYear) + "y";
    }
  }

  return (
    <>
      <section className="commento">
        <section className="commentHeader">
          <div className="commentImageContainer">
            {(() => {
              if (comment.proPic === null) {
                return (
                  <img
                    className="noPicImg"
                    alt="proPic"
                    src={
                      "https://static.vecteezy.com/system/resources/thumbnails/005/544/770/small/profile-icon-design-free-vector.jpg"
                    }
                  />
                );
              } else {
                return <img alt="proPic" src={comment.proPic} />;
              }
            })()}
          </div>
          <span id="username">{comment.username}</span>
          <span id="date">
            {timeDifference(new Date().toLocaleString(), comment.created_at)}
          </span>
        </section>
        <section className="commentContent">
          <p>{comment.comment}</p>
        </section>
      </section>
    </>
  );
};

export default Comment;
